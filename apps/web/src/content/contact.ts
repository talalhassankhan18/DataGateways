import {
  flag,
  type ContactBranch,
  type ContentValue,
  type Heading,
  type LinkItem,
  type SeoMeta,
} from '@datagateways/shared';
import type { AnchorDef } from './home';

export interface WizardOption {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly line: string;
}

export interface WizardQuestion {
  /** Plain text, used for the assistive-tech announcement when the step changes. */
  readonly question: string;
  /** The same question pre-split for SplitHeading, per the copy deck's rule for headlines. */
  readonly heading: Heading;
  readonly options: readonly WizardOption[];
}

export interface ClosingPanel {
  /**
   * The matching step-1 option title, split for SplitHeading. No new words: the deck supplies no
   * step-3 headline, so this reuses the branch the reader already chose rather than inventing one.
   */
  readonly heading: Heading;
  readonly body: string;
  readonly email: ContentValue<string>;
  readonly secondary: LinkItem;
}

export const contactAnchors: readonly AnchorDef[] = [
  { id: 'hero', label: 'Intro' },
  { id: 'wizard', label: 'Enquiry' },
  { id: 'location', label: 'Location' },
];

export const contact = {
  seo: {
    title: 'Contact DataGateways',
    description: 'Tell us what you’re protecting and we’ll route you to the right team.',
  } satisfies SeoMeta,

  anchors: contactAnchors,

  hero: {
    id: 'hero',
    eyebrow: 'Contact',
    heading: { roman: 'Tell us what', accent: 'you’re protecting' } satisfies Heading,
    media: { image: '/media/hero-contact.svg', generative: 'architecture' as const },
  },

  wizard: {
    id: 'wizard',
    totalSteps: 3,

    labels: {
      back: 'Back',
      startOver: 'Start over',
      progressOf: 'of',
      stepWord: 'Step',
      /** Announced to assistive tech when the step changes. */
      stepChanged: 'Step {current} of {total}: {question}',
      chooseOne: 'Choose one',
    },

    step1: {
      question: 'What brings you here?',
      heading: { roman: 'What brings', accent: 'you here?' },
      options: [
        {
          id: 'evaluate',
          index: '01',
          title: 'Evaluate the platform',
          line: 'See DataNerve or AINerve against your own environment',
        },
        {
          id: 'partner',
          index: '02',
          title: 'Partner with us',
          line: 'Integrations, resale and joint delivery',
        },
        {
          id: 'support',
          index: '03',
          title: 'Get support',
          line: 'Existing deployment, account or security question',
        },
        {
          id: 'careers',
          index: '04',
          title: 'Join the team',
          line: 'Open roles and speculative applications',
        },
      ],
    } satisfies WizardQuestion,

    step2: {
      evaluate: {
        question: 'What are you protecting?',
        heading: { roman: 'What are', accent: 'you protecting?' },
        options: [
          {
            id: 'data-pipelines',
            index: '01',
            title: 'Data pipelines',
            line: 'Encryption and access control across the estate',
          },
          {
            id: 'ai-usage',
            index: '02',
            title: 'AI usage',
            line: 'Prompt inspection, redaction and governance',
          },
          { id: 'both', index: '03', title: 'Both', line: 'One control plane across data and models' },
        ],
      },
      partner: {
        question: 'What kind of partnership?',
        heading: { roman: 'What kind', accent: 'of partnership?' },
        options: [
          {
            id: 'technology',
            index: '01',
            title: 'Technology integration',
            line: 'Connect your platform to ours',
          },
          {
            id: 'reseller',
            index: '02',
            title: 'Reseller or channel',
            line: 'Take DataGateways to your own market',
          },
          {
            id: 'delivery',
            index: '03',
            title: 'Delivery partner',
            line: 'Implement on behalf of your clients',
          },
        ],
      },
      support: {
        question: 'What do you need?',
        heading: { roman: 'What do', accent: 'you need?' },
        options: [
          {
            id: 'technical',
            index: '01',
            title: 'Technical issue',
            line: 'Something in a running deployment',
          },
          {
            id: 'billing',
            index: '02',
            title: 'Account or billing',
            line: 'Licensing, renewals and users',
          },
          {
            id: 'vulnerability',
            index: '03',
            title: 'Report a vulnerability',
            line: 'Responsible disclosure, handled seriously',
          },
        ],
      },
      careers: {
        question: 'Where do you fit?',
        heading: { roman: 'Where do', accent: 'you fit?' },
        options: [
          {
            id: 'engineering',
            index: '01',
            title: 'Engineering',
            line: 'Platform, cryptography and infrastructure',
          },
          {
            id: 'go-to-market',
            index: '02',
            title: 'Go to market',
            line: 'Sales, solutions engineering and marketing',
          },
          {
            id: 'other',
            index: '03',
            title: 'Something else',
            line: 'Tell us what you would do here',
          },
        ],
      },
    } satisfies Record<ContactBranch, WizardQuestion>,

    step3: {
      evaluate: {
        heading: { roman: 'Evaluate the', accent: 'platform' },
        body: 'Our solutions engineers would rather show you the product against your own data than run a slide deck. Tell us what you’re protecting and where it lives, and we’ll take it from there.',
        email: flag.verified('sales@data-gateways.com'),
        secondary: { label: 'See the platform', href: '/platform' },
      },
      partner: {
        heading: { roman: 'Partner', accent: 'with us' },
        body: 'We work with a small number of integration and delivery partners. A line about your organisation and what you have in mind is enough to start the conversation.',
        email: flag.verified('partners@data-gateways.com'),
        secondary: { label: 'Read the docs', href: '/docs' },
      },
      support: {
        heading: { roman: 'Get', accent: 'support' },
        body: 'Existing customers should use the support portal for anything time-sensitive. For vulnerability reports, our disclosure policy and PGP key are on the security page.',
        email: flag.verified('support@data-gateways.com'),
        secondary: { label: 'Security policy', href: '/security' },
      },
      careers: {
        heading: { roman: 'Join', accent: 'the team' },
        body: 'We hire slowly and keep teams small. If nothing open matches you, send us what you’d want to work on — we read every one.',
        email: flag.verified('careers@data-gateways.com'),
        secondary: { label: 'See open roles', href: '/careers' },
      },
    } satisfies Record<ContactBranch, ClosingPanel>,
  },

  form: {
    legend: 'Your details',
    fields: {
      name: { label: 'Your name', autoComplete: 'name' },
      email: { label: 'Work email', autoComplete: 'email' },
      organisation: { label: 'Organisation', autoComplete: 'organization' },
      message: {
        label: 'Anything we should know first?',
        hint: 'A couple of lines is plenty.',
        autoComplete: 'off',
      },
      /** Honeypot. Visually hidden and hidden from assistive tech; a human never sees it. */
      website: { label: 'Website' },
    },
    submit: 'Write to us',
    submitting: 'Sending',
    success: {
      heading: { roman: 'Got it —', accent: 'that is with the right team' } satisfies Heading,
      body: 'Your message is routed and logged. Keep the reference below if you need to follow it up.',
      referenceLabel: 'Reference',
      again: 'Send another',
    },
    mailtoPrefix: 'Or email us directly:',
    errors: {
      name: 'Tell us who you are.',
      email: 'Enter a work email address we can reply to.',
      organisation: 'Tell us which organisation you are with.',
      message: 'Add a line or two so we can route this properly.',
      tooLong: 'That is longer than we can accept.',
      generic: 'That did not send. Try again, or email us directly.',
      rateLimited: 'That is a lot of messages from one place. Try again later, or email us directly.',
    },
  },

  location: {
    id: 'location',
    heading: { roman: 'Find us', accent: 'here' } satisfies Heading,
    body: 'Visits by appointment. For anything urgent, call during working hours and we’ll point you to the right team.',
  },
} as const;

export type Contact = typeof contact;
