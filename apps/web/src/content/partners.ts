import type { CtaBandContent, Heading, IndexedCard, SeoMeta } from '@datagateways/shared';
import type { AnchorDef } from './home';

/** One entry in the partner directory. */
export interface PartnerListing {
  readonly name: string;
  readonly tier: 'Delivery' | 'Technology' | 'Reseller';
  readonly region: string;
  readonly focus: string;
  readonly specialisms: readonly string[];
}

export const partnerAnchors: readonly AnchorDef[] = [
  { id: 'hero', label: 'Intro' },
  { id: 'lead', label: 'Summary' },
  { id: 'directory', label: 'Directory' },
  { id: 'showcase', label: 'Working together' },
];

export const becomeAnchors: readonly AnchorDef[] = [
  { id: 'hero', label: 'Intro' },
  { id: 'lead', label: 'Summary' },
  { id: 'tiers', label: 'Tiers' },
  { id: 'process', label: 'Applying' },
  { id: 'showcase', label: 'What you get' },
];

export const partners = {
  /* ------------------------------------------------------------------ Find a Partner */
  find: {
    seo: {
      title: 'Find a Partner | DataGateways',
      description:
        'Delivery, technology and reseller partners certified to implement DataNerve and AINerve, listed by region and specialism.',
    } satisfies SeoMeta,

    anchors: partnerAnchors,

    hero: {
      id: 'hero',
      eyebrow: 'Partner Program',
      heading: { roman: 'Certified to', accent: 'deliver this properly' },
      media: { image: '/media/img-partners.jpg', generative: 'lattice' as const },
    },

    lead: {
      id: 'lead',
      text: 'We keep the partner list short on purpose. Every organisation below has engineers who have passed our implementation certification and have taken a DataGateways deployment into production — which is a different claim from having signed an agreement.',
    },

    directory: {
      id: 'directory',
      heading: { roman: 'Our', accent: 'partners' },
      filterLabel: 'Filter partners by region',
      emptyState: 'No partners are listed in this region yet — talk to us and we will route you directly.',
      listings: [
        {
          name: 'Northgate Data Consulting',
          tier: 'Delivery',
          region: 'United Kingdom & Ireland',
          focus: 'Financial services and insurance',
          specialisms: ['DataNerve', 'Migration', 'Managed encryption'],
        },
        {
          name: 'Meridian Cloud Partners',
          tier: 'Delivery',
          region: 'United Kingdom & Ireland',
          focus: 'Public sector and healthcare',
          specialisms: ['DataNerve', 'DSPM', 'Air-gapped deployment'],
        },
        {
          name: 'Brandt & Sohn Systemhaus',
          tier: 'Reseller',
          region: 'DACH',
          focus: 'Manufacturing and energy',
          specialisms: ['DataNerve', 'AINerve', 'On-premise'],
        },
        {
          name: 'Nordlys Security',
          tier: 'Delivery',
          region: 'Nordics',
          focus: 'Banking and telecommunications',
          specialisms: ['AINerve', 'Governance', 'Red-teaming'],
        },
        {
          name: 'Arcadia Integration Group',
          tier: 'Technology',
          region: 'North America',
          focus: 'Warehouse and pipeline tooling',
          specialisms: ['Integrations', 'dbt', 'Snowflake'],
        },
        {
          name: 'Halcyon Risk Advisory',
          tier: 'Delivery',
          region: 'North America',
          focus: 'Regulated healthcare',
          specialisms: ['DataNerve', 'HIPAA readiness', 'DLP'],
        },
        {
          name: 'Cedar Gulf Technologies',
          tier: 'Reseller',
          region: 'Middle East',
          focus: 'Government and energy',
          specialisms: ['DataNerve', 'Data residency', 'On-premise'],
        },
        {
          name: 'Tessera Analytics',
          tier: 'Technology',
          region: 'Asia Pacific',
          focus: 'AI platform tooling',
          specialisms: ['AINerve', 'Model gateways', 'Observability'],
        },
        {
          name: 'Kōwhai Digital',
          tier: 'Delivery',
          region: 'Asia Pacific',
          focus: 'Public sector',
          specialisms: ['DataNerve', 'Governance', 'Training'],
        },
      ] satisfies readonly PartnerListing[],
    },

    showcase: {
      id: 'showcase',
      heading: { roman: 'Certified means', accent: 'something here' },
      body: 'A partner badge is only useful if it predicts the quality of the delivery. Ours requires named engineers to hold a current certification, a reference deployment running in production, and an annual re-assessment against the current release — so the list shrinks as well as grows.',
      image: '/media/img-governance.jpg',
      points: [
        'Named certified engineers, not a company-level badge',
        'At least one production reference deployment',
        'Annual re-assessment against the current release',
        'Escalation path directly into our own engineering team',
      ],
    },

    cta: {
      heading: { roman: 'Not sure who', accent: 'fits your project?' },
      action: { label: 'Ask us directly', href: '/contact' },
    } satisfies CtaBandContent,
  },

  /* --------------------------------------------------------------- Become a Partner */
  become: {
    seo: {
      title: 'Become a Partner | DataGateways',
      description:
        'Apply to the DataGateways partner programme — delivery, technology and reseller tiers, with certification, margin and engineering access.',
    } satisfies SeoMeta,

    anchors: becomeAnchors,

    hero: {
      id: 'hero',
      eyebrow: 'Partner Program',
      heading: { roman: 'Build on', accent: 'the control plane' },
      media: { image: '/media/img-integrations.jpg', generative: 'circuit' as const },
    },

    lead: {
      id: 'lead',
      text: 'We work with a small number of partners and invest properly in each one. If your team already delivers data platform or security work in a regulated sector, there is likely a fit — tell us what you do and who you do it for.',
    },

    tiers: {
      id: 'tiers',
      heading: { roman: 'Three ways', accent: 'to work with us' },
      cards: [
        {
          index: '01',
          tag: 'Deliver',
          title: 'Delivery Partner',
          blurb:
            'You implement DataNerve and AINerve for your own clients. We certify your engineers, give you a sandbox tenant and stay reachable for escalation.',
        },
        {
          index: '02',
          tag: 'Integrate',
          title: 'Technology Partner',
          blurb:
            'You build a supported integration between your platform and ours. Joint reference architecture, listing in the integrations grid, engineering contact throughout.',
        },
        {
          index: '03',
          tag: 'Resell',
          title: 'Reseller',
          blurb:
            'You take DataGateways to your own market under a margin agreement, with deal registration, co-marketing support and pre-sales engineering on call.',
        },
      ] satisfies readonly IndexedCard[],
    },

    process: {
      id: 'process',
      heading: { roman: 'How applying', accent: 'works' },
      intro:
        'Four steps, roughly six weeks end to end. We would rather say no in week one than three months in, so the qualifying conversation comes first.',
      steps: [
        {
          index: '01',
          title: 'Introduction',
          blurb:
            'A short call about your practice, your market and the clients you already serve. We are honest at this point about whether there is a fit.',
        },
        {
          index: '02',
          title: 'Technical Fit',
          blurb:
            'A working session with your engineers and ours against a sandbox tenant, to see how the platform sits alongside what you already deliver.',
        },
        {
          index: '03',
          title: 'Certification',
          blurb:
            'Two named engineers complete the implementation certification — a build exercise against a live environment, not a multiple-choice test.',
        },
        {
          index: '04',
          title: 'Launch',
          blurb:
            'Agreement signed, directory listing published, deal registration opened and a first joint opportunity worked together.',
        },
      ] satisfies readonly IndexedCard[],
    },

    showcase: {
      id: 'showcase',
      heading: { roman: 'What partners', accent: 'actually get' },
      body: 'Not a portal full of PDFs. A sandbox tenant that stays current with the release train, engineers who answer in a shared channel, deal registration that is honoured, and a directory listing that we keep short enough to be worth appearing in.',
      image: '/media/img-services-data.jpg',
      points: [
        'Persistent sandbox tenant on the current release',
        'Shared engineering channel with named contacts',
        'Deal registration with protected margin',
        'Co-marketing budget and joint reference architectures',
      ],
    },

    cta: {
      heading: { roman: 'Tell us about', accent: 'your practice' },
      action: { label: 'Apply to the programme', href: '/contact' },
    } satisfies CtaBandContent,
  },

  /* ------------------------------------------------------------------ Partner login */
  login: {
    seo: {
      title: 'Partner Login | DataGateways',
      description:
        'Sign in to the DataGateways partner portal for deal registration, certification records, sandbox tenants and release notes.',
    } satisfies SeoMeta,

    anchors: [{ id: 'hero', label: 'Sign in' }] as readonly AnchorDef[],

    hero: {
      id: 'hero',
      eyebrow: 'Partner Program',
      heading: { roman: 'Partner', accent: 'portal' } satisfies Heading,
    },

    intro:
      'Deal registration, certification records, sandbox tenants and pre-release notes. Access is provisioned by your partner manager — it is not self-service.',

    form: {
      emailLabel: 'Work email',
      emailPlaceholder: 'you@yourcompany.com',
      passwordLabel: 'Password',
      submitLabel: 'Sign in',
      ssoLabel: 'Continue with SSO',
      forgotLabel: 'Forgotten your password?',
      forgotHref: '/contact',
    },

    /*
     * There is no authentication behind this form, and it must not pretend otherwise. Submitting
     * shows this notice instead of a failed login, so nobody types a real credential into a page
     * that cannot check one. Wire it to the real identity provider before launch.
     */
    notice:
      'Portal authentication is not connected in this build. Your partner manager can reach the portal on your behalf in the meantime — or contact us and we will route you.',

    help: {
      heading: { roman: 'No access', accent: 'yet?' } satisfies Heading,
      body: 'Portal accounts are created for certified partners as part of onboarding. If your organisation is in the programme but you cannot sign in, your partner manager can add you.',
      actions: [
        { label: 'Become a partner', href: '/partners/become' },
        { label: 'Contact us', href: '/contact' },
      ],
    },
  },
} as const;

export type Partners = typeof partners;
