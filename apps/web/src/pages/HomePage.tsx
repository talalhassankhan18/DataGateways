import { ArrowLink } from '@/components/primitives/ArrowLink';
import { Container } from '@/components/primitives/Container';
import { RevealGroup } from '@/components/primitives/Reveal';
import { Section } from '@/components/primitives/Section';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import { ArticleCard } from '@/components/content/ArticleCard';
import { CounterRow } from '@/components/content/CounterRow';
import { LogoMarquee } from '@/components/content/LogoMarquee';
import { PositioningStatement } from '@/components/content/PositioningStatement';
import { SectionHeading } from '@/components/content/SectionHeading';
import { TrustBand } from '@/components/content/TrustBand';
import { PageShell } from '@/components/layout/PageShell';
import { HomeHero } from '@/components/media/HomeHero';
import { features, site } from '@/content/site';
import { home } from '@/content/home';

export default function HomePage() {
  return (
    <PageShell seo={home.seo} path="/" anchors={home.anchors}>
      {/* The strip is part of the hero, not a band beneath it — its cells arrive on load with the
          headline and, from lg up, sit on the hero floor as the reference lays them out. The
          anchor id moves onto the hero so the rail still has something to jump to. */}
      <HomeHero
        id={home.hero.id}
        heading={home.hero.heading}
        media={home.hero.media}
        cards={home.pathways.cards}
        scrollCueTarget={home.positioning.id}
      />

      <Section id={home.positioning.id} tone="light">
        <Container>
          <PositioningStatement statement={home.positioning.statement} />
        </Container>
      </Section>

      {features.counters ? (
        <Section id={home.counters.id} tone="band" labelledBy="home-counters-heading">
          <Container>
            <SectionHeading
              id="home-counters-heading"
              heading={home.counters.heading}
              className="mb-16"
            />
            <CounterRow items={home.counters.items} />
          </Container>
        </Section>
      ) : (
        <Section id={home.trustBand.id} tone="band" labelledBy="home-trust-heading">
          <Container>
            <SectionHeading
              id="home-trust-heading"
              heading={home.trustBand.heading}
              className="mb-12"
            />
            <TrustBand marks={home.trustBand.marks} />
          </Container>
        </Section>
      )}

      <Section id={home.marquee.id} tone="grey" labelledBy="home-marquee-heading">
        <Container>
          <SectionHeading
            id="home-marquee-heading"
            heading={home.marquee.heading}
            className="mb-12"
          />
        </Container>
        <LogoMarquee tiles={home.marquee.tiles} label={home.marquee.heading.roman} />
      </Section>

      {features.latest ? (
        <Section id={home.latest.id} tone="white" labelledBy="home-latest-heading">
          <Container>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <SplitHeading
                id="home-latest-heading"
                as="h2"
                roman={home.latest.heading.roman}
                accent={home.latest.heading.accent}
              />
              <ArrowLink label={site.ui.viewAll} to={home.latest.viewAllHref} />
            </div>

            <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {home.latest.articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}
    </PageShell>
  );
}
