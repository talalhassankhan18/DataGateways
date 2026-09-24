import { Container } from '@/components/primitives/Container';
import { PlaceholderBadge } from '@/components/primitives/PlaceholderBadge';
import { Reveal } from '@/components/primitives/Reveal';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/content/SectionHeading';
import { ContactWizard } from '@/components/contact/ContactWizard';
import { PageShell } from '@/components/layout/PageShell';
import { ImageHero } from '@/components/media/ImageHero';
import { contact } from '@/content/contact';
import { site } from '@/content/site';

export default function ContactPage() {
  return (
    <PageShell seo={contact.seo} path="/contact" anchors={contact.anchors}>
      <ImageHero
        id={contact.hero.id}
        eyebrow={contact.hero.eyebrow}
        heading={contact.hero.heading}
        media={contact.hero.media}
        compact
        scrollCueTarget={contact.wizard.id}
      />

      <Section id={contact.wizard.id} tone="light">
        <Container>
          <ContactWizard />
        </Container>
      </Section>

      <Section id={contact.location.id} tone="grey" labelledBy="contact-location-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <SectionHeading
              id="contact-location-heading"
              heading={contact.location.heading}
              className="lg:col-span-5"
            />

            <Reveal className="lg:col-span-6 lg:col-start-7">
              <address className="not-italic text-body text-ink-secondary">
                <span className="block text-ink-primary">{site.contact.organisation}</span>
                {site.contact.addressLines.map((line) => (
                  <PlaceholderBadge key={line.value} item={line} as="div" className="mt-1">
                    {line.value}
                  </PlaceholderBadge>
                ))}
              </address>

              <p className="mt-8 max-w-measure text-body-sm text-ink-secondary">
                {contact.location.body}
              </p>

              <div className="mt-8 flex flex-col items-start gap-3 text-body-sm">
                <PlaceholderBadge item={site.contact.phone}>
                  <a
                    href={`tel:${site.contact.phone.value.replace(/\s/g, '')}`}
                    className="text-ink-secondary transition-colors duration-hover hover:text-ink-primary"
                  >
                    {site.contact.phone.value}
                  </a>
                </PlaceholderBadge>
                <PlaceholderBadge item={site.contact.email}>
                  <a
                    href={`mailto:${site.contact.email.value}`}
                    className="text-accent-ink transition-colors duration-hover hover:text-ink-primary"
                  >
                    {site.contact.email.value}
                  </a>
                </PlaceholderBadge>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
