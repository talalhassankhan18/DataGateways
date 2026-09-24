import {
  flag,
  type CtaBandContent,
  type Heading,
  type IntegrationTile,
  type IntegrationsSection,
  type SeoMeta,
  type TierCard,
} from '@datagateways/shared';
import type { AnchorDef } from './home';

export const PRODUCT_SLUGS = ['datanerve', 'ainerve', 'socmint'] as const;
export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export const isProductSlug = (value: string | undefined): value is ProductSlug =>
  value !== undefined && (PRODUCT_SLUGS as readonly string[]).includes(value);

/** An image-led band between the tier cards and the integrations grid. */
export interface ProductShowcase {
  readonly id: string;
  readonly heading: Heading;
  readonly body: string;
  readonly image: string;
  readonly points: readonly string[];
}

export interface ProductPage {
  readonly slug: ProductSlug;
  readonly name: string;
  readonly seo: SeoMeta;
  readonly anchors: readonly AnchorDef[];
  readonly hero: {
    readonly id: string;
    readonly eyebrow: string;
    readonly heading: Heading;
    readonly media: { readonly image: string; readonly generative: 'cipher' | 'signal' | 'circuit' };
  };
  readonly lead: { readonly id: string; readonly text: string };
  readonly tiers: { readonly id: string; readonly heading: Heading; readonly cards: readonly TierCard[] };
  readonly showcase: ProductShowcase;
  readonly integrations: IntegrationsSection & { readonly id: string };
  readonly cta: CtaBandContent;
}

const productAnchors: readonly AnchorDef[] = [
  { id: 'hero', label: 'Intro' },
  { id: 'lead', label: 'Summary' },
  { id: 'tiers', label: 'Capabilities' },
  { id: 'showcase', label: 'In practice' },
  { id: 'integrations', label: 'Integrations' },
];

/**
 * Every name in these grids is a third-party product, listed under nominative use — the ordinary
 * way one vendor says what it connects to. They are still a factual claim about supported scope,
 * so the client's product team signs the lists off before launch; see docs/PLACEHOLDERS.md.
 */
const tiles = (entries: readonly (readonly [string, string])[]): readonly IntegrationTile[] =>
  entries.map(([name, categoryId]) => ({ name, categoryId }));

