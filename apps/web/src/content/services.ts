import type { CtaBandContent, Heading, IndexedCard, SeoMeta } from '@datagateways/shared';
import type { AnchorDef } from './home';

export const SERVICE_SLUGS = ['data', 'ai'] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const isServiceSlug = (value: string | undefined): value is ServiceSlug =>
  value !== undefined && (SERVICE_SLUGS as readonly string[]).includes(value);

/** One phase of an engagement: what happens, and what the client is holding at the end of it. */
export interface EngagementPhase {
  readonly index: string;
  readonly title: string;
  readonly duration: string;
  readonly blurb: string;
  readonly deliverable: string;
}

export interface ServicePage {
  readonly slug: ServiceSlug;
  readonly name: string;
  readonly seo: SeoMeta;
  readonly anchors: readonly AnchorDef[];
  readonly hero: {
    readonly id: string;
    readonly eyebrow: string;
    readonly heading: Heading;
    readonly media: { readonly image: string; readonly generative: 'lattice' | 'signal' };
  };
  readonly lead: { readonly id: string; readonly text: string };
  readonly offerings: {
    readonly id: string;
    readonly heading: Heading;
    readonly cards: readonly IndexedCard[];
  };
  readonly engagement: {
    readonly id: string;
    readonly heading: Heading;
    readonly intro: string;
    readonly phases: readonly EngagementPhase[];
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

const serviceAnchors: readonly AnchorDef[] = [
  { id: 'hero', label: 'Intro' },
  { id: 'lead', label: 'Summary' },
  { id: 'offerings', label: 'Services' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'showcase', label: 'Working with us' },
];

const dataServices: ServicePage = {
  slug: 'data',
  name: 'Data Services',

  seo: {
    title: 'Data Services | DataGateways',
    description:
      'Discovery, classification, migration and managed encryption, delivered by the engineers who build DataNerve — inside your perimeter, on your timetable.',
  },

  anchors: serviceAnchors,

  hero: {
    id: 'hero',
    eyebrow: 'Services',
    heading: { roman: 'The hard part', accent: 'is the estate' },
    media: { image: '/media/img-services-data.jpg', generative: 'lattice' },
  },

  lead: {
    id: 'lead',
    text: 'Buying an encryption platform is straightforward. Mapping fourteen years of pipelines, working out which of them still matter and cutting them over without an outage is not. Our data services team does that part with you.',
  },

  offerings: {
    id: 'offerings',
    heading: { roman: 'What we', accent: 'take on' },
    cards: [
      {
        index: '01',
        tag: 'Assess',
        title: 'Discovery & Classification',
        blurb:
          'A full inventory of where sensitive data lives across databases, warehouses, buckets and the snapshots nobody remembers, classified field by field against your own schemas.',
      },
      {
        index: '02',
        tag: 'Design',
        title: 'Encryption Architecture',
        blurb:
          'Key hierarchy, residency boundaries, rotation policy and break-glass procedure, designed against your regulator and your actual failure modes rather than a reference diagram.',
      },
      {
        index: '03',
        tag: 'Move',
        title: 'Migration & Cutover',
        blurb:
          'Phased rollout with dual-write and shadow-read stages, so protection is proven on real traffic before anything depends on it. Rollback is a step in the plan, not an incident.',
      },
      {
        index: '04',
        tag: 'Run',
        title: 'Managed Encryption',
        blurb:
          'Ongoing operation of the control plane in your environment — upgrades, key rotation, policy review and an on-call path — while your team keeps the keys.',
      },
    ],
  },

  engagement: {
    id: 'engagement',
    heading: { roman: 'How an engagement', accent: 'runs' },
    intro:
      'Four phases, each ending in something you keep whether or not you continue to the next one. No phase is a prerequisite for a licence, and the deliverables are yours either way.',
    phases: [
      {
        index: '01',
        title: 'Scoping',
        duration: '1–2 weeks',
        blurb:
          'Workshops with your data, platform and compliance teams to agree what is in scope, what the regulator actually asks for and what "done" looks like.',
        deliverable: 'Scope statement and success criteria',
      },
      {
        index: '02',
        title: 'Discovery',
        duration: '2–4 weeks',
        blurb:
          'Automated inventory and classification across the estate, reviewed with the owning teams to separate real exposure from noise.',
        deliverable: 'Data inventory and risk register',
      },
      {
        index: '03',
        title: 'Pilot',
        duration: '4–8 weeks',
        blurb:
          'One meaningful pipeline taken end to end in production, with the runbook, the monitoring and the rollback path proven rather than described.',
        deliverable: 'Production pilot and operating runbook',
      },
      {
        index: '04',
        title: 'Rollout',
        duration: 'Ongoing',
        blurb:
          'The remaining estate migrated in waves your change process can absorb, with your own engineers progressively taking the controls.',
        deliverable: 'Migrated estate and a trained internal team',
      },
    ],
  },

  showcase: {
    id: 'showcase',
    heading: { roman: 'Your engineers', accent: 'end up owning it' },
    body: 'A services engagement that leaves the client dependent on the vendor has failed, however well the deployment went. Every phase is run in pairs with your own team, the runbooks are written in your repository, and the exit criterion is that your engineers can do the next wave without us in the room.',
    image: '/media/img-infrastructure.jpg',
    points: [
      'Paired delivery with your platform and data teams',
      'Runbooks and infrastructure code in your repository',
      'No proprietary tooling you cannot operate yourselves',
      'Fixed-scope phases with a defined exit at each one',
    ],
  },

  cta: {
    heading: { roman: 'Start with', accent: 'a scoping call' },
    action: { label: 'Talk to the team', href: '/contact' },
  },
};

const aiServices: ServicePage = {
  slug: 'ai',
  name: 'AI Services',

  seo: {
    title: 'AI Services | DataGateways',
    description:
      'AI policy design, red-teaming and governed rollout — so your teams can use models under a control framework your regulator will accept.',
  },

  anchors: serviceAnchors,

  hero: {
    id: 'hero',
    eyebrow: 'Services',
    heading: { roman: 'Adopt models', accent: 'without the guesswork' },
    media: { image: '/media/img-services-ai.jpg', generative: 'signal' },
  },

  lead: {
    id: 'lead',
    text: 'Your teams started using models before anyone wrote a policy for it. Our AI services team helps you find out what is already happening, decide what should be allowed, and put controls behind that decision that people will not immediately work around.',
  },

  offerings: {
    id: 'offerings',
    heading: { roman: 'What we', accent: 'take on' },
    cards: [
      {
        index: '01',
        tag: 'Find',
        title: 'Shadow AI Assessment',
        blurb:
          'A read on what models your organisation is actually using, by which teams, with what data — before writing a policy that assumes something different.',
      },
      {
        index: '02',
        tag: 'Decide',
        title: 'Policy & Control Design',
        blurb:
          'An AI use policy that maps to the EU AI Act and your sector regulator, expressed as enforceable rules rather than a PDF nobody can implement.',
      },
      {
        index: '03',
        tag: 'Test',
        title: 'Red-Teaming',
        blurb:
          'Adversarial testing of your deployed assistants and agents — prompt injection, data exfiltration, tool misuse — with findings written up for engineers, not for a slide.',
      },
      {
        index: '04',
        tag: 'Ship',
        title: 'Governed Rollout',
        blurb:
          'AINerve deployed in front of the providers your teams already use, with allow-lists, redaction and spend limits phased in so adoption is not punished.',
      },
    ],
  },

  engagement: {
    id: 'engagement',
    heading: { roman: 'How an engagement', accent: 'runs' },
    intro:
      'Deliberately short phases. AI usage in most organisations changes faster than a six-month programme can track, so each phase is sized to produce something useful before the picture moves.',
    phases: [
      {
        index: '01',
        title: 'Baseline',
        duration: '2 weeks',
        blurb:
          'Discovery of current model usage across teams, providers and data types, with no enforcement switched on — you cannot govern what you have not measured.',
        deliverable: 'Usage baseline and exposure report',
      },
      {
        index: '02',
        title: 'Policy',
        duration: '2–3 weeks',
        blurb:
          'Workshops with legal, security and the teams actually building, ending in a policy that is both defensible to a regulator and survivable for engineers.',
        deliverable: 'AI use policy and control mapping',
      },
      {
        index: '03',
        title: 'Assurance',
        duration: '2–4 weeks',
        blurb:
          'Red-teaming of the highest-exposure assistant or agent, with reproducible findings and fixes verified rather than recommended.',
        deliverable: 'Red-team report and verified remediations',
      },
      {
        index: '04',
        title: 'Enforcement',
        duration: 'Ongoing',
        blurb:
          'AINerve rolled out in monitor mode first, then enforcing, team by team, with the thresholds tuned against real traffic.',
        deliverable: 'Enforcing gateway and tuned rule set',
      },
    ],
  },

  showcase: {
    id: 'showcase',
    heading: { roman: 'Monitor first,', accent: 'enforce second' },
    body: 'A gateway switched to blocking on day one generates a week of false positives and a permanent reputation for getting in the way. Every rollout we run starts in monitor mode on real traffic, so the thresholds are tuned against what your teams genuinely do before anything is refused.',
    image: '/media/img-dspm.jpg',
    points: [
      'Monitor-mode baseline before a single request is blocked',
      'Thresholds tuned per team, not set globally',
      'Exception path designed up front, so people use it',
      'Handover to your own security team as the exit criterion',
    ],
  },

  cta: {
    heading: { roman: 'Find out what', accent: 'is already happening' },
    action: { label: 'Talk to the team', href: '/contact' },
  },
};

export const services: Record<ServiceSlug, ServicePage> = { data: dataServices, ai: aiServices };
