"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitInquiry } from "@/app/begin-planning/actions";
import { initialInquiryState } from "@/lib/forms/inquiry-state";
import { Field, ConsentField } from "@/components/forms/Field";
import { ActionButton } from "@/components/ui/ActionButton";
import { TextLink } from "@/components/ui/TextLink";
import { inquirySteps, inquiryConsent, inquiryCopy } from "@/content/inquiry";
import { validateInquiry, stepIndexOfField, type FieldErrors } from "@/lib/validation/inquiry";
import { HONEYPOT_FIELD, RENDERED_AT_FIELD } from "@/lib/forms/spam";
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
 * **Nothing is persisted between visits.** Answers live in the DOM for the length of the visit
 * and nowhere else. Writing them to localStorage would contradict the consent text, which says
 * plainly that answers are not stored on this website.
 */
export function InquiryForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialInquiryState);
  const [enhanced, setEnhanced] = useState(false);
  const [step, setStep] = useState(0);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});

  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const renderedAtRef = useRef<HTMLInputElement>(null);
  const lastStep = inquirySteps.length - 1;

  // Enhancement and the timing stamp both belong to the hydrated session.
  useEffect(() => {
    setEnhanced(true);
    if (renderedAtRef.current) renderedAtRef.current.value = String(Date.now());
  }, []);

  // A rejected submit jumps to the earliest step that actually has a problem, rather than
  // leaving the visitor on the last step wondering what is wrong three steps back.
  useEffect(() => {
    const names = Object.keys(state.fieldErrors);
    if (state.status !== "invalid" || names.length === 0) return;
    setStep(Math.min(...names.map(stepIndexOfField)));
    summaryRef.current?.focus();
  }, [state]);

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

  return (
    <form ref={formRef} action={formAction} onKeyDown={onKeyDown} noValidate={enhanced}>
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
      <input ref={renderedAtRef} name={RENDERED_AT_FIELD} type="hidden" defaultValue="" />

      {enhanced ? (
        <div className="mb-10">
          <p className="text-eyebrow text-olive font-semibold tracking-[0.14em] uppercase">
            Step {step + 1} of {inquirySteps.length} — {inquirySteps[step]?.name}
          </p>
          <ol className="mt-3 flex gap-1.5" aria-hidden="true">
            {inquirySteps.map((s, index) => (
              <li
                key={s.id}
                className={cn("h-px flex-1", index <= step ? "bg-copper" : "bg-taupe/50")}
              />
            ))}
          </ol>
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
          className={enhanced ? undefined : "mt-16 first:mt-0"}
        >
          <h2
            id={`step-${s.id}-heading`}
            tabIndex={-1}
            ref={(node) => {
              headingRefs.current[index] = node;
            }}
            className="text-h2-sm font-display"
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

        {enhanced && step < lastStep ? (
          <ActionButton variant="primary" onClick={onContinue}>
            {inquiryCopy.continueLabel}
          </ActionButton>
        ) : (
          <ActionButton
            type="submit"
            variant="primary"
            busy={pending}
            busyLabel={inquiryCopy.submittingLabel}
          >
            {inquiryCopy.submitLabel}
          </ActionButton>
        )}
      </div>
    </form>
  );
}
