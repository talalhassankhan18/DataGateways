import { Container } from '@/components/primitives/Container';
import { Reveal, RevealGroup } from '@/components/primitives/Reveal';
import { Section } from '@/components/primitives/Section';
import { MediaSplit } from '@/components/content/MediaSplit';
import { PathwayCard } from '@/components/content/PathwayCard';
import { SectionHeading } from '@/components/content/SectionHeading';
import { PageShell } from '@/components/layout/PageShell';
import { ImageHero } from '@/components/media/ImageHero';
import { platform } from '@/content/platform';

export default function PlatformPage() {
  return (
    <PageShell seo={platform.seo} path="/platform" anchors={platform.anchors}>
      <ImageHero
        id={platform.hero.id}
        eyebrow={platform.hero.eyebrow}
        heading={platform.hero.heading}
        media={platform.hero.media}
        compact
        scrollCueTarget={platform.overview.id}
      />

      <Section id={platform.overview.id} tone="light" labelledBy="platform-overview-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <SectionHeading
              id="platform-overview-heading"
              heading={platform.overview.heading}
              className="lg:col-span-5"
            />

            <Reveal className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
              {platform.overview.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-measure text-body text-ink-secondary">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section id={platform.products.id} tone="white" labelledBy="platform-products-heading">
        <Container>
          <SectionHeading
            id="platform-products-heading"
            heading={platform.products.heading}
            className="mb-16"
          />

          <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" amount={0.1}>
            {platform.products.cards.map((card) => (
              <PathwayCard key={card.title} card={card} />
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section id={platform.deployment.id} tone="light" labelledBy="platform-deployment-heading">
        <Container>
          <MediaSplit
            id="platform-deployment-heading"
            heading={platform.deployment.heading}
            body={platform.deployment.body}
            image={platform.deployment.image}
            points={platform.deployment.points}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
