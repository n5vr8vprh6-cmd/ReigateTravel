"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitInquiry } from "@/app/begin-planning/actions";
import { initialInquiryState } from "@/lib/forms/inquiry-state";
import { Field, ConsentField } from "@/components/forms/Field";
import { ActionButton } from "@/components/ui/ActionButton";
import { HorizonRule } from "@/components/ui/HorizonRule";
import { TextLink } from "@/components/ui/TextLink";
import { inquirySteps, inquiryConsent, inquiryCopy } from "@/content/inquiry";
import { validateInquiry, stepIndexOfField, type FieldErrors } from "@/lib/validation/inquiry";
import { HONEYPOT_FIELD, RENDERED_AT_FIELD } from "@/lib/forms/spam";
import {
  analyticsEvents,
  inquiryBlockedPayload,
  inquiryStepPayload,
  inquirySubmittedPayload,
  trackEvent,
} from "@/lib/analytics";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * The guided inquiry, and the site's third client component.
 *
 * **Every step is always in the DOM.** Non-current steps get the `hidden` attribute rather than
 * being unmounted, which buys three things for free: answers survive Back without any state
 * duplication, the whole form submits natively, and with JavaScript unavailable the visitor
 * simply sees one long form that works. Enhancement is additive — it hides things and adds
 * controls; it never becomes the only way through.
 *
 * **Enhancement is gated on hydration, not on an inline script.** An inline script would avoid
 * a brief flash of the long form, but if hydration then failed the visitor would be stranded on
 * step one with dead Continue buttons and no way to submit. The worst case here is "long form,
 * still submittable", which is the right way round.
 *
 * **The question is the moment, not the field.** Each step's heading renders at `text-statement`
 * — the scale the hero uses — and the page's own H1 steps down to make room. The headings in
 * `inquiry.ts` were written as questions ("First, how to reach you."), so this gives them the
 * size they were written at rather than rewriting anything. Deliberately NOT a Typeform-style
 * one-field-per-screen rebuild: 25 fields across 25 screens is more clicking, not better, and
 * the six groups are Charter §10's own.
 *
 * **Nothing is persisted between visits.** Answers live in the DOM for the length of the visit
 * and nowhere else. Writing them to localStorage would contradict the consent text, which says
 * plainly that answers are not stored on this website.
 */