const datanerve: ProductPage = {
  slug: 'datanerve',
  name: 'DataNerve',

  seo: {
    title: 'DataNerve | Zero-Trust Data Pipeline Encryption',
    description:
      'Encrypt data in motion, at rest and in use. Policy-based access on every pipeline, with cryptographic proof for auditors.',
  },

  anchors: productAnchors,

  hero: {
    id: 'hero',
    eyebrow: 'Our Platform — DataNerve',
    heading: { roman: 'Encryption that', accent: 'follows the data' },
    media: { image: '/media/img-datanerve.jpg', generative: 'cipher' },
  },

  lead: {
    id: 'lead',
    text: 'Most encryption protects data while it sits still and gives up the moment it moves. DataNerve keeps protection attached to the data itself, across every hop in every pipeline.',
  },

  tiers: {
    id: 'tiers',
    heading: { roman: 'Protect, control', accent: 'and prove' },
    cards: [
      {
        index: '01',
        title: 'Protect',
        sentence: 'Encryption that holds wherever the data ends up.',
        bullets: [
          flag.verified('Encryption in motion, at rest and in use'),
          flag.verified('Field-level protection, not just whole-volume'),
          flag.verified('Customer-managed keys, held only by you'),
          flag.verified('Format-preserving options for legacy systems'),
        ],
      },
      {
        index: '02',
        title: 'Control',
        sentence: 'Access decided per request, never assumed.',
        bullets: [
          flag.verified('Policy-based access by role and attribute'),
          flag.verified('Identity passthrough to the original requester'),
          flag.verified('Dynamic masking and redaction on read'),
          flag.verified('Revocation that takes effect immediately'),
        ],
      },
      {
        index: '03',
        title: 'Prove',
        sentence: 'Evidence your auditors will accept.',
        bullets: [
          flag.verified('Signed, immutable access records'),
          flag.verified('Lineage tracking across every pipeline hop'),
          flag.verified('Framework mappings for SOC 2, ISO 27001, GDPR and HIPAA'),
          flag.verified('Exportable evidence packs on demand'),
        ],
      },
    ],
  },

  showcase: {
    id: 'showcase',
    heading: { roman: 'Deployed inside', accent: 'your own perimeter' },
    body: 'DataNerve installs as a control plane in your own cloud account, your own region or your own racks. Keys stay in your KMS, ciphertext never leaves your network, and we operate nothing on your behalf — which is what makes the answer to "where does our data go?" simply "nowhere".',
    image: '/media/img-infrastructure.jpg',
    points: [
      'Runs in your VPC, on-premise or fully air-gapped',
      'Customer-managed keys in your own KMS or HSM',
      'Horizontal scale with no shared control plane',
      'Upgrade on your maintenance window, not ours',
    ],
  },

  integrations: {
    id: 'integrations',
    heading: { roman: 'Drops into', accent: 'what you already run' },
    countBadge: flag.verified('31'),
    countLabel: 'Integrations',
    tabs: [
      { id: 'all', label: 'All' },
      { id: 'databases', label: 'Databases' },
      { id: 'warehouses', label: 'Warehouses' },
      { id: 'cloud', label: 'Cloud' },
      { id: 'pipelines', label: 'Pipelines' },
      { id: 'siem', label: 'SIEM & Logging' },
    ],
    tiles: flag.verified(
      tiles([
        ['PostgreSQL', 'databases'],
        ['MySQL', 'databases'],
        ['MongoDB', 'databases'],
        ['Oracle Database', 'databases'],
        ['SQL Server', 'databases'],
        ['Cassandra', 'databases'],
        ['Elasticsearch', 'databases'],
        ['Snowflake', 'warehouses'],
        ['Databricks', 'warehouses'],
        ['BigQuery', 'warehouses'],
        ['Amazon Redshift', 'warehouses'],
        ['Azure Synapse', 'warehouses'],
        ['ClickHouse', 'warehouses'],
        ['Amazon S3', 'cloud'],
        ['AWS', 'cloud'],
        ['Microsoft Azure', 'cloud'],
        ['Google Cloud', 'cloud'],
        ['Oracle Cloud', 'cloud'],
        ['Kubernetes', 'cloud'],
        ['HashiCorp Vault', 'cloud'],
        ['Apache Kafka', 'pipelines'],
        ['Apache Airflow', 'pipelines'],
        ['dbt', 'pipelines'],
        ['Fivetran', 'pipelines'],
        ['Apache NiFi', 'pipelines'],
        ['Apache Spark', 'pipelines'],
        ['Splunk', 'siem'],
        ['Microsoft Sentinel', 'siem'],
        ['Elastic Security', 'siem'],
        ['IBM QRadar', 'siem'],
        ['Datadog', 'siem'],
      ]),
    ),
    emptyState: 'No integrations match this filter.',
  },

  cta: {
    heading: { roman: 'See it against', accent: 'your own data' },
    action: { label: 'Request a Demo', href: '/contact' },
  },
};

