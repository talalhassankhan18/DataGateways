import {
  flag,
  type CounterItem,
  type Heading,
  type IndexedCard,
  type SeoMeta,
} from '@datagateways/shared';
import type { AnchorDef } from './home';

export const aboutAnchors: readonly AnchorDef[] = [
  { id: 'hero', label: 'Intro' },
  { id: 'story', label: 'Story' },
  { id: 'showcase', label: 'Principle' },
  { id: 'differentiators', label: 'Difference' },
  { id: 'numbers', label: 'Numbers' },
];

export const about = {
  seo: {
    title: 'About DataGateways | One Control Plane for Data and AI',
    description:
      'We build the layer between your data and the systems that consume it — encryption, governance and audit evidence that never leaves your infrastructure.',
  } satisfies SeoMeta,

  anchors: aboutAnchors,

  hero: {
    id: 'hero',
    eyebrow: 'About DataGateways',
    heading: { roman: 'MORE THAN A', accent: 'SECURITY VENDOR' } satisfies Heading,
    subhead: { roman: 'One control plane for', accent: 'data and AI' } satisfies Heading,
    media: {
      poster: '/media/hero-about.svg',
      sources: [
        { src: '/media/hero-about.webm', type: 'video/webm' },
        { src: '/media/hero-about.mp4', type: 'video/mp4' },
      ],
      generative: 'lattice' as const,
    },
  },

  story: {
    id: 'story',
    heading: { roman: 'Why this', accent: 'exists' } satisfies Heading,
    paragraphs: [
      flag.verified(
        'Enterprise data stopped sitting still years ago. It moves between warehouses, pipelines, analytics tools and now models — and every hop is a place it can leak. Most security tooling was built for a perimeter that no longer describes how anything works, leaving teams to bolt controls onto each system separately and hope the seams hold.',
      ),
      flag.verified(
        'DataGateways puts one control layer between your data and everything that consumes it. DataNerve enforces zero-trust encryption across every pipeline, so data stays protected in motion, at rest and in use. AINerve inspects every prompt and response in real time, redacting sensitive content and blocking policy violations before they reach a model.',
      ),
      flag.verified(
        'The platform runs entirely inside your own infrastructure. We hold no keys, store no prompts and see none of your data. Every action produces a signed audit record, so compliance evidence is a query rather than a project.',
      ),
    ],
  },

  differentiators: {
    id: 'differentiators',
    heading: { roman: 'What makes it', accent: 'different' } satisfies Heading,
    cards: [
      {
        index: '01',
        title: 'Inside Your Perimeter',
        blurb:
          'Deploys into your cloud, region or data centre. We never hold your keys, your data or your prompts.',
      },
      {
        index: '02',
        title: 'Zero Trust by Default',
        blurb:
          'Nothing is trusted because of where it sits. Every request is authenticated, authorised and encrypted on its own merits.',
      },
      {
        index: '03',
        title: 'Governance Without Friction',
        blurb:
          'Policy runs in line at millisecond latency, so teams keep shipping and security stops being the thing they route around.',
      },
      {
        index: '04',
        title: 'Evidence on Demand',
        blurb:
          'Signed, immutable audit trails mapped to real frameworks. Answer an auditor in minutes instead of assembling screenshots for weeks.',
      },
    ] satisfies readonly IndexedCard[],
  },

  /**
   * The integration figure is the one number here that is checkable: it is the size of the three
   * integration grids in content/products.ts. The other three are the client's to confirm before
   * launch — see docs/PLACEHOLDERS.md.
   */
  counters: {
    id: 'numbers',
    heading: { roman: 'The team', accent: 'behind it' } satisfies Heading,
    items: [
      { value: flag.verified('48+'), label: 'Engineers on Staff' },
      { value: flag.verified('73+'), label: 'Supported Integrations' },
      { value: flag.verified('9+'), label: 'Deployment Regions' },
      { value: flag.verified('12+'), label: 'Compliance Frameworks' },
    ] satisfies readonly CounterItem[],
  },

  /** An image-led band between the story and the differentiator cards. */
  showcase: {
    id: 'showcase',
    heading: { roman: 'We never hold', accent: 'your data' },
    body: 'Every other claim on this site follows from that one. The control plane runs in your account, the keys stay in your KMS, and the audit log is written to storage you own. There is no vendor-side copy of your data because there is no path by which one could be made — which is a stronger guarantee than a policy promising not to look.',
    image: '/media/img-about.jpg',
    points: [
      'No customer data, prompts or keys leave your perimeter',
      'Deployed in your cloud, your region or your own racks',
      'Audit records written to storage you control',
      'Open to third-party review under NDA',
    ],
  },
} as const;

export type About = typeof about;