export function InquiryForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialInquiryState);
  const [enhanced, setEnhanced] = useState(false);
  const [step, setStep] = useState(0);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  // Held in state, not written onto the DOM node through a ref. The ref version silently
  // never stamped: the value read back empty on every environment, so the timing gate was
  // dead code and no submission was ever checked against it. Rendering it declaratively
  // means React owns it and it cannot be lost to a re-render.
  const [renderedAt, setRenderedAt] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const lastStep = inquirySteps.length - 1;

  // Enhancement and the timing stamp both belong to the hydrated session.
  useEffect(() => {
    setEnhanced(true);
    setRenderedAt(String(Date.now()));
    // Step 1 is reported here rather than left implicit. `goTo` only fires on advance, so
    // without this the first rung of the funnel would have to be inferred from the page view
    // count for /begin-planning — a different series, counted a different way, and awkward to
    // compare against. Firing it makes all six steps one self-contained series.
    trackEvent(
      analyticsEvents.inquiryStepReached,
      inquiryStepPayload(0, inquirySteps[0]?.name ?? "")
    );
  }, []);

  // A rejected submit jumps to the earliest step that actually has a problem, rather than
  // leaving the visitor on the last step wondering what is wrong three steps back.
  useEffect(() => {
    const names = Object.keys(state.fieldErrors);
    if (state.status !== "invalid" || names.length === 0) return;
    setStep(Math.min(...names.map(stepIndexOfField)));
    summaryRef.current?.focus();
  }, [state]);

  // Why a submission did not go through. `state.status` only — never a validation message, and
  // never a field name: a message can quote what was typed, and a field name says which
  // question someone struggled with, neither of which analytics has any business seeing.
  useEffect(() => {
    if (state.status === "idle") return;
    trackEvent(analyticsEvents.inquiryBlocked, inquiryBlockedPayload(state.status));
  }, [state.status]);

  // Send was pressed. Not a success — the server can still reject it, and the redirect to
  // /begin-planning/received is what marks one.
  useEffect(() => {
    if (pending) trackEvent(analyticsEvents.inquirySubmitted, inquirySubmittedPayload(step + 1));
  }, [pending, step]);

  const errors: FieldErrors = { ...state.fieldErrors, ...clientErrors };
  const currentStepErrorNames = Object.keys(errors).filter(
    (name) => stepIndexOfField(name) === step
  );

  function readValues(): Record<string, string> {
    if (!formRef.current) return {};
    const data = new FormData(formRef.current);
    const values: Record<string, string> = {};
    for (const [key, value] of data.entries()) {
      if (typeof value === "string") values[key] = value;
    }
    return values;
  }

  /** Validates only the step in view, reusing the server's rules so the two cannot disagree. */
  function validateStep(index: number): boolean {
    const { fieldErrors } = validateInquiry(readValues());
    const stepFieldNames = new Set(inquirySteps[index]?.fields.map((f) => f.name) ?? []);
    if (index === lastStep) stepFieldNames.add(inquiryConsent.name);

    const scoped: FieldErrors = {};
    for (const [name, message] of Object.entries(fieldErrors)) {
      if (stepFieldNames.has(name)) scoped[name] = message;
    }
    setClientErrors(scoped);
    return Object.keys(scoped).length === 0;
  }

  function goTo(index: number) {
    setStep(index);
    trackEvent(
      analyticsEvents.inquiryStepReached,
      inquiryStepPayload(index, inquirySteps[index]?.name ?? "")
    );
    // Focus the heading so the new step is announced and the keyboard lands in the right place.
    requestAnimationFrame(() => headingRefs.current[index]?.focus());
  }

  function onContinue() {
    if (!validateStep(step)) {
      summaryRef.current?.focus();
      return;
    }
    goTo(Math.min(step + 1, lastStep));
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLFormElement>) {
    if (!enhanced || event.key !== "Enter" || step === lastStep) return;
    const target = event.target as HTMLElement;
    // Enter inside a textarea is a newline, and on a button it is that button's activation.
    if (target.tagName === "TEXTAREA" || target.tagName === "BUTTON") return;
    event.preventDefault();
    onContinue();
  }

  const summaryNames = enhanced ? currentStepErrorNames : Object.keys(errors);
  const showSummary = summaryNames.length > 0;

  // 0..1, consumed by the progress device in globals.css. Step 1 of 6 sits one sixth along
  // rather than at zero: "one of six" reads as begun, and an empty track reads as broken.
  const progress = (step + 1) / inquirySteps.length;

  return (
    <form
      ref={formRef}
      action={formAction}
      onKeyDown={onKeyDown}
      noValidate={enhanced}
      // Scopes the step-entrance animation. Unenhanced, no step is hidden, and the rule would
      // otherwise animate all six sections at once on load.
      data-enhanced={enhanced}
    >
      {/* Off-screen rather than display:none or aria-hidden. A focusable control hidden from
          the accessibility tree is a serious axe violation, and the a11y gate fails on serious.
          A screen-reader user hears the label and leaves it alone, which is the whole idea. */}
      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden={false}>
        <label htmlFor={`f-${HONEYPOT_FIELD}`}>Leave this field blank</label>
        <input
          id={`f-${HONEYPOT_FIELD}`}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input name={RENDERED_AT_FIELD} type="hidden" value={renderedAt} readOnly />

      <div className="lg:grid lg:grid-cols-[minmax(0,38rem)_minmax(11rem,1fr)] lg:gap-16">
        <div>
          {enhanced ? (
            <div className="mb-10">
              <p className="text-eyebrow text-olive font-semibold tracking-[0.14em] uppercase">
                Step {step + 1} of {inquirySteps.length} — {inquirySteps[step]?.name}
              </p>
              {/* The signature device as the progress indicator: the horizon travels along the
              track rather than a bar filling up. Decorative — the line above already states
              the step in text, so this must never be the only way to know where you are. */}
              <div
                className="relative mt-4 h-2"
                aria-hidden="true"
                style={{ ["--inquiry-progress" as string]: String(progress) }}
              >
                <span className="bg-taupe/50 absolute inset-x-0 top-1/2 block h-px -translate-y-1/2" />
                <span className="inquiry-progress-fill bg-copper absolute top-1/2 left-0 block h-px -translate-y-1/2" />
                <span className="inquiry-progress-mark absolute top-0 block">
                  <HorizonRule tone="accent" className="w-10" />
                </span>
              </div>
              {/* Announcement lives here rather than on the heading, which would double-announce
              when focus moves to it. */}
              <p role="status" className="sr-only">
                Step {step + 1} of {inquirySteps.length}, {inquirySteps[step]?.name}
              </p>
            </div>
          ) : null}

          {showSummary ? (
            <div
              ref={summaryRef}
              tabIndex={-1}
              className="border-ink bg-surface-raised mb-8 border-2 p-5"
            >
              <h2 className="text-h3 font-display">{inquiryCopy.errorSummaryHeading}</h2>
              <ol className="mt-3 list-inside list-decimal">
                {summaryNames.map((name) => (
                  <li key={name} className="text-body text-ink mt-1">
                    <a href={`#f-${name}`} className="underline underline-offset-4">
                      {errors[name]}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {/* Every non-idle status that does not redirect must render something. A status that
          renders nothing is indistinguishable from a broken button. */}
          {state.status === "rate_limited" ||
          state.status === "delivery_failed" ||
          state.status === "too_fast" ? (
            <div className="border-ink bg-surface-raised mb-8 border-2 p-5">
              <p className="text-body text-ink">
                {state.status === "rate_limited"
                  ? inquiryCopy.rateLimited
                  : state.status === "too_fast"
                    ? inquiryCopy.tooFast
                    : inquiryCopy.deliveryFailed}
              </p>
              {state.status === "delivery_failed" ? (
                <p className="text-body mt-3">
                  <TextLink href={`mailto:${site.inquiryEmail}`} external>
                    Email {site.inquiryEmail}
                  </TextLink>
                </p>
              ) : null}
            </div>
          ) : null}

          {inquirySteps.map((s, index) => (
            <section
              key={s.id}
              hidden={enhanced && index !== step}
              aria-labelledby={`step-${s.id}-heading`}
              className={cn("inquiry-step", !enhanced && "mt-16 first:mt-0")}
            >
              <h2
                id={`step-${s.id}-heading`}
                tabIndex={-1}
                ref={(node) => {
                  headingRefs.current[index] = node;
                }}
                className="text-statement font-display"
              >
                {s.heading}
              </h2>
              {s.lead ? <p className="text-body text-ink/85 mt-3 max-w-[38rem]">{s.lead}</p> : null}

              {s.fields.map((field) => (
                <Field
                  key={field.name}
                  field={field}
                  value={state.values[field.name]}
                  error={errors[field.name]}
                />
              ))}

              {index === lastStep ? (
                <ConsentField
                  name={inquiryConsent.name}
                  label={inquiryConsent.label}
                  detail={inquiryConsent.detail}
                  checked={state.values[inquiryConsent.name] === "on"}
                  error={errors[inquiryConsent.name]}
                />
              ) : null}
            </section>
          ))}

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            {enhanced && step > 0 ? (
              <ActionButton variant="secondary" onClick={() => goTo(step - 1)}>
                {inquiryCopy.backLabel}
              </ActionButton>
            ) : null}

            {/* Distinct keys, and they matter. Both branches render an <ActionButton>, so
                without them React reuses the same <button> node and morphs it in place:
                verified — the exact element that said "Continue" (type=button) becomes "Send
                my inquiry" (type=submit). A visitor who clicks Continue on step 5 and clicks
                again in the same spot a moment later therefore submits, rather than doing
                nothing. It fails safely today — consent is required and unticked, so it can
                only produce a validation error, never a false success — but it is a surprise
                with no upside. Separate keys make React swap the node instead of mutating it. */}
            {enhanced && step < lastStep ? (
              <ActionButton key="continue" variant="primary" onClick={onContinue}>
                {inquiryCopy.continueLabel}
              </ActionButton>
            ) : (
              <ActionButton
                key="submit"
                type="submit"
                variant="primary"
                busy={pending}
                busyLabel={inquiryCopy.submittingLabel}
              >
                {inquiryCopy.submitLabel}
              </ActionButton>
            )}
          </div>
        </div>

        {/* The whole shape of the inquiry, standing. Enhanced only: without JavaScript every
            step is already on screen, so an index marking a "current" one would describe
            something that is not happening. An <aside>, never a <section> — the no-JS guard
            counts `form section` and expects exactly the six steps.

            Not aria-hidden. The list is genuinely useful to a screen-reader user, and it is
            static content that will not be re-announced on every step change. The current item
            carries a visually-hidden word because weight alone is meaning by style. */}
        {enhanced ? (
          <aside className="border-taupe/40 mt-14 border-t pt-6 lg:sticky lg:top-32 lg:mt-0 lg:self-start lg:border-t-0 lg:pt-0">
            <p className="text-eyebrow text-olive font-semibold tracking-[0.14em] uppercase">
              {inquiryCopy.stepIndexHeading}
            </p>
            <ol className="mt-4">
              {inquirySteps.map((s, index) => (
                <li
                  key={s.id}
                  className={cn(
                    "text-body mt-2",
                    // ink/70, not ink/55. ink/55 is the INPUT BORDER value from the last audit —
                    // it measures 3.73:1, which clears SC 1.4.11's 3:1 floor for a control
                    // boundary and fails 1.4.3's 4.5:1 for text. Reaching for it here failed axe
                    // at all three widths. ink/70 is 5.99:1 on Ivory and 5.14:1 on Sand.
                    index === step ? "text-ink font-semibold" : "text-ink/70"
                  )}
                >
                  {s.name}
                  {index === step ? (
                    <span className="sr-only">{inquiryCopy.currentStepSuffix}</span>
                  ) : null}
                </li>
              ))}
            </ol>
          </aside>
        ) : null}
      </div>
    </form>
  );
}