const ainerve: ProductPage = {
  slug: 'ainerve',
  name: 'AINerve',

  seo: {
    title: 'AINerve | Real-Time AI Prompt Firewall and Governance',
    description:
      'Inspect, redact and block prompts before they reach a model. Full audit trails on every AI interaction across every provider.',
  },

  anchors: productAnchors,

  hero: {
    id: 'hero',
    eyebrow: 'Our Platform — AINerve',
    heading: { roman: 'Govern every prompt', accent: 'before it lands' },
    media: { image: '/media/img-ainerve.jpg', generative: 'signal' },
  },

  lead: {
    id: 'lead',
    text: 'Your teams are already using models. AINerve sits between them and every provider, inspecting what goes out and what comes back, in real time, without anyone changing how they work.',
  },

  tiers: {
    id: 'tiers',
    heading: { roman: 'Inspect, enforce', accent: 'and audit' },
    cards: [
      {
        index: '01',
        title: 'Inspect',
        sentence: 'See every AI interaction across the organisation.',
        bullets: [
          flag.verified('Real-time inspection of prompts and responses'),
          flag.verified('Detection of credentials, PII and source code'),
          flag.verified('Shadow AI discovery across the network'),
          flag.verified('Per-team and per-user usage visibility'),
        ],
      },
      {
        index: '02',
        title: 'Enforce',
        sentence: 'Policy applied in line, not after the fact.',
        bullets: [
          flag.verified('Redaction before anything reaches a provider'),
          flag.verified('Blocking on policy violation, fail-closed by default'),
          flag.verified('Per-team model and provider allow-lists'),
          flag.verified('Rate and spend limits by department'),
        ],
      },
      {
        index: '03',
        title: 'Audit',
        sentence: 'A record of every interaction, retained on your terms.',
        bullets: [
          flag.verified('Full prompt and response logging, retained by you'),
          flag.verified('Attribution to the individual user, not a shared key'),
          flag.verified('Framework mappings including the EU AI Act'),
          flag.verified('Incident replay for post-hoc investigation'),
        ],
      },
    ],
  },

  showcase: {
    id: 'showcase',
    heading: { roman: 'One gateway,', accent: 'every provider' },
    body: 'Teams keep the tools they already chose. AINerve terminates the call, applies your policy, then forwards it on — so switching provider, adding a model or cutting one off is a policy change rather than an engineering project. Latency is measured in single-digit milliseconds, because policy that slows people down is policy they route around.',
    image: '/media/img-socmint.jpg',
    points: [
      'Drop-in base URL change, no SDK rewrite',
      'Streaming responses inspected token by token',
      'Fail-closed by default, fail-open where you say so',
      'Per-department spend caps and rate limits',
    ],
  },

  integrations: {
    id: 'integrations',
    heading: { roman: 'Every provider', accent: 'your teams reach for' },
    countBadge: flag.verified('24'),
    countLabel: 'Providers',
    tabs: [
      { id: 'all', label: 'All' },
      { id: 'providers', label: 'Model Providers' },
      { id: 'gateways', label: 'Gateways' },
      { id: 'identity', label: 'Identity' },
      { id: 'siem', label: 'SIEM & Logging' },
    ],
    tiles: flag.verified(
      tiles([
        ['OpenAI', 'providers'],
        ['Anthropic', 'providers'],
        ['Google Vertex AI', 'providers'],
        ['Azure OpenAI', 'providers'],
        ['Amazon Bedrock', 'providers'],
        ['Mistral AI', 'providers'],
        ['Cohere', 'providers'],
        ['Meta Llama', 'providers'],
        ['IBM watsonx', 'providers'],
        ['Hugging Face', 'providers'],
        ['LiteLLM', 'gateways'],
        ['Kong AI Gateway', 'gateways'],
        ['Cloudflare AI Gateway', 'gateways'],
        ['Portkey', 'gateways'],
        ['OpenRouter', 'gateways'],
        ['Okta', 'identity'],
        ['Microsoft Entra ID', 'identity'],
        ['Ping Identity', 'identity'],
        ['Auth0', 'identity'],
        ['Google Workspace', 'identity'],
        ['Splunk', 'siem'],
        ['Microsoft Sentinel', 'siem'],
        ['Elastic Security', 'siem'],
        ['Datadog', 'siem'],
      ]),
    ),
    emptyState: 'No providers match this filter.',
  },

  cta: {
    heading: { roman: 'Find out what', accent: 'your teams are sending' },
    action: { label: 'Request a Demo', href: '/contact' },
  },
};

