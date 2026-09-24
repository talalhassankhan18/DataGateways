import { useParams } from 'react-router-dom';
import { Container } from '@/components/primitives/Container';
import { Reveal, RevealGroup, RevealItem } from '@/components/primitives/Reveal';
import { Section } from '@/components/primitives/Section';
import { IndexNumber } from '@/components/primitives/IndexNumber';
import { CtaBand } from '@/components/content/CtaBand';
import { MediaSplit } from '@/components/content/MediaSplit';
import { PathwayCard } from '@/components/content/PathwayCard';
import { SectionHeading } from '@/components/content/SectionHeading';
import { PageShell } from '@/components/layout/PageShell';
import { ImageHero } from '@/components/media/ImageHero';
import { isServiceSlug, services } from '@/content/services';
import NotFoundPage from './NotFoundPage';

export default function ServicePage() {
  const { service } = useParams();

  if (!isServiceSlug(service)) return <NotFoundPage />;

  const page = services[service];

  return (
    <PageShell seo={page.seo} path={`/services/${page.slug}`} anchors={page.anchors}>
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

      <Section id={page.offerings.id} tone="white" labelledBy="service-offerings-heading">
        <Container>
          <SectionHeading
            id="service-offerings-heading"
            heading={page.offerings.heading}
            className="mb-16"
          />

          <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" amount={0.1}>
            {page.offerings.cards.map((card) => (
              <PathwayCard key={card.title} card={card} />
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section id={page.engagement.id} tone="navy" labelledBy="service-engagement-heading">
        <Container>
          <div className="mb-16 grid gap-8 lg:grid-cols-12">
            <SectionHeading
              id="service-engagement-heading"
              heading={page.engagement.heading}
              className="lg:col-span-5"
            />
            <Reveal className="lg:col-span-6 lg:col-start-7">
              <p className="max-w-measure text-body text-ink-secondary">{page.engagement.intro}</p>
            </Reveal>
          </div>

          {/* A timeline rather than a card grid: the phases are sequential, and four equal boxes
              would not say so. The rule runs along the top of the row on wide screens and down the
              left of the stack on narrow ones. */}
          <RevealGroup as="ol" className="grid gap-px bg-hairline/15 lg:grid-cols-4" amount={0.1}>
            {page.engagement.phases.map((phase) => (
              <RevealItem
                as="li"
                key={phase.index}
                className="flex flex-col gap-4 bg-bg-navy p-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <IndexNumber value={phase.index} />
                  <span className="text-eyebrow uppercase tracking-[0.18em] text-ink-dim">
                    {phase.duration}
                  </span>
                </div>

                <h3 className="text-h3 font-bold uppercase text-ink-primary">{phase.title}</h3>
                <p className="text-body-sm text-ink-secondary">{phase.blurb}</p>

                <p className="mt-auto border-t border-hairline/15 pt-4 text-body-sm text-accent-ink">
                  {phase.deliverable}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section id={page.showcase.id} tone="light" labelledBy="service-showcase-heading">
        <Container>
          <MediaSplit
            id="service-showcase-heading"
            heading={page.showcase.heading}
            body={page.showcase.body}
            image={page.showcase.image}
            points={page.showcase.points}
          />
        </Container>
      </Section>

      <CtaBand content={page.cta} />
    </PageShell>
  );
}
