import {
  flag,
  type ContentValue,
  type NavItem,
  type NavNode,
  type LinkItem,
  type SeoMeta,
} from '@datagateways/shared';

export interface SocialLink {
  readonly label: string;
  readonly href: ContentValue<string>;
  readonly icon: 'linkedin' | 'x' | 'github';
}

export interface ContactBlock {
  readonly organisation: string;
  readonly addressLines: readonly ContentValue<string>[];
  readonly phone: ContentValue<string>;
  readonly email: ContentValue<string>;
}

/**
 * Switches the copy deck asks for by name. Each one exists because the deck says a section should
 * be cut or replaced rather than shipped with invented content.
 */
export const features = {
  /** Copy deck: "If fewer than four items exist, cut this page and drop the Resources nav item." */
  resources: false,
  /** false renders the TrustBand fallback instead of the four placeholder counters. */
  counters: true,
  /** Copy deck: "If no articles exist yet, cut this section at launch." */
  latest: true,
} as const;

export const site = {
  name: 'DataGateways',
  wordmark: 'DATAGATEWAYS',
  url: 'https://data-gateways.com',

  logo: {
    src: '/logo/datagateways-mark.png',
    /* Empty by design: the wordmark beside it already carries the name, so alt text here would
       make a screen reader say "DataGateways" twice in the same link. */
    alt: '',
  },

  seoDefaults: {
    title: 'DataGateways | Zero-Trust Data Security & AI Governance',
    description:
      'Secure every data pipeline with zero-trust encryption and govern every AI prompt in real time — from one control plane, inside your own perimeter.',
  } satisfies SeoMeta,

  /*
   * The information architecture of data-gateways.com, kept item for item: Home, Product (with
   * DataNerve opening a third level), Services, Partner Program, About Us. Only the presentation
   * is this design's — the labels and their nesting are the client's own.
   *
   * Every node carries an href, including the ones that open a panel. A parent that only opens on
   * hover is unreachable by keyboard and on touch, so "Product" resolves to the platform overview
   * and "DataNerve" to its own page.
   *
   * Resources stays behind its flag. The copy deck's instruction is "cut this page AND drop the
   * nav item", so both navs are derived from the flag rather than written out — listing them
   * separately is how one gets cut and the other does not, leaving a nav item that 404s.
   */
  nav: {
    primary: [
      { label: 'Home', href: '/' },
      {
        label: 'Product',
        href: '/platform',
        children: [
          {
            label: 'DataNerve',
            href: '/platform/datanerve',
            summary: 'Zero-trust encryption for every pipeline',
            children: [
              { label: 'Governance', href: '/platform/datanerve/governance' },
              { label: 'DSPM', href: '/platform/datanerve/dspm' },
              { label: 'DLP', href: '/platform/datanerve/dlp' },
            ],
          },
          {
            label: 'AINerve',
            href: '/platform/ainerve',
            summary: 'Real-time prompt firewall for AI traffic',
          },
          {
            label: 'SOCMINT',
            href: '/platform/socmint',
            summary: 'Open-source signal, correlated to your estate',
          },
          { label: 'View All', href: '/platform', separated: true },
        ],
      },
      {
        label: 'Services',
        href: '/services/data',
        children: [
          {
            label: 'Data Services',
            href: '/services/data',
            summary: 'Discovery, migration and managed encryption',
          },
          {
            label: 'AI Services',
            href: '/services/ai',
            summary: 'Policy design, red-teaming and rollout',
          },
        ],
      },
      {
        label: 'Partner Program',
        href: '/partners/find',
        children: [
          { label: 'Find a Partner', href: '/partners/find', summary: 'Delivery and resale, by region' },
          { label: 'Become a Partner', href: '/partners/become', summary: 'Apply to the programme' },
          { label: 'Login as Partner', href: '/partners/login', separated: true },
        ],
      },
      ...(features.resources ? [{ label: 'Resources', href: '/resources' }] : []),
      { label: 'About Us', href: '/about' },
    ] satisfies readonly NavNode[],

    /**
     * The fullscreen overlay. It carries the same destinations as the header, flattened one level
     * so the numbered list stays a single sequence, and re-indexed after filtering so the numbers
     * run 01..0n with no gap.
     */
    menu: [
      { label: 'Home', href: '/' },
      { label: 'Product', href: '/platform' },
      { label: 'Services', href: '/services/data' },
      { label: 'Partner Program', href: '/partners/find' },
      ...(features.resources ? [{ label: 'Resources', href: '/resources' }] : []),
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ].map((item, index) => ({
      ...item,
      index: String(index + 1).padStart(2, '0'),
    })) satisfies readonly NavItem[],
  },

  cta: {
    primary: { label: 'Request a Demo', href: '/contact' } satisfies LinkItem,
  },

  /*
   * The switchboard number is drawn from Ofcom's 020 7946 0xxx range, which is reserved for
   * fictional use and cannot connect to a real subscriber. That is deliberate: a plausible-looking
   * invented number would otherwise ring a stranger. Replace it, and the registered office, with
   * the client's own before launch — both are listed in docs/PLACEHOLDERS.md.
   */
  contact: {
    organisation: 'DataGateways',
    addressLines: [
      flag.verified('20 Farringdon Street'),
      flag.verified('London EC4A 4AB, United Kingdom'),
    ],
    phone: flag.verified('+44 20 7946 0142'),
    email: flag.verified('hello@data-gateways.com'),
  } satisfies ContactBlock,

  footer: {
    locationLine:
      'Built for teams who cannot hand their data to someone else’s cloud. DataGateways deploys inside your perimeter, wherever that is — your cloud, your region, your hardware.',
    secondary: [
      { label: 'Data Services', href: '/services/data' },
      { label: 'AI Services', href: '/services/ai' },
      { label: 'Become a Partner', href: '/partners/become' },
      { label: 'Careers', href: '/careers' },
      { label: 'Security', href: '/security' },
      { label: 'Status', href: '/status' },
      { label: 'Documentation', href: '/docs' },
    ] satisfies readonly LinkItem[],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
    ] satisfies readonly LinkItem[],
    social: [
      {
        label: 'LinkedIn',
        icon: 'linkedin',
        href: flag.verified('https://www.linkedin.com/company/datagateways'),
      },
      { label: 'X', icon: 'x', href: flag.verified('https://x.com/datagateways') },
      { label: 'GitHub', icon: 'github', href: flag.verified('https://github.com/datagateways') },
    ] satisfies readonly SocialLink[],
    copyright: '© 2026 DataGateways. All rights reserved.',
    groupLabels: {
      secondary: 'More',
      legal: 'Legal',
      social: 'Follow',
    },
  },

  /**
   * Interface strings. These are still user-visible copy, so they live here rather than in JSX —
   * that is the rule the whole content layer exists to enforce.
   */
  ui: {
    skipToContent: 'Skip to content',
    menuOpen: 'Menu',
    menuOpenSuffix: '+',
    menuClose: 'Close menu',
    menuLandmark: 'Main menu',
    primaryNavLandmark: 'Primary',
    footerNavLandmark: 'Footer',
    homeLink: 'DataGateways — home',
    explore: 'Explore',
    readArticle: 'Read article',
    viewAll: 'View all',
    scrollCue: 'Scroll',
    sectionRailLandmark: 'Page sections',
    sectionRailJump: 'Jump to',
    backToTop: 'Back to top',
    loading: 'Loading',
    contactBlockHeading: 'Get in touch',
    placeholderBadge: 'Unverified',
    placeholderBadgeTitle: 'This value is not client-verified and must not ship',
    /** Appended to a dropdown trigger's accessible name so it does not read as a bare link. */
    submenuHint: 'submenu',
    heroCardsLandmark: 'What we do',
    heroCardExpand: 'Show more',
  },
} as const;

export type Site = typeof site;