const socmint: ProductPage = {
  slug: 'socmint',
  name: 'SOCMINT',

  seo: {
    title: 'SOCMINT | Open-Source Exposure Monitoring by DataGateways',
    description:
      'Watch the open web, paste sites and messaging channels for your leaked credentials, exposed data and impersonated brand — correlated to the estate DataNerve already knows.',
  },

  anchors: productAnchors,

  hero: {
    id: 'hero',
    eyebrow: 'Our Platform — SOCMINT',
    heading: { roman: 'Find it before', accent: 'someone else does' },
    media: { image: '/media/img-audit.jpg', generative: 'signal' },
  },

  lead: {
    id: 'lead',
    text: 'Most breaches are visible outside the perimeter before they are visible inside it. SOCMINT watches the open sources where that happens — and, because it shares a control plane with DataNerve, it can tell you which of your own systems a leaked record came from.',
  },

  tiers: {
    id: 'tiers',
    heading: { roman: 'Collect, correlate', accent: 'and act' },
    cards: [
      {
        index: '01',
        title: 'Collect',
        sentence: 'Coverage of the places exposure actually surfaces.',
        bullets: [
          flag.verified('Paste sites, code hosts and public buckets'),
          flag.verified('Breach dumps and credential-stuffing lists'),
          flag.verified('Messaging channels and forums, by keyword'),
          flag.verified('Domain and brand impersonation monitoring'),
        ],
      },
      {
        index: '02',
        title: 'Correlate',
        sentence: 'A finding is only useful once you know whose it is.',
        bullets: [
          flag.verified('Matched against your own identity directory'),
          flag.verified('Traced to the system of origin through DataNerve lineage'),
          flag.verified('Scored by exploitability, not by keyword volume'),
          flag.verified('Duplicate and known-false findings suppressed'),
        ],
      },
      {
        index: '03',
        title: 'Act',
        sentence: 'Straight into the workflow your team already runs.',
        bullets: [
          flag.verified('Alerts into your SIEM, ticketing and chat'),
          flag.verified('Automatic credential revocation through DataNerve'),
          flag.verified('Takedown request packs, pre-assembled'),
          flag.verified('Retained evidence for the incident record'),
        ],
      },
    ],
  },

  showcase: {
    id: 'showcase',
    heading: { roman: 'Signal, not', accent: 'a keyword firehose' },
    body: 'An open-source monitoring tool that cannot tell a real exposure from a mention is a subscription to noise. SOCMINT starts from what your estate actually contains — the schemas, identities and key material DataNerve is already protecting — so a match is checked against something real before anyone is paged.',
    image: '/media/img-dlp.jpg',
    points: [
      'Findings scored against your own data inventory',
      'No agent, no traffic interception, no customer data leaves',
      'Analyst review queue with a full audit trail',
      'Retention and residency set by you, per source',
    ],
  },

  integrations: {
    id: 'integrations',
    heading: { roman: 'Wired into', accent: 'how you respond' },
    countBadge: flag.verified('18'),
    countLabel: 'Integrations',
    tabs: [
      { id: 'all', label: 'All' },
      { id: 'sources', label: 'Sources' },
      { id: 'identity', label: 'Identity' },
      { id: 'workflow', label: 'Workflow' },
      { id: 'siem', label: 'SIEM & Logging' },
    ],
    tiles: flag.verified(
      tiles([
        ['GitHub', 'sources'],
        ['GitLab', 'sources'],
        ['Pastebin', 'sources'],
        ['Have I Been Pwned', 'sources'],
        ['Telegram', 'sources'],
        ['Reddit', 'sources'],
        ['Certificate Transparency', 'sources'],
        ['WHOIS / RDAP', 'sources'],
        ['Okta', 'identity'],
        ['Microsoft Entra ID', 'identity'],
        ['Google Workspace', 'identity'],
        ['Jira', 'workflow'],
        ['ServiceNow', 'workflow'],
        ['PagerDuty', 'workflow'],
        ['Slack', 'workflow'],
        ['Splunk', 'siem'],
        ['Microsoft Sentinel', 'siem'],
        ['Elastic Security', 'siem'],
      ]),
    ),
    emptyState: 'No integrations match this filter.',
  },

  cta: {
    heading: { roman: 'See what is already', accent: 'out there' },
    action: { label: 'Request a Demo', href: '/contact' },
  },
};

export const products: Record<ProductSlug, ProductPage> = { datanerve, ainerve, socmint };
