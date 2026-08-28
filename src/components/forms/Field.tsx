import { cn } from "@/lib/cn";
import type { InquiryField } from "@/types/content";

/**
 * Form field primitives.
 *
 * Two decisions are worth knowing before editing these.
 *
 * **Borders.** The fill is White (`surface-raised`, its designated role) on an Ivory band, and
 * White on Ivory is roughly a 3% luminance step — so the border is the only thing delineating
 * the control, which puts it under WCAG 2.2 SC 1.4.11's 3:1 floor exactly like the outlined
 * button. `ink/55` is the measured value that clears it (3.75:1 on Ivory, 3.39:1 on Sand).
 * `ink/40` measured 2.45:1 and is barred here for the same reason it is barred there.
 *
 * **Errors carry no colour.** The brand palette is six locked colours and contains no red;
 * Copper and Taupe are explicitly forbidden from carrying meaning. So an invalid field firms
 * its border to full Ink at 2px — a change in *weight*, which survives greyscale and satisfies
 * "never by colour alone" — and states the problem as Ink body text wired via
 * `aria-describedby`. Adding a red would be a Brand Book deviation, not a styling choice.
 */

const controlBase =
  "bg-surface-raised text-ink w-full rounded-sm border px-4 py-3 font-sans text-body " +
  "min-h-[44px] placeholder:text-ink/45 focus-visible:outline-3";

const controlIdle = "border-ink/55";
const controlInvalid = "border-ink border-2";

interface FieldProps {
  field: InquiryField;
  value?: string;
  error?: string;
}

function ids(name: string) {
  return { input: `f-${name}`, help: `f-${name}-help`, error: `f-${name}-error` };
}

function describedBy(field: InquiryField, error?: string) {
  const id = ids(field.name);
  const parts = [field.help ? id.help : null, error ? id.error : null].filter(Boolean);
  return parts.length ? parts.join(" ") : undefined;
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-body text-ink block font-semibold">
      {children}
    </label>
  );
}

function Help({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="text-ink/70 mt-1 text-[0.875rem]">
      {children}
    </p>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="text-ink mt-2 text-[0.875rem] font-semibold">
      {children}
    </p>
  );
}

export function Field({ field, value, error }: FieldProps) {
  const id = ids(field.name);
  const invalid = Boolean(error);
  const described = describedBy(field, error);
  const shared = {
    id: id.input,
    name: field.name,
    defaultValue: value,
    "aria-describedby": described,
    "aria-invalid": invalid || undefined,
    className: cn(controlBase, invalid ? controlInvalid : controlIdle),
  };

  // Radio groups need a fieldset/legend rather than a label, so they branch before the
  // shared label markup below.
  if (field.kind === "radio" && field.options) {
    return (
      <fieldset className="mt-8 border-0 p-0">
        <legend className="text-body text-ink font-semibold">{field.label}</legend>
        {field.help ? <Help id={id.help}>{field.help}</Help> : null}
        <div className="mt-3 flex flex-col gap-1">
          {field.options.map((option) => (
            <label
              key={option.value}
              className="text-body text-ink flex min-h-[44px] cursor-pointer items-center gap-3"
            >
              <input
                type="radio"
                name={field.name}
                value={option.value}
                defaultChecked={value === option.value}
                aria-describedby={described}
                className="accent-ink h-5 w-5 focus-visible:outline-3"
              />
              {option.label}
            </label>
          ))}
        </div>
        {error ? <ErrorText id={id.error}>{error}</ErrorText> : null}
      </fieldset>
    );
  }

  return (
    <div className="mt-8">
      <Label htmlFor={id.input}>{field.label}</Label>
      {field.help ? <Help id={id.help}>{field.help}</Help> : null}
      <div className="mt-2">
        {field.kind === "textarea" ? (
          <textarea {...shared} rows={4} maxLength={field.maxLength} />
        ) : field.kind === "select" && field.options ? (
          <select {...shared}>
            <option value="">Please choose</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...shared}
            type={field.kind === "email" ? "email" : field.kind === "tel" ? "tel" : "text"}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
          />
        )}
      </div>
      {error ? <ErrorText id={id.error}>{error}</ErrorText> : null}
    </div>
  );
}

interface ConsentProps {
  name: string;
  label: string;
  detail: string;
  checked?: boolean;
  error?: string;
}

/** Required, never pre-ticked, and separate from any newsletter consent. */
export function ConsentField({ name, label, detail, checked, error }: ConsentProps) {
  const id = ids(name);
  return (
    <div className="mt-10">
      <label
        htmlFor={id.input}
        className="text-body text-ink flex min-h-[44px] cursor-pointer items-start gap-3"
      >
        <input
          id={id.input}
          name={name}
          type="checkbox"
          defaultChecked={checked}
          aria-describedby={`${id.help}${error ? ` ${id.error}` : ""}`}
          aria-invalid={error ? true : undefined}
          className="accent-ink mt-1 h-5 w-5 shrink-0 focus-visible:outline-3"
        />
        <span>{label}</span>
      </label>
      <p id={id.help} className="text-ink/70 mt-2 text-[0.875rem]">
        {detail}
      </p>
      {error ? <ErrorText id={id.error}>{error}</ErrorText> : null}
    </div>
  );
}
