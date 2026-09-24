import { useParams } from 'react-router-dom';
import { Container } from '@/components/primitives/Container';
import { RevealGroup } from '@/components/primitives/Reveal';
import { Section } from '@/components/primitives/Section';
import { CtaBand } from '@/components/content/CtaBand';
import { MediaSplit } from '@/components/content/MediaSplit';
import { PathwayCard } from '@/components/content/PathwayCard';
import { SectionHeading } from '@/components/content/SectionHeading';
import { PageShell } from '@/components/layout/PageShell';
import { ImageHero } from '@/components/media/ImageHero';
import { capabilities, isCapabilitySlug } from '@/content/capabilities';
import NotFoundPage from './NotFoundPage';

/** Governance, DSPM and DLP — the three capabilities nested under DataNerve in the nav. */
export default function CapabilityPage() {
  const { capability } = useParams();

  if (!isCapabilitySlug(capability)) return <NotFoundPage />;

  const page = capabilities[capability];

  return (
    <PageShell
      seo={page.seo}
      path={`/platform/datanerve/${page.slug}`}
      anchors={page.anchors}
    >
      <ImageHero
        id={page.hero.id}
        eyebrow={page.hero.eyebrow}
        heading={page.hero.heading}
        media={page.hero.media}
        compact
        scrollCueTarget={page.lead.id}
      />

      <Section id={page.lead.id} tone="light">
        <Container>
          <p className="max-w-measure text-lead text-ink-secondary">{page.lead.text}</p>
        </Container>
      </Section>

      <Section id={page.capabilities.id} tone="white" labelledBy="capability-cards-heading">
        <Container>
          <SectionHeading
            id="capability-cards-heading"
            heading={page.capabilities.heading}
            className="mb-16"
          />

          <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" amount={0.1}>
            {page.capabilities.cards.map((card) => (
              <PathwayCard key={card.title} card={card} />
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section id={page.showcase.id} tone="light" labelledBy="capability-showcase-heading">
        <Container>
          <MediaSplit
            id="capability-showcase-heading"
            heading={page.showcase.heading}
            body={page.showcase.body}
            image={page.showcase.image}
            points={page.showcase.points}
            reverse
          />
        </Container>
      </Section>

      <CtaBand content={page.cta} />
    </PageShell>
  );
}
