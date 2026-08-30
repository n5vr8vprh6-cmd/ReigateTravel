/**
 * The Privacy Policy, as supplied by the client (`Privacy Policy for Tyler Reigate.pdf`,
 * effective 29 August 2026). This closes missing-inputs #12.
 *
 * **Transcribed verbatim, and that is the rule for this file.** It is legal copy: it was not
 * written here, it is not edited here, and it is not tightened, re-ordered or "improved" here.
 * The only liberties taken are structural — sentences grouped into paragraphs and bullet lists
 * so the page can render them — and inline bold from the source is not carried, because the
 * emphasis is presentational and reproducing the words exactly matters more than reproducing
 * the styling. If a clause needs to change, it changes in the source document first.
 *
 * **One live inconsistency, flagged rather than papered over.** §12 says the site introduces no
 * website analytics without a policy update, and Vercel Web Analytics was switched on the same
 * day this policy takes effect. Vercel's is cookieless and aggregate and does not profile
 * visitors, so §12's first sentence still reads true — but its second sentence names website
 * analytics as a trigger to update the policy, and that has been met. The client chose to
 * publish as supplied and have Tyler add the sentence. Recorded in `missing-inputs.md`.
 */

export type PolicyBlock =
  | { kind: "p"; text: string }
  /** A labelled sub-part within a numbered section — bold sub-headings in the source document. */
  | { kind: "sub"; text: string }
  | { kind: "list"; items: readonly string[] };

export interface PolicySection {
  /** Stable anchor, used for `aria-labelledby` and in-page links. */
  id: string;
  heading: string;
  blocks: readonly PolicyBlock[];
}

const p = (text: string): PolicyBlock => ({ kind: "p", text });
const sub = (text: string): PolicyBlock => ({ kind: "sub", text });
const list = (...items: string[]): PolicyBlock => ({ kind: "list", items });

