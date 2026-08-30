import { describe, expect, it } from "vitest";
import {
  buildNotification,
  buildAcknowledgement,
  buildEnrichment,
  escapeHtml,
} from "@/lib/email/templates";
import { site } from "@/content/site";

const answers = {
  firstName: "Ada",
  lastName: "Okonkwo",
  email: "ada@example.com",
  considering: "Two weeks somewhere warm",
  preferredContact: "either",
  investment: "Around what a good trip costs, flights included",
};

describe("notification email", () => {
  const mail = buildNotification(answers);

  it("names the visitor in the subject and nothing else", () => {
    expect(mail.subject).toContain("Ada Okonkwo");
    // Answer text in a subject line shows in notification previews and in mail logs.
    expect(mail.subject).not.toContain("warm");
    expect(mail.subject).not.toContain("flights");
  });

  it("always carries a plain-text alternative", () => {
    expect(mail.text.length).toBeGreaterThan(0);
    expect(mail.text).toContain("Two weeks somewhere warm");
  });

  it("renders the human label for a chosen option, not the stored value", () => {
    expect(mail.html).toContain("Either is fine");
    expect(mail.text).toContain("Either is fine");
    // The stored value must not be what Tyler reads.
    expect(mail.text).not.toMatch(/^\s*either\s*$/m);
  });

  it("omits fields left blank rather than printing empty rows", () => {
    expect(mail.html).not.toContain("Departing from");
    expect(mail.text).not.toContain("Departing from");
  });

  it("groups answers under their step names", () => {
    expect(mail.text).toContain("CONTACT");
    expect(mail.text).toContain("JOURNEY");
    expect(mail.text).toContain("FIT");
  });
});

/**
 * The enrichment notification carries the questions that moved out of the inquiry. It is a
 * separate template rather than a second call to `buildNotification` because it arrives after
 * an inquiry Tyler has already read, and threading it under "New travel inquiry" would make a
 * follow-up look like a second lead.
 */
describe("enrichment email", () => {
  const notes = {
    firstName: "Ada",
    lastName: "Okonkwo",
    email: "ada@example.com",
    flexibility: "some",
    pace: "slow",
    prompting: "A milestone birthday",
    departure: "",
  };
  const mail = buildEnrichment(notes);

  it("is distinguishable from a new inquiry at a glance", () => {
    expect(mail.subject).toContain("Ada Okonkwo");
    expect(mail.subject).not.toContain("New travel inquiry");
  });

  it("carries the address so it can be matched to the original inquiry by hand", () => {
    // Nothing on this site stores a submission (missing-inputs #10), so there is no id to
    // join on and the address is the only thing tying these notes to an inquiry.
    expect(mail.text).toContain("ada@example.com");
  });

  it("renders the moved questions, with human option labels", () => {
    expect(mail.text).toContain("Some flexibility");
    expect(mail.text).toContain("Slow — fewer places, more time in each");
    expect(mail.text).toContain("A milestone birthday");
  });

  it("omits blanks and never renders an inquiry-only field", () => {
    expect(mail.text).not.toContain("Departing from");
    expect(mail.text).not.toContain("What are you considering?");
  });

  it("escapes a hostile answer", () => {
    const hostile = { ...notes, prompting: "</dd></dl><script>alert(1)</script>" };
    expect(buildEnrichment(hostile).html).not.toContain("<script>");
  });
});

describe("HTML escaping", () => {
  it("escapes every character that could break out of the markup", () => {
    expect(escapeHtml(`<script>&"'`)).toBe("&lt;script&gt;&amp;&quot;&#39;");
  });

  it("does not let a field value inject markup into the notification", () => {
    const hostile = {
      ...answers,
      considering: '</dd></dl><script>alert("x")</script><dl><dd>',
    };
    const mail = buildNotification(hostile);
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).toContain("&lt;script&gt;");
  });

  it("escapes the reply address rendered into the mailto link", () => {
    const mail = buildNotification({ ...answers, email: 'a"@example.com' });
    expect(mail.html).not.toContain('"@example.com"');
    expect(mail.html).toContain("&quot;");
  });
});

describe("acknowledgement email", () => {
  const mail = buildAcknowledgement(answers);

  it("greets the visitor by first name", () => {
    expect(mail.text).toContain("Hello Ada,");
  });

  it("states the response time from site config rather than a retyped figure", () => {
    expect(mail.text).toContain(site.inquiryResponseTime);
  });

  it("says plainly that no mailing list was involved", () => {
    // Charter §10 forbids auto-subscribing inquiry users; saying so is how the visitor knows.
    expect(mail.text.toLowerCase()).toContain("not been added to any mailing list");
  });

  it("still works when no first name was supplied", () => {
    expect(buildAcknowledgement({ email: "x@example.com" }).text).toContain("Hello,");
  });
});
