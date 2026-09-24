import { Container } from '@/components/primitives/Container';
import { PlaceholderBadge } from '@/components/primitives/PlaceholderBadge';
import { Reveal, RevealGroup } from '@/components/primitives/Reveal';
import { Section } from '@/components/primitives/Section';
import { CounterRow } from '@/components/content/CounterRow';
import { DifferentiatorCard } from '@/components/content/DifferentiatorCard';
import { MediaSplit } from '@/components/content/MediaSplit';
import { SectionHeading } from '@/components/content/SectionHeading';
import { PageShell } from '@/components/layout/PageShell';
import { VideoHero } from '@/components/media/VideoHero';
import { about } from '@/content/about';

export default function AboutPage() {
  return (
    <PageShell seo={about.seo} path="/about" anchors={about.anchors}>
      <VideoHero
        id={about.hero.id}
        eyebrow={about.hero.eyebrow}
        heading={about.hero.heading}
        subhead={about.hero.subhead}
        media={about.hero.media}
        scrollCueTarget={about.story.id}
      />

      <Section id={about.story.id} tone="light" labelledBy="about-story-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <SectionHeading
              id="about-story-heading"
              heading={about.story.heading}
              className="lg:col-span-5"
            />

            <Reveal className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
              {about.story.paragraphs.map((paragraph) => (
                <PlaceholderBadge key={paragraph.value.slice(0, 32)} item={paragraph} as="div">
                  <p className="max-w-measure text-body text-ink-secondary">{paragraph.value}</p>
                </PlaceholderBadge>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section id={about.showcase.id} tone="grey" labelledBy="about-showcase-heading">
        <Container>
          <MediaSplit
            id="about-showcase-heading"
            heading={about.showcase.heading}
            body={about.showcase.body}
            image={about.showcase.image}
            points={about.showcase.points}
            reverse
          />
        </Container>
      </Section>

      <Section id={about.differentiators.id} tone="white" labelledBy="about-differentiators-heading">
        <Container>
          <SectionHeading
            id="about-differentiators-heading"
            heading={about.differentiators.heading}
            className="mb-16"
          />

          <RevealGroup as="ul" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {about.differentiators.cards.map((card) => (
              <DifferentiatorCard key={card.title} card={card} />
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section id={about.counters.id} tone="band" labelledBy="about-counters-heading">
        <Container>
          <SectionHeading
            id="about-counters-heading"
            heading={about.counters.heading}
            className="mb-16"
          />
          <CounterRow items={about.counters.items} />
        </Container>
      </Section>
    </PageShell>
  );
}
