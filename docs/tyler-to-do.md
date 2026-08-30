# Tyler's to-do list

Four things only Tyler can do. Each one is already built for and waiting — the site ships a
neutral fallback until the value arrives, so nothing here is broken in the meantime, just dormant.

This is the plain-English front end to `docs/decisions/missing-inputs.md`, which stays the source
of truth for what each gap does to the build. Fill in the blanks below and hand them back; each is
a one-line change plus a redeploy.

---

## 1. A working mailbox on the domain — **do this first**

**What:** point MX records at a mail host for `reigatetravel.co`, and create the
`concierge@reigatetravel.co` mailbox.

**Why it is first:** the domain has no MX records today, so **every email sent to that address
bounces**. The address is published in the footer, on `/contact`, in the Privacy Policy (as the
privacy contact) and on the Terms page. Four places on a live site currently invite people to
write to an address that cannot receive mail, and the sender gets a bounce rather than a reply.

**Worth knowing:** the guided inquiry is *not* affected — it delivers through Resend to whatever
`INQUIRY_TO_EMAIL` points at, and that works today. This is about everyone who emails directly.

**One caution for whoever sets it up:** Resend's sending records live on the `send.` subdomain
deliberately. Only one SPF record is permitted per name, so putting a mailbox provider's records
on the root should not disturb them — but check both after the change, not just the new one.

```
[INPUT REQUIRED: mail host chosen, and confirmation that concierge@reigatetravel.co receives]
```

---

## 2. Calendly link for a planning conversation

**What:** create the event in Calendly, publish it, and send the public URL.

**Why:** the confirmation page after someone submits an inquiry is built to show a booking step —
"Choose a time to speak with Tyler" — with the calendar embedded directly. Right now that page
falls back to "Tyler reads every inquiry personally and typically replies within 24–48 hours",
which is the old behaviour. The gap between a submitted inquiry and a booked call is the biggest
drop-off in the funnel, and this closes it while the person is still on the page.

**Decisions that come with it,** because the site cannot invent them: how long the call runs, what
it covers, and whether Calendly should ask anything at booking. The page currently describes it as
"around twenty to thirty minutes" — if that is wrong, say so and the copy changes with it.

**Where it goes:** `NEXT_PUBLIC_CALENDLY_URL` in Vercel, then redeploy. It must be an
`https://calendly.com/...` URL — anything else is rejected on purpose, because that value becomes
an embedded frame on the page.

```
[INPUT REQUIRED: Calendly event URL, call length, what the call covers]
```

---

## 3. Publish the Substack

**What:** publish *Tyler Takes Off* so the publication URL resolves, then confirm the address.

**Why:** the newsletter signup is fully built and currently invisible. `tylertakesoff.substack.com`
returned a 404 when it was checked, so rather than link somewhere broken the site disables it:
the homepage signup falls back to a plain button, the footer link is hidden, and `/travel-notes`
loses its outbound link. Publishing the first post turns the whole channel on with a one-line
change.

**Also unblocks:** three real articles would replace the "New notes are on the way" holding copy on
`/travel-notes` and the homepage with actual article cards. Title, summary, date and URL for each —
placeholder cards are never rendered.

```
[INPUT REQUIRED: live Substack URL]
[INPUT REQUIRED: three articles — title, summary, date, URL each]
```

---

## 4. Set the Luma event live

**What:** publish the event on Luma so it has a public event page, then send that URL along with
the details.

**Why:** the Community section is in its "no confirmed event" state. It links to the Luma
*calendar*, which works, but it cannot feature an event because none is confirmed. Once the event
is live, the section can show it properly — name, date, place, what to expect, and a register
button pointing at the event itself rather than the calendar.

**Please send the details in writing rather than expecting them to be inferred.** An external
review of the site referred to a "September 19 Oakville Waterfront Reset" as though it were
already published copy. Nothing about that event exists in this project, and publishing an event
from a second-hand mention is exactly the sort of thing the content rules exist to prevent — so it
was not published. Confirm it and it goes up the same day.

```
[INPUT REQUIRED: event name, date, start/end time, location]
[INPUT REQUIRED: description and what attendees should expect]
[INPUT REQUIRED: Luma event URL — the event page, not the calendar]
```

---

## Still open, but not on this list

These are tracked in `missing-inputs.md` and need more than a URL:

- **Fee and investment ranges** — Tyler's to set. Until then the site publishes no figure anywhere,
  and a test enforces that.
- **Terms of Service** — needs a lawyer, not a draft. The brief is written and waiting at
  `docs/legal/terms-brief.md`.
- **Testimonials** — none has ever been supplied, and none will be invented.
- **The analytics sentence in the Privacy Policy** — §12 says the site introduces no analytics, and
  analytics is running. Published that way at your direction; worth a line from whoever wrote the
  policy.
