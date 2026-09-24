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
import { partners } from '@/content/partners';

const page = partners.become;

export default function PartnerBecomePage() {
  return (
    <PageShell seo={page.seo} path="/partners/become" anchors={page.anchors}>
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

      <Section id={page.tiers.id} tone="white" labelledBy="partner-tiers-heading">
        <Container>
          <SectionHeading
            id="partner-tiers-heading"
            heading={page.tiers.heading}
            className="mb-16"
          />

          <RevealGroup as="ul" className="grid gap-4 lg:grid-cols-3" amount={0.1}>
            {page.tiers.cards.map((card) => (
              <PathwayCard key={card.title} card={card} />
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section id={page.process.id} tone="navy" labelledBy="partner-process-heading">
        <Container>
          <div className="mb-16 grid gap-8 lg:grid-cols-12">
            <SectionHeading
              id="partner-process-heading"
              heading={page.process.heading}
              className="lg:col-span-5"
            />
            <Reveal className="lg:col-span-6 lg:col-start-7">
              <p className="max-w-measure text-body text-ink-secondary">{page.process.intro}</p>
            </Reveal>
          </div>

          <RevealGroup as="ol" className="grid gap-px bg-hairline/15 lg:grid-cols-4" amount={0.1}>
            {page.process.steps.map((step) => (
              <RevealItem as="li" key={step.index} className="flex flex-col gap-4 bg-bg-navy p-8">
                <IndexNumber value={step.index} />
                <h3 className="text-h3 font-bold uppercase text-ink-primary">{step.title}</h3>
                <p className="text-body-sm text-ink-secondary">{step.blurb}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section id={page.showcase.id} tone="light" labelledBy="partner-become-showcase-heading">
        <Container>
          <MediaSplit
            id="partner-become-showcase-heading"
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