export const privacyPolicy = {
  title: "Privacy Policy",
  effectiveDate: "August 29, 2026",
  intro: [
    p(
      "Reigate Travel & Co. (“Reigate,” “we,” “us,” or “our”) respects your privacy and is committed to handling your personal information thoughtfully, responsibly, and transparently."
    ),
    p(
      "This Privacy Policy explains what information we may collect, why we collect it, how we use and share it, and the choices available to you when you visit reigatetravel.co, contact us, participate in a Reigate experience, or work with us to plan travel."
    ),
  ] as readonly PolicyBlock[],
  sections: [
    {
      id: "information-we-collect",
      heading: "1. Information We Collect",
      blocks: [
        p("The personal information we collect depends on how you interact with Reigate."),
        sub("Information you provide directly"),
        p(
          "When you contact us or submit a travel planning inquiry, you may provide information such as:"
        ),
        list(
          "your name;",
          "email address;",
          "telephone number;",
          "preferred method of contact;",
          "travel destinations and approximate dates;",
          "departure location;",
          "number and relationship of travellers;",
          "accommodation and travel preferences;",
          "preferred travel pace and interests;",
          "approximate travel budget or investment range;",
          "previous travel experiences;",
          "accessibility requirements;",
          "dietary considerations;",
          "health or medical considerations relevant to travel planning; and",
          "any other information you choose to share with us."
        ),
        p(
          "If you become a travel planning client, additional information may be required to make reservations or provide travel services. Depending on the arrangements being made, this could include dates of birth, passport information, loyalty program details, emergency contacts, payment information, or other information required by travel suppliers."
        ),
        p(
          "We only request information that is reasonably necessary to provide the service you have asked us to provide."
        ),
        sub("Information about other travellers"),
        p(
          "You may provide information about family members, travelling companions, or other individuals included in your travel arrangements."
        ),
        p(
          "When providing personal information about another person, you are responsible for ensuring that you have their permission to share that information with Reigate where required."
        ),
        sub("Website information"),
        p(
          "As of the effective date of this Policy, Reigate does not intentionally use advertising cookies, behavioural tracking technology, or third-party advertising analytics on reigatetravel.co."
        ),
        p(
          "Like most websites, our hosting and security providers may automatically process limited technical information necessary to operate and protect the website, such as IP addresses, browser information, device information, timestamps, or server logs."
        ),
      ],
    },
    {
      id: "how-we-use-your-information",
      heading: "2. How We Use Your Information",
      blocks: [
        p("We may use personal information to:"),
        list(
          "respond to inquiries;",
          "understand your travel goals, preferences, and priorities;",
          "determine whether Reigate is the right planning partner for you;",
          "research and recommend destinations, accommodations, transportation, activities, and other travel services;",
          "prepare itineraries and travel proposals;",
          "make and manage travel reservations;",
          "communicate with you before, during, and after your travels;",
          "remember preferences that may make future travel planning more personal;",
          "register or communicate with you regarding Reigate community events or experiences;",
          "manage our client relationships;",
          "process payments where applicable;",
          "meet legal, accounting, regulatory, insurance, or record-keeping requirements;",
          "protect against fraud, misuse, security incidents, or unlawful activity; and",
          "operate and improve Reigate's services."
        ),
        p(
          "We will not use personal information for a materially different purpose without obtaining additional consent where required."
        ),
      ],
    },
    {
      id: "sensitive-personal-information",
      heading: "3. Sensitive Personal Information",
      blocks: [
        p(
          "Travel planning can sometimes require information that is more sensitive in nature, including passport details, health information, accessibility requirements, dietary needs, or payment information."
        ),
        p(
          "We only collect this information when it is reasonably necessary to provide a requested travel service and handle it with safeguards appropriate to its sensitivity."
        ),
        p(
          "Please do not send passport numbers, credit card information, or other highly sensitive information through an ordinary website inquiry unless Reigate specifically asks you to provide it through an appropriate method."
        ),
      ],
    },
    {
      id: "when-we-share-information",
      heading: "4. When We Share Information",
      blocks: [
        p("Reigate does not sell or rent your personal information."),
        p(
          "When necessary to arrange or support your travel, we may provide relevant personal information to third parties such as:"
        ),
        list(
          "airlines;",
          "hotels and resorts;",
          "cruise lines;",
          "tour operators;",
          "transportation companies;",
          "destination management companies;",
          "excursion and activity providers;",
          "travel insurance providers;",
          "payment processors;",
          "Reigate's host agency, travel partners, or booking platforms;",
          "technology and communications providers; and",
          "other suppliers involved in delivering your travel arrangements."
        ),
        p(
          "We only provide information reasonably necessary for the applicable service or transaction."
        ),
        p(
          "These organizations operate independently and may have their own privacy policies and information-handling practices."
        ),
        p(
          "We may also disclose information where required or permitted by law, to protect our legal rights, to investigate fraud or security concerns, or in connection with a sale, restructuring, or transfer of the business."
        ),
      ],
    },
    {
      id: "international-processing",
      heading: "5. Travel Suppliers and International Processing",
      blocks: [
        p("Travel is inherently international."),
        p(
          "When you ask Reigate to arrange travel, your personal information may need to be transferred to hotels, airlines, tour operators, booking systems, technology providers, or other organizations located outside Canada."
        ),
        p("Some of our service providers may also store or process information outside Canada."),
        p(
          "When personal information is processed in another country, it may be subject to the laws of that jurisdiction and may be accessible to courts, governments, law enforcement, or regulatory authorities in accordance with those laws."
        ),
        p(
          "By requesting international travel services, you understand that information necessary to provide those services may be transferred internationally."
        ),
      ],
    },
    {
      id: "email-and-marketing",
      heading: "6. Email, Community Updates and Marketing",
      blocks: [
        p(
          "If you specifically choose to join the Reigate community, subscribe to travel notes, or otherwise consent to receive updates, we may send you information about:"
        ),
        list(
          "travel ideas and destination inspiration;",
          "Reigate community events;",
          "wellness journeys;",
          "new services or experiences; and",
          "other Reigate news."
        ),
        p(
          "Where Canada's Anti-Spam Legislation applies, Reigate will send commercial electronic communications only where we have the required consent or another lawful basis to do so."
        ),
        p(
          "You may unsubscribe from marketing communications at any time by using the unsubscribe option included in the message or by contacting us."
        ),
        p(
          "Submitting a travel planning inquiry does not automatically add you to a marketing mailing list."
        ),
        p(
          "We may still send service-related communications necessary to respond to your inquiry, manage an existing booking, or provide services you have requested."
        ),
      ],
    },
    {
      id: "third-party-platforms",
      heading: "7. Events and Third-Party Platforms",
      blocks: [
        p(
          "Reigate may use third-party platforms to manage community events, newsletters, registrations, bookings, payments, or other services."
        ),
        p(
          "For example, selecting a link to register for an event may take you to a third-party website or service. Information you provide directly to that platform is subject to that provider's privacy practices and terms."
        ),
        p(
          "Reigate's website may also contain links to hotels, destinations, social media platforms, travel partners, publications, or other third-party websites."
        ),
        p(
          "This Privacy Policy applies to information under Reigate's control and does not govern the privacy practices of independent third parties."
        ),
      ],
    },
    {
      id: "retention",
      heading: "8. How Long We Keep Information",
      blocks: [
        p("We retain personal information only for as long as reasonably necessary to:"),
        list(
          "provide requested services;",
          "maintain appropriate travel and client records;",
          "support future travel planning where appropriate;",
          "satisfy legal, tax, accounting, regulatory, or insurance requirements;",
          "resolve disputes; and",
          "enforce our agreements."
        ),
        p(
          "Information that is no longer reasonably required will be securely deleted, destroyed, or anonymized where appropriate and subject to applicable legal obligations."
        ),
        p(
          "Website inquiry submissions are currently transmitted to Reigate by email and are not intentionally stored in a separate database on reigatetravel.co."
        ),
      ],
    },
    {
      id: "protecting-your-information",
      heading: "9. Protecting Your Information",
      blocks: [
        p(
          "We use reasonable administrative, technical, and organizational safeguards appropriate to the nature and sensitivity of the information in our care."
        ),
        p(
          "These safeguards may include restricted access, password-protected accounts, reputable technology providers, secure booking systems, and appropriate information-handling procedures."
        ),
        p(
          "No electronic transmission, email service, website, or data-storage system can be guaranteed to be completely secure. We therefore cannot guarantee absolute security."
        ),
      ],
    },
    {
      id: "your-choices",
      heading: "10. Your Privacy Choices and Rights",
      blocks: [
        p("Subject to applicable law, you may contact us to:"),
        list(
          "ask what personal information we hold about you;",
          "request access to your personal information;",
          "request correction of inaccurate or incomplete information;",
          "withdraw consent for certain uses of your information;",
          "request deletion of information where appropriate and where we are not legally required to retain it; or",
          "ask questions or raise concerns about how your information has been handled."
        ),
        p(
          "Withdrawal of consent may affect our ability to provide certain services where the information is required to complete or manage your travel arrangements."
        ),
        p("We may need to verify your identity before responding to certain privacy requests."),
      ],
    },
    {
      id: "children",
      heading: "11. Children and Family Travel",
      blocks: [
        p("Reigate's website and services are intended primarily for adults."),
        p(
          "When planning family travel, a parent, guardian, or authorized adult may provide information about a child where that information is necessary to arrange the child's travel."
        ),
        p(
          "We do not knowingly collect personal information directly from children for marketing purposes."
        ),
      ],
    },
    {
      id: "cookies",
      heading: "12. Cookies and Tracking Technologies",
      blocks: [
        p(
          "As of the effective date of this Privacy Policy, reigatetravel.co does not intentionally use advertising cookies, behavioural advertising technology, or tracking scripts designed to profile visitors."
        ),
        p(
          "If this changes—for example, if Reigate introduces website analytics, advertising technology, or additional cookie-based functionality—we will update this Policy and provide any notices or consent mechanisms required by applicable law."
        ),
        p(
          "Third-party websites you visit through links from Reigate may use their own cookies or tracking technologies."
        ),
      ],
    },
    {
      id: "changes",
      heading: "13. Changes to This Privacy Policy",
      blocks: [
        p("Our business, services, technology, and legal obligations may change over time."),
        p(
          "We may update this Privacy Policy periodically to reflect those changes. The current version will always be posted on reigatetravel.co with its effective date."
        ),
        p(
          "If we make a material change affecting how previously collected personal information is used, we will take additional steps where required by applicable law."
        ),
      ],
    },
    {
      id: "contact",
      heading: "14. Contact Us",
      blocks: [
        p("Questions, requests, or concerns about privacy can be directed to:"),
        p("Reigate Travel & Co."),
        p("Privacy Contact: Tyler Reigate"),
        p(
          "If you have a concern about our privacy practices, please contact us first so that we have an opportunity to address it."
        ),
        p(
          "You may also have the right to contact the Office of the Privacy Commissioner of Canada or another applicable privacy regulator."
        ),
      ],
    },
  ] as readonly PolicySection[],
} as const;
