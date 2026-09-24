import { useParams } from 'react-router-dom';
import { Container } from '@/components/primitives/Container';
import { RevealGroup } from '@/components/primitives/Reveal';
import { Section } from '@/components/primitives/Section';
import { CtaBand } from '@/components/content/CtaBand';
import { IntegrationGrid } from '@/components/content/IntegrationGrid';
import { MediaSplit } from '@/components/content/MediaSplit';
import { SectionHeading } from '@/components/content/SectionHeading';
import { TierCard } from '@/components/content/TierCard';
import { PageShell } from '@/components/layout/PageShell';
import { ImageHero } from '@/components/media/ImageHero';
import { isProductSlug, products } from '@/content/products';
import NotFoundPage from './NotFoundPage';

export default function ProductPage() {
  const { slug } = useParams();

  if (!isProductSlug(slug)) return <NotFoundPage />;

  const product = products[slug];

  return (
    <PageShell seo={product.seo} path={`/platform/${product.slug}`} anchors={product.anchors}>
      <ImageHero
        id={product.hero.id}
        eyebrow={product.hero.eyebrow}
        heading={product.hero.heading}
        media={product.hero.media}
        compact
        scrollCueTarget={product.lead.id}
      />

      <Section id={product.lead.id} tone="light">
        <Container>
          <p className="max-w-measure text-lead text-ink-secondary">{product.lead.text}</p>
        </Container>
      </Section>

      <Section id={product.tiers.id} tone="white" labelledBy="product-tiers-heading">
        <Container>
          <SectionHeading
            id="product-tiers-heading"
            heading={product.tiers.heading}
            className="mb-16"
          />

          <RevealGroup as="ul" className="grid gap-4 lg:grid-cols-3" amount={0.1}>
            {product.tiers.cards.map((card) => (
              <TierCard key={card.title} card={card} />
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section id={product.showcase.id} tone="light" labelledBy="product-showcase-heading">
        <Container>
          <MediaSplit
            id="product-showcase-heading"
            heading={product.showcase.heading}
            body={product.showcase.body}
            image={product.showcase.image}
            points={product.showcase.points}
            reverse
          />
        </Container>
      </Section>

      <Section id={product.integrations.id} tone="grey" labelledBy="product-integrations-heading">
        <Container>
          <SectionHeading
            id="product-integrations-heading"
            heading={product.integrations.heading}
            className="mb-16"
          />
          <IntegrationGrid
            section={product.integrations}
            filterLabel={`Filter ${product.name} integrations`}
          />
        </Container>
      </Section>

      <CtaBand content={product.cta} />
    </PageShell>
  );
}
