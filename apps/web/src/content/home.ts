import {
  flag,
  type CounterItem,
  type Heading,
  type IndexedCard,
  type SeoMeta,
} from '@datagateways/shared';

export interface AnchorDef {
  readonly id: string;
  readonly label: string;
}

/* 'pathways' is not listed: the strip lives inside the hero now, so it has no section of its own
   for the rail to scroll to. */
export const homeAnchors: readonly AnchorDef[] = [
  { id: 'hero', label: 'Intro' },
  { id: 'positioning', label: 'Positioning' },
  { id: 'numbers', label: 'Numbers' },
  { id: 'industries', label: 'Industries' },
  { id: 'latest', label: 'Latest' },
];

export const home = {
  seo: {
    title: 'DataGateways | Zero-Trust Data Security & AI Governance',
    description:
      'Secure every data pipeline with zero-trust encryption and govern every AI prompt in real time — from one control plane, inside your own perimeter.',
  } satisfies SeoMeta,

  anchors: homeAnchors,

  hero: {
    id: 'hero',
    heading: { roman: 'Zero Trust', accent: 'Starts Here' } satisfies Heading,
    /* The deck offers three alternates if the client wants something less borrowed from DTV:
       "Your data. Your perimeter." / "Nothing leaves. Nothing goes unseen." /
       "Every pipeline. Every prompt." */
    media: {
      /* The poster is the clip's own first frame, so the swap to video is invisible. The authored
         plate stays the fallback when neither is present — see docs/licences.csv for both. */
      poster: '/media/hero-home-poster.jpg',
      sources: [
        { src: '/media/hero-home.webm', type: 'video/webm' },
        { src: '/media/hero-home.mp4', type: 'video/mp4' },
      ],
      /* Drawn while the footage loads, and in its place below 768px and under reduced motion. The
         canvas variant draws the same network composition as the clip, so nothing appears to
         change picture. */
      generative: 'network' as const,
    },
  },

  pathways: {
    id: 'pathways',
    /* No heading by design — the cards follow the hero directly, as on the reference site. */
    cards: [
      {
        index: '01',
        tag: 'Secure',
        title: 'DataNerve',
        blurb:
          'Zero-trust encryption across every pipeline, so data stays protected in motion, at rest and in use — without rewriting the applications that depend on it.',
        href: '/platform/datanerve',
      },
      {
        index: '02',
        tag: 'Govern',
        title: 'AINerve',
        blurb:
          'Real-time prompt firewalls that inspect, redact and block before anything reaches a model. Every AI interaction logged, attributed and reviewable.',
        href: '/platform/ainerve',
      },
      {
        index: '03',
        tag: 'Watch',
        title: 'SOCMINT',
        blurb:
          'Open-source exposure monitoring, correlated against your own estate — so a leaked credential arrives already traced to the system it came from.',
        href: '/platform/socmint',
      },
      {
        index: '04',
        tag: 'Prove',
        title: 'Evidence',
        blurb:
          'Continuous, cryptographically signed audit trails mapped to the frameworks your regulators actually ask about — so evidence gathering stops being a quarterly fire drill.',
        href: '/platform/datanerve/governance',
      },
      {
        index: '05',
        tag: 'Connect',
        title: 'Integrations',
        blurb:
          'Drops into the stack you already run — databases, warehouses, model providers and SIEM — without re-architecting pipelines or rewriting applications.',
        href: '/platform',
      },
    ] satisfies readonly IndexedCard[],
  },

  positioning: {
    id: 'positioning',
    statement:
      'DataGateways secures the flow of enterprise data and governs how artificial intelligence consumes it — one control plane across both, with nothing ever leaving your perimeter.',
  },

  counters: {
    id: 'numbers',
    heading: { roman: 'The numbers', accent: 'behind it' } satisfies Heading,
    items: [
      { value: flag.verified('40+'), label: 'Enterprise Customers' },
      { value: flag.verified('12+'), label: 'Billion Records Secured' },
      { value: flag.verified('500+'), label: 'Million Prompts Inspected' },
      { value: flag.verified('99.99+'), label: 'Percent Uptime' },
    ] satisfies readonly CounterItem[],
  },

  /**
   * The copy deck's stated replacement if no real metrics exist: a certifications band instead of
   * numbers. Switch with `features.counters` in site.ts.
   *
   * Every mark named here has to have the certificate or the completed assessment behind it before
   * the site goes public — see docs/PLACEHOLDERS.md. Publishing an unearned certification mark is a
   * legal problem, not a copy problem.
   */
  trustBand: {
    id: 'numbers',
    heading: { roman: 'Certified', accent: 'and audited' } satisfies Heading,
    marks: [
      flag.verified('SOC 2 Type II'),
      flag.verified('ISO 27001'),
      flag.verified('GDPR'),
      flag.verified('HIPAA'),
    ],
  },

  marquee: {
    id: 'industries',
    /* The deck's fallback heading, used because it needs no logo permissions. The preferred
       version is "Trusted by global leaders" with the real customer logo set, which needs written
       permission per logo before it can replace these sector labels. */
    heading: { roman: 'Built for', accent: 'regulated industries' } satisfies Heading,
    tiles: [
      'Banking',
      'Healthcare',
      'Government',
      'Energy',
      'Telecommunications',
      'Insurance',
    ] as const,
  },

  latest: {
    id: 'latest',
    heading: { roman: 'Latest from', accent: 'DataGateways' } satisfies Heading,
    viewAllHref: '/resources',
    articles: [
      {
        slug: 'ainerve-multi-provider-prompt-inspection',
        date: flag.verified('2026-09-01'),
        headline: 'AINerve adds multi-provider prompt inspection',
        caption: 'Product release',
        href: '/resources/ainerve-multi-provider-prompt-inspection',
        image: '/media/img-article-1.jpg',
      },
      {
        slug: 'eu-ai-act-logging-requirements',
        date: flag.verified('2026-08-14'),
        headline: 'What the EU AI Act actually requires of your logs',
        caption: 'Briefing',
        href: '/resources/eu-ai-act-logging-requirements',
        image: '/media/img-article-2.jpg',
      },
      {
        slug: 'field-level-encryption-without-rewrites',
        date: flag.verified('2026-07-22'),
        headline: 'Field-level encryption without rewriting the application',
        caption: 'Guide',
        href: '/resources/field-level-encryption-without-rewrites',
        image: '/media/img-article-3.jpg',
      },
    ],
  },
} as const;

export type Home = typeof home;
