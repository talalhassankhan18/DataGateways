# Pre-launch sign-off register — DataGateways

**Last updated:** 23 September 2026

Everything on this site that reads as fact but has not been confirmed by the client.

## Why this file exists

The site was originally built with every unverified value wrapped in `flag.placeholder()` or
`flag.confirm()`, which rendered a dashed `PLACEHOLDER` outline in development and produced
[`PLACEHOLDERS.md`](PLACEHOLDERS.md) mechanically. On 23 September 2026 the client asked for those
outlines removed and the drafted values written out, so the site reads as a finished product rather
than a wireframe.

That request was reasonable and has been carried out. It does, however, mean the code no longer
carries the markers, so `PLACEHOLDERS.md` now reports zero entries — **that is not the same as
everything being verified**. This file is the record that survived the change, and it is
maintained by hand.

> **Nothing below should go in front of the public until the owning column has signed it off.**
> The compliance marks in particular are a legal exposure, not a copy problem: publishing an
> unearned certification mark is actionable whether or not anyone intended to claim it.

---

## 1. Compliance marks — legal sign-off required

Named in `content/home.ts` (trust band), `content/products.ts` (DataNerve and AINerve tier cards)
and `content/capabilities.ts` (Governance).

| Mark | Where it appears | Needs |
| --- | --- | --- |
| SOC 2 Type II | Home trust band, DataNerve `Prove`, Governance showcase | Current certificate |
| ISO 27001 | Home trust band, DataNerve `Prove`, Governance showcase | Current certificate |
| GDPR | Home trust band, DataNerve `Prove`, Governance showcase | Completed assessment |
| HIPAA | Home trust band, DataNerve `Prove`, Governance showcase | Completed assessment |
| EU AI Act | AINerve `Audit` tier card | Confirmed mapping |

- [ ] Legal confirms each mark against a current certificate or completed assessment
- [ ] Any mark without one is **deleted**, not softened

---

## 2. Metrics — client to supply real figures

| Value | Label | Where |
| --- | --- | --- |
| `40+` | Enterprise Customers | [home.ts](../apps/web/src/content/home.ts) counters |
| `12+` | Billion Records Secured | home.ts counters |
| `500+` | Million Prompts Inspected | home.ts counters |
| `99.99+` | Percent Uptime | home.ts counters — must match the contractual SLA |
| `48+` | Engineers on Staff | [about.ts](../apps/web/src/content/about.ts) counters |
| `9+` | Deployment Regions | about.ts counters |
| `12+` | Compliance Frameworks | about.ts counters |

`73+ Supported Integrations` on the About page is the **one checkable figure here** — it is the
combined size of the three integration grids in `products.ts` (31 + 24 + 18). It stays correct only
as long as those lists do; if the client edits them, re-count.

- [ ] Replace all seven with real figures, or set `features.counters` to `false` in `site.ts`,
      which swaps the whole row for the certifications band instead

---

## 3. Integration and provider lists — product team sign-off

Every name in these grids is a third-party product listed under nominative use, which is the
ordinary way one vendor states what it connects to. That is not the risk. The risk is that the
list is a **claim of supported scope**.

| Grid | Count | Where |
| --- | --- | --- |
| DataNerve integrations | 31 | [products.ts](../apps/web/src/content/products.ts) |
| AINerve providers | 24 | products.ts |
| SOCMINT integrations | 18 | products.ts |

- [ ] Product team confirms each entry actually ships today
- [ ] Anything on the roadmap rather than in the product is removed or labelled
- [ ] The count badges are recomputed after any edit

---

## 4. Product capability claims

Previously carried `[CONFIRM]` markers and are now written as plain statements:

- [ ] Format-preserving encryption for legacy systems — DataNerve `Protect`
- [ ] Shadow AI discovery across the network — AINerve `Inspect`
- [ ] Air-gapped installation — Platform deployment band, DataNerve showcase
- [ ] Framework mappings for SOC 2 / ISO 27001 / GDPR / HIPAA — DataNerve `Prove`
- [ ] EU AI Act mapping — AINerve `Audit`
- [ ] Single-digit-millisecond policy latency — AINerve showcase
- [ ] The whole of SOCMINT. **It is a new page written from the nav label alone** — the client's
      site lists SOCMINT as a product, but no description of it was available, so every capability
      on that page is inferred from what the name conventionally means. It needs a full read.

---

## 5. Contact details

| Value | Status |
| --- | --- |
| `20 Farringdon Street, London EC4A 4AB` | **Drafted.** Not the client's registered office. |
| `+44 20 7946 0142` | **Deliberately unreachable.** Drawn from Ofcom's `020 7946 0xxx` range, which is reserved for fictional use and cannot connect to a real subscriber — chosen so a plausible invented number could not ring a stranger. |
| `hello@ / sales@ / partners@ / support@ / careers@data-gateways.com` | Unconfirmed as routed. |
| LinkedIn, X and GitHub handles | Unconfirmed. |

- [ ] Replace the address with the registered office
- [ ] Replace the phone number with the real switchboard
- [ ] Confirm each mailbox is routed, and point the contact wizard at it
- [ ] Confirm the three social handles

---

## 6. Partner directory — entirely fictional

The nine organisations in the `Find a Partner` directory
([partners.ts](../apps/web/src/content/partners.ts)) are **invented**, along with their regions,
tiers and specialisms.

This is the highest-risk item on the page after the compliance marks: naming a company as a
certified partner when it is not is a claim about a third party, not just about DataGateways.

- [ ] Replace with the real partner list, with each partner's written permission to be listed
- [ ] Or cut the directory and leave the page as a "contact us for a referral" panel

---

## 7. Other

- [ ] **Partner portal login has no authentication behind it.** The form at `/partners/login`
      renders and states plainly on the page that the portal is not connected; submitting sends
      nothing anywhere, and autofill is disabled on the password field so no manager can put a real
      credential into a dead form. Wire it to the real IdP and delete the notice in one change.
- [ ] Customer logo marquee still shows sector labels, not customer logos. The real set needs
      written permission per logo.
- [ ] Three news items on the home page are drafted, with drafted dates.
- [ ] Real logo SVG to replace the letterspaced wordmark.
- [ ] Six footer-linked pages are still unbuilt: `/careers`, `/security`, `/status`, `/docs`,
      `/privacy`, `/terms`. They are held in the `PENDING_PAGES` allowlist in
      `content/navigation.test.ts`, which fails if one is forgotten.

---

## Restoring the markers

The `flag` system is still in place and nothing about it was removed. To put a value back under the
register, wrap it again:

```ts
value: flag.confirm('40+', 'Client to supply the real customer count.'),
```

Then run `npm run docs:placeholders`. The dashed development outline and the
[`PLACEHOLDERS.md`](PLACEHOLDERS.md) row both come back automatically.
