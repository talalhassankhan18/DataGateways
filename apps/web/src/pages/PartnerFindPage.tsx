import { useMemo, useState } from 'react';
import { Container } from '@/components/primitives/Container';
import { RevealGroup, RevealItem } from '@/components/primitives/Reveal';
import { Section } from '@/components/primitives/Section';
import { CtaBand } from '@/components/content/CtaBand';
import { FilterTabs } from '@/components/content/FilterTabs';
import { MediaSplit } from '@/components/content/MediaSplit';
import { SectionHeading } from '@/components/content/SectionHeading';
import { PageShell } from '@/components/layout/PageShell';
import { ImageHero } from '@/components/media/ImageHero';
import { partners } from '@/content/partners';

const page = partners.find;

/** Region ids are derived from the listings, so adding a partner adds its region tab with it. */
const REGION_TABS = [
  { id: 'all', label: 'All regions' },
  ...[...new Set(page.directory.listings.map((listing) => listing.region))].map((region) => ({
    id: region,
    label: region,
  })),
];

export default function PartnerFindPage() {
  const [active, setActive] = useState('all');

  const listings = useMemo(
    () =>
      active === 'all'
        ? page.directory.listings
        : page.directory.listings.filter((listing) => listing.region === active),
    [active],
  );

  return (
    <PageShell seo={page.seo} path="/partners/find" anchors={page.anchors}>
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

      <Section id={page.directory.id} tone="white" labelledBy="partner-directory-heading">
        <Container>
          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading id="partner-directory-heading" heading={page.directory.heading} />
            <FilterTabs
              tabs={REGION_TABS}
              active={active}
              onChange={setActive}
              label={page.directory.filterLabel}
            />
          </div>

          {listings.length === 0 ? (
            <p className="rounded-sm border border-dashed border-hairline/15 px-6 py-10 text-center text-body-sm text-ink-secondary">
              {page.directory.emptyState}
            </p>
          ) : (
            <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" amount={0.1}>
              {listings.map((listing) => (
                <RevealItem
                  as="li"
                  key={listing.name}
                  className="flex flex-col gap-4 rounded-sm border border-hairline/10 bg-bg-surface/50 p-6 transition-[border-color,box-shadow] duration-hover hover:border-accent/40 hover:shadow-card-hover"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-sm border border-accent/30 px-2.5 py-1 text-eyebrow uppercase tracking-[0.14em] text-accent-ink">
                      {listing.tier}
                    </span>
                    <span className="text-eyebrow uppercase tracking-[0.14em] text-ink-dim">
                      {listing.region}
                    </span>
                  </div>

                  <h3 className="text-h3 font-bold uppercase text-ink-primary">{listing.name}</h3>
                  <p className="text-body-sm text-ink-secondary">{listing.focus}</p>

                  <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                    {listing.specialisms.map((specialism) => (
                      <li
                        key={specialism}
                        className="rounded-sm bg-bg-elevated px-2.5 py-1 text-eyebrow uppercase tracking-[0.12em] text-ink-secondary"
                      >
                        {specialism}
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </Container>
      </Section>

      <Section id={page.showcase.id} tone="light" labelledBy="partner-showcase-heading">
        <Container>
          <MediaSplit
            id="partner-showcase-heading"
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
