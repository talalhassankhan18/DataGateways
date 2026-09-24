import type { Heading, IndexedCard, SeoMeta } from '@datagateways/shared';
import type { AnchorDef } from './home';

export const platformAnchors: readonly AnchorDef[] = [
  { id: 'hero', label: 'Intro' },
  { id: 'overview', label: 'Overview' },
  { id: 'products', label: 'Products' },
  { id: 'deployment', label: 'Deployment' },
];

export const platform = {
  seo: {
    title: 'Platform | DataNerve and AINerve by DataGateways',
    description:
      'DataNerve secures pipelines with zero-trust encryption. AINerve governs AI with real-time prompt firewalls. Deployed in your own cloud or on-premise.',
  } satisfies SeoMeta,

  anchors: platformAnchors,

  hero: {
    id: 'hero',
    eyebrow: 'Our Platform',
    heading: { roman: 'From pipeline', accent: 'to prompt' } satisfies Heading,
    media: {
      image: '/media/img-platform.jpg',
      generative: 'circuit' as const,
    },
  },

  overview: {
    id: 'overview',
    heading: { roman: 'Two products,', accent: 'one control plane' } satisfies Heading,
    paragraphs: [
      'Two products, one control plane. DataNerve governs how data moves through your estate. AINerve governs how models consume it. They share the same policy engine, the same audit trail and the same deployment — inside your own infrastructure.',
      'Built for organisations that cannot send data to a third party: banks, hospitals, government agencies and anyone operating under a regulator who will eventually ask to see the logs.',
    ],
  },

  products: {
    id: 'products',
    heading: { roman: 'What you', accent: 'deploy' } satisfies Heading,
    cards: [
      {
        index: '01',
        tag: 'Secure',
        title: 'DataNerve',
        blurb:
          'Zero-trust encryption for every pipeline. Data stays protected in motion, at rest and in use, with policy-based access enforced per field, per role, per request.',
        href: '/platform/datanerve',
      },
      {
        index: '02',
        tag: 'Govern',
        title: 'AINerve',
        blurb:
          'A real-time firewall for AI traffic. Prompts and responses are inspected, redacted or blocked in line, across every model provider you use.',
        href: '/platform/ainerve',
      },
      {
        index: '03',
        tag: 'Watch',
        title: 'SOCMINT',
        blurb:
          'Open-source exposure monitoring, correlated against the estate DataNerve already knows — so a leaked record can be traced back to the system it came from.',
        href: '/platform/socmint',
      },
      {
        index: '04',
        tag: 'Prove',
        title: 'Audit & Evidence',
        blurb:
          'Every decision all three products make is written to a signed, immutable record, mapped to the frameworks you report against.',
        href: '/platform/datanerve/governance',
      },
    ] satisfies readonly IndexedCard[],
  },

  /** The claim the whole platform rests on, given its own band with the deployment photography. */
  deployment: {
    id: 'deployment',
    heading: { roman: 'Your cloud,', accent: 'your region, your racks' } satisfies Heading,
    body: 'One deployment model, and it is yours. The control plane installs into your own account or your own hardware, including fully air-gapped environments. We operate nothing on your behalf and hold nothing of yours — there is no DataGateways tenant your data could sit in.',
    image: '/media/img-infrastructure.jpg',
    points: [
      'Your VPC, your on-premise cluster, or fully air-gapped',
      'Customer-managed keys in your own KMS or HSM',
      'Data residency decided by where you install it',
      'Upgrades on your maintenance window',
    ],
  },
} as const;

export type Platform = typeof platform;
