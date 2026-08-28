import { describe, expect, it } from "vitest";
import { validateInquiry, stepIndexOfField } from "@/lib/validation/inquiry";
import { parseInquiry } from "@/lib/forms/parse";
import { inquirySteps, inquiryConsent, inquiryFieldNames } from "@/content/inquiry";

/** The four fields that actually gate a submission. */
const valid = {
  firstName: "Ada",
  lastName: "Okonkwo",
  email: "ada@example.com",
  consent: "on",
};

describe("inquiry validation", () => {
  it("accepts the minimum viable inquiry", () => {
    expect(validateInquiry(valid).ok).toBe(true);
  });

  it.each(["firstName", "lastName", "email"])("requires %s", (name) => {
    const result = validateInquiry({ ...valid, [name]: "" });
    expect(result.ok).toBe(false);
    expect(result.fieldErrors[name]).toBeTruthy();
  });

  it("requires consent, and treats an unchecked box as absent", () => {
    expect(validateInquiry({ ...valid, consent: "" }).fieldErrors.consent).toBe(
      inquiryConsent.requiredMessage
    );
    const { consent: _omitted, ...withoutConsent } = valid;
    expect(validateInquiry(withoutConsent).ok).toBe(false);
  });

  it("treats whitespace as empty", () => {
    expect(validateInquiry({ ...valid, firstName: "   " }).ok).toBe(false);
  });

  it.each([
    ["ada@example.com", true],
    ["ada.okonkwo+travel@sub.example.co.uk", true],
    ["ada@example", false],
    ["ada example.com", false],
    ["@example.com", false],
  ])("email %s -> valid=%s", (email, ok) => {
    expect(validateInquiry({ ...valid, email }).ok).toBe(ok);
  });

  it("does not format-check an optional field left empty", () => {
    // The classic way to make a form unsubmittable is validating the shape of a blank optional.
    expect(validateInquiry({ ...valid, phone: "" }).ok).toBe(true);
  });

  it("checks the shape of an optional field once it has a value", () => {
    expect(validateInquiry({ ...valid, phone: "not a phone" }).ok).toBe(false);
    expect(validateInquiry({ ...valid, phone: "+1 (416) 555-0134" }).ok).toBe(true);
  });

  it("enforces maxLength", () => {
    const field = inquirySteps[0]!.fields.find((f) => f.name === "firstName")!;
    const tooLong = "a".repeat((field.maxLength ?? 80) + 1);
    expect(validateInquiry({ ...valid, firstName: tooLong }).ok).toBe(false);
  });

  it("rejects a select or radio value that is not on the list", () => {
    expect(validateInquiry({ ...valid, flexibility: "whenever" }).ok).toBe(false);
    expect(validateInquiry({ ...valid, flexibility: "some" }).ok).toBe(true);
    expect(validateInquiry({ ...valid, preferredContact: "carrier-pigeon" }).ok).toBe(false);
  });

  it("maps a field back to the step it lives in", () => {
    expect(stepIndexOfField("firstName")).toBe(0);
    expect(stepIndexOfField("investment")).toBe(4);
    // Consent is not a step field; it renders with the submit button on the last step.
    expect(stepIndexOfField(inquiryConsent.name)).toBe(inquirySteps.length - 1);
  });
});

describe("payload parsing", () => {
  it("keeps only known field names", () => {
    const data = new FormData();
    data.set("firstName", "Ada");
    data.set("consent", "on");
    data.set("isAdmin", "true");
    data.set("__proto__", "polluted");

    const parsed = parseInquiry(data);
    expect(parsed.firstName).toBe("Ada");
    expect(parsed).not.toHaveProperty("isAdmin");
    expect(Object.keys(parsed).every((k) => [...inquiryFieldNames, "consent"].includes(k))).toBe(
      true
    );
  });

  it("trims values", () => {
    const data = new FormData();
    data.set("firstName", "  Ada  ");
    expect(parseInquiry(data).firstName).toBe("Ada");
  });

  it("caps absurd input before it reaches the validator", () => {
    const data = new FormData();
    data.set("considering", "x".repeat(50_000));
    expect(parseInquiry(data).considering!.length).toBeLessThanOrEqual(5000);
  });
});
