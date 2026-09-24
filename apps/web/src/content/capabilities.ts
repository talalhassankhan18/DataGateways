import type { CtaBandContent, Heading, IndexedCard, SeoMeta } from '@datagateways/shared';
import type { AnchorDef } from './home';

export const CAPABILITY_SLUGS = ['governance', 'dspm', 'dlp'] as const;
export type CapabilitySlug = (typeof CAPABILITY_SLUGS)[number];

export const isCapabilitySlug = (value: string | undefined): value is CapabilitySlug =>
  value !== undefined && (CAPABILITY_SLUGS as readonly string[]).includes(value);

/**
 * The three capabilities that sit beneath DataNerve in the nav. They share one page template —
 * hero, lead, four capability cards, an image-led band, CTA — because they are three facets of one
 * product rather than three products, and giving each its own layout would imply otherwise.
 */
export interface CapabilityPage {
  readonly slug: CapabilitySlug;
  readonly name: string;
  readonly seo: SeoMeta;
  readonly anchors: readonly AnchorDef[];
  readonly hero: {
    readonly id: string;
    readonly eyebrow: string;
    readonly heading: Heading;
    readonly media: { readonly image: string; readonly generative: 'cipher' | 'circuit' | 'signal' };
  };
  readonly lead: { readonly id: string; readonly text: string };
  readonly capabilities: {
    readonly id: string;
    readonly heading: Heading;
    readonly cards: readonly IndexedCard[];
  };
  readonly showcase: {
    readonly id: string;
    readonly heading: Heading;
    readonly body: string;
    readonly image: string;
    readonly points: readonly string[];
  };
  readonly cta: CtaBandContent;
}

const capabilityAnchors: readonly AnchorDef[] = [
  { id: 'hero', label: 'Intro' },
  { id: 'lead', label: 'Summary' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'showcase', label: 'In practice' },
];

const governance: CapabilityPage = {
  slug: 'governance',
  name: 'Governance',

  seo: {
    title: 'Data Governance | DataNerve by DataGateways',
    description:
      'Write policy once and have it enforced on every pipeline, with the evidence trail auditors ask for produced as a by-product rather than a project.',
  },

  anchors: capabilityAnchors,

  hero: {
    id: 'hero',
    eyebrow: 'DataNerve — Governance',
    heading: { roman: 'Policy that runs,', accent: 'not policy that sits' },
    media: { image: '/media/img-governance.jpg', generative: 'circuit' },
  },

  lead: {
    id: 'lead',
    text: 'Most data governance lives in a document nobody reads and a spreadsheet nobody trusts. DataNerve makes policy an executable object: written once, enforced in line on every request, and provable after the fact.',
  },

  capabilities: {
    id: 'capabilities',
    heading: { roman: 'What governance', accent: 'actually means here' },
    cards: [
      {
        index: '01',
        tag: 'Author',
        title: 'One Policy Language',
        blurb:
          'Classification, retention and access rules written once in a single grammar, versioned in your own repository and reviewed like any other change.',
      },
      {
        index: '02',
        tag: 'Enforce',
        title: 'Applied In Line',
        blurb:
          'The same rule runs at the database, the warehouse and the model gateway — so a policy cannot be true in one place and quietly false in another.',
      },
      {
        index: '03',
        tag: 'Delegate',
        title: 'Ownership Where It Belongs',
        blurb:
          'Domain teams own their own data products and their own exceptions, inside guardrails the central team sets. Federated in practice, not just on a slide.',
      },
      {
        index: '04',
        tag: 'Prove',
        title: 'Evidence As Output',
        blurb:
          'Every decision writes a signed record mapped to the frameworks you report against, so an audit request is a query rather than a quarter.',
      },
    ],
  },

  showcase: {
    id: 'showcase',
    heading: { roman: 'From policy', accent: 'to proof' },
    body: 'A control you cannot evidence is a control you do not have. Every allow, deny, mask and revoke DataNerve performs is written to an append-only log with the policy version that caused it, so the answer to "prove this was enforced in March" is a filter rather than an archaeology project.',
    image: '/media/img-audit.jpg',
    points: [
      'Append-only, cryptographically signed decision log',
      'Policy version attached to every recorded decision',
      'Framework mappings for SOC 2, ISO 27001, GDPR and HIPAA',
      'Evidence packs exported on a schedule or on demand',
    ],
  },

  cta: {
    heading: { roman: 'Bring us', accent: 'your hardest policy' },
    action: { label: 'Request a Demo', href: '/contact' },
  },
};

