import type { ComponentType } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/primitives/Container';
import { PlaceholderBadge } from '@/components/primitives/PlaceholderBadge';
import { site, type SocialLink } from '@/content/site';

const ICONS: Record<SocialLink['icon'], ComponentType<{ className?: string }> | null> = {
  linkedin: Linkedin,
  github: Github,
  /* Rendered as a letterform rather than the platform's mark, which is a trademark we have no
     licence to reproduce. */
  x: null,
};

const LinkList = ({ heading, items }: { heading: string; items: readonly { label: string; href: string }[] }) => (
  <div>
    {/* h3, not h2: these label link groups inside the footer, so they sit below the page's own
        section headings in the outline rather than beside them. h1 and h2 are reserved for
        SplitHeading — see docs/design-reference.md. */}
    <h3 className="text-eyebrow uppercase text-ink-dim">{heading}</h3>
    <ul className="mt-4 flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            to={item.href}
            className="text-body-sm text-ink-secondary transition-colors duration-hover hover:text-ink-primary"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export function Footer() {
  return (
    <footer className="tone-navy border-t border-hairline/10">
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-5">
          <Link to="/" aria-label={site.ui.homeLink} className="flex items-center gap-3">
            <img src={site.logo.src} alt={site.logo.alt} className="h-9 w-9" width={36} height={36} />
            <span className="text-body-sm font-semibold tracking-[0.2em] text-ink-primary">
              {site.wordmark}
            </span>
          </Link>

          <p className="mt-6 max-w-measure-sm text-body-sm text-ink-secondary">
            {site.footer.locationLine}
          </p>

          <div className="mt-8 flex flex-col gap-2 text-body-sm">
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
        </div>

        <nav aria-label={site.ui.footerNavLandmark} className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-7">
          <LinkList heading={site.footer.groupLabels.secondary} items={site.footer.secondary} />
          <LinkList heading={site.footer.groupLabels.legal} items={site.footer.legal} />
        </nav>

        <div className="lg:col-span-12">
          <div className="rule-fade mb-8" />
          <div className="flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="text-body-sm text-ink-muted">{site.footer.copyright}</p>

            <ul className="flex items-center gap-3">
              {site.footer.social.map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <li key={item.icon}>
                    <PlaceholderBadge item={item.href}>
                      <a
                        href={item.href.value}
                        aria-label={item.label}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-hairline/15 text-ink-secondary transition-colors duration-hover hover:border-accent/50 hover:text-ink-primary"
                      >
                        {Icon ? (
                          <Icon className="h-4 w-4" />
                        ) : (
                          <span aria-hidden="true" className="text-body-sm font-semibold">
                            {item.label}
                          </span>
                        )}
                      </a>
                    </PlaceholderBadge>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
