import { inquirySteps } from "@/content/inquiry";
import { site } from "@/content/site";

export interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

/**
 * Every interpolated value is escaped. Field values are visitor-supplied free text, and an
 * unescaped `<` in a 2000-character textarea is all it takes to break out of a table cell and
 * turn the notification into something Tyler's mail client renders as markup.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Answered fields only, in Charter order, grouped by step. Blank answers are omitted. */
function answeredByStep(values: Record<string, string>) {
  return inquirySteps
    .map((step) => ({
      name: step.name,
      answers: step.fields
        .map((field) => {
          const raw = (values[field.name] ?? "").trim();
          if (!raw) return null;
          // Render the human label for a chosen option, not its machine value.
          const option = field.options?.find((o) => o.value === raw);
          return { label: field.label, value: option ? option.label : raw };
        })
        .filter((a): a is { label: string; value: string } => a !== null),
    }))
    .filter((step) => step.answers.length > 0);
}

function displayName(values: Record<string, string>): string {
  return [values.firstName, values.lastName].filter(Boolean).join(" ").trim() || "Someone";
}

export function buildNotification(values: Record<string, string>): EmailContent {
  const name = displayName(values);
  const groups = answeredByStep(values);

  const text = [
    `New inquiry from ${name}`,
    `Reply to: ${values.email ?? ""}`,
    "",
    ...groups.flatMap((group) => [
      group.name.toUpperCase(),
      ...group.answers.map((a) => `  ${a.label}\n    ${a.value}`),
      "",
    ]),
  ].join("\n");

  const html = [
    `<h1 style="font-family:Georgia,serif;font-weight:500;">New inquiry from ${escapeHtml(name)}</h1>`,
    `<p style="font-family:system-ui,sans-serif;">Reply to: <a href="mailto:${escapeHtml(values.email ?? "")}">${escapeHtml(values.email ?? "")}</a></p>`,
    ...groups.map(
      (group) =>
        `<h2 style="font-family:system-ui,sans-serif;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#404639;">${escapeHtml(group.name)}</h2>` +
        `<dl style="font-family:system-ui,sans-serif;">` +
        group.answers
          .map(
            (a) =>
              `<dt style="color:#404639;font-size:13px;">${escapeHtml(a.label)}</dt>` +
              `<dd style="margin:0 0 12px;color:#1b1b1b;white-space:pre-wrap;">${escapeHtml(a.value)}</dd>`
          )
          .join("") +
        `</dl>`
    ),
  ].join("\n");

  return {
    // The visitor's name only. No answer text reaches the subject line, where it would show
    // in notification previews and in any mail log along the way.
    subject: `New travel inquiry — ${name}`,
    html,
    text,
  };
}

export function buildAcknowledgement(values: Record<string, string>): EmailContent {
  const first = (values.firstName ?? "").trim();
  const greeting = first ? `Hello ${first},` : "Hello,";

  const lines = [
    greeting,
    "",
    `Thank you for telling us what you are considering. Your inquiry has reached ${site.name} and Tyler will read it personally.`,
    "",
    `You can expect a reply within ${site.inquiryResponseTime}.`,
    "",
    "You have not been added to any mailing list.",
    "",
    site.endline,
  ];

  const html =
    `<div style="font-family:system-ui,sans-serif;color:#1b1b1b;line-height:1.6;">` +
    lines
      .filter((line) => line !== "")
      .map((line) =>
        line === site.endline
          ? `<p style="font-family:Georgia,serif;font-style:italic;color:#404639;">${escapeHtml(line)}</p>`
          : `<p>${escapeHtml(line)}</p>`
      )
      .join("") +
    `</div>`;

  return {
    subject: `We have your inquiry — ${site.name}`,
    html,
    text: lines.join("\n"),
  };
}