const dspm: CapabilityPage = {
  slug: 'dspm',
  name: 'DSPM',

  seo: {
    title: 'DSPM | Data Security Posture Management by DataGateways',
    description:
      'Find every store of sensitive data across your estate, see who can reach it, and fix the exposure — continuously, inside your own perimeter.',
  },

  anchors: capabilityAnchors,

  hero: {
    id: 'hero',
    eyebrow: 'DataNerve — DSPM',
    heading: { roman: 'Know where', accent: 'your data actually is' },
    media: { image: '/media/img-dspm.jpg', generative: 'cipher' },
  },

  lead: {
    id: 'lead',
    text: 'Every organisation has copies it has lost track of: a restored snapshot, an analyst extract, a staging table that was meant to be temporary two years ago. Data security posture management is the discipline of finding them before someone else does.',
  },

  capabilities: {
    id: 'capabilities',
    heading: { roman: 'Discover, classify,', accent: 'then fix' },
    cards: [
      {
        index: '01',
        tag: 'Discover',
        title: 'Continuous Inventory',
        blurb:
          'Scheduled and event-driven discovery across databases, warehouses, buckets and snapshots — including the shadow copies nobody put in the CMDB.',
      },
      {
        index: '02',
        tag: 'Classify',
        title: 'Know What It Is',
        blurb:
          'Field-level classification for PII, payment data, health records, credentials and source code, tuned against your own schemas rather than a generic pattern set.',
      },
      {
        index: '03',
        tag: 'Assess',
        title: 'Who Can Reach It',
        blurb:
          'Effective access computed across roles, groups and grants — the path that actually exists, not the one the org chart implies.',
      },
      {
        index: '04',
        tag: 'Remediate',
        title: 'Close The Gap',
        blurb:
          'Encrypt, mask, restrict or delete directly from the finding, with the change tracked back to the posture issue that prompted it.',
      },
    ],
  },

  showcase: {
    id: 'showcase',
    heading: { roman: 'Posture without', accent: 'shipping us your data' },
    body: 'Most posture tools work by copying metadata — and often samples — into the vendor cloud. DataNerve scans in place, inside your account, and the inventory it builds never leaves your perimeter. The finding you act on and the data it describes stay in the same jurisdiction.',
    image: '/media/img-platform.jpg',
    points: [
      'Scanning runs in your own account, in your own region',
      'No sample data, no metadata and no schemas leave your network',
      'Findings deduplicated and ranked by real exploitability',
      'Drift alerts when a store changes shape or exposure',
    ],
  },

  cta: {
    heading: { roman: 'Find the copies', accent: 'you forgot about' },
    action: { label: 'Request a Demo', href: '/contact' },
  },
};

const dlp: CapabilityPage = {
  slug: 'dlp',
  name: 'DLP',

  seo: {
    title: 'DLP | Data Loss Prevention by DataGateways',
    description:
      'Stop sensitive data leaving through the paths people actually use — pipelines, exports, APIs and AI prompts — without blocking the work.',
  },

  anchors: capabilityAnchors,

  hero: {
    id: 'hero',
    eyebrow: 'DataNerve — DLP',
    heading: { roman: 'Stop the leak,', accent: 'not the work' },
    media: { image: '/media/img-dlp.jpg', generative: 'signal' },
  },

  lead: {
    id: 'lead',
    text: 'Classic data loss prevention earned its reputation by blocking the wrong things loudly and the right things never. DataNerve inspects the paths data actually leaves by — pipelines, exports, APIs and, increasingly, model prompts — and acts in line.',
  },

  capabilities: {
    id: 'capabilities',
    heading: { roman: 'Detect, decide,', accent: 'and record' },
    cards: [
      {
        index: '01',
        tag: 'Detect',
        title: 'Content And Context',
        blurb:
          'Pattern, entropy and schema-aware detection, weighed against who is asking and where it is going — because a card number moving inside the payments domain is not an incident.',
      },
      {
        index: '02',
        tag: 'Decide',
        title: 'Graduated Response',
        blurb:
          'Allow, mask, redact, quarantine or block. A rule that only has an off switch is a rule people route around within a week.',
      },
      {
        index: '03',
        tag: 'Cover',
        title: 'Every Egress Path',
        blurb:
          'Pipelines, bulk exports, API responses and AI prompts through AINerve — one policy set rather than four tools that each half-cover one route.',
      },
      {
        index: '04',
        tag: 'Tune',
        title: 'False Positives Are The Enemy',
        blurb:
          'Every decision is reviewable and every override feeds back into the rule, so the signal improves instead of the alerts being muted.',
      },
    ],
  },

  showcase: {
    id: 'showcase',
    heading: { roman: 'Now including', accent: 'the prompt box' },
    body: 'The fastest-growing egress path in most organisations is an employee pasting a customer record into a chat window. Because DLP and AINerve share one policy engine, the rule that stops that record leaving through a database export stops it leaving through a prompt — without anyone writing it twice.',
    image: '/media/img-ainerve.jpg',
    points: [
      'One rule set across pipelines, exports, APIs and prompts',
      'Redaction in place, so the request still succeeds',
      'Per-team thresholds instead of one global tripwire',
      'Full incident replay, attributed to a person not a key',
    ],
  },

  cta: {
    heading: { roman: 'Test it against', accent: 'your own traffic' },
    action: { label: 'Request a Demo', href: '/contact' },
  },
};

export const capabilities: Record<CapabilitySlug, CapabilityPage> = { governance, dspm, dlp };
