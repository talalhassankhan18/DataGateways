import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/primitives/Container';
import { IndexNumber } from '@/components/primitives/IndexNumber';
import { PlaceholderBadge } from '@/components/primitives/PlaceholderBadge';
import { useEscapeKey, useFocusTrap, useLockBodyScroll } from '@/lib/hooks';
import { overlayItemVariants, overlayVariants } from '@/lib/motion';
import { site } from '@/content/site';

export interface FullscreenMenuProps {
  open: boolean;
  onClose: () => void;
  id: string;
}

export function FullscreenMenu({ open, onClose, id }: FullscreenMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  useLockBodyScroll(open);
  useEscapeKey(open, onClose);
  useFocusTrap(panelRef, open);

  if (!open) return null;

  return (
    <motion.div
      ref={panelRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label={site.ui.menuLandmark}
      className="tone-navy fixed inset-0 z-overlay overflow-hidden"
      variants={overlayVariants(reduced)}
      initial="hidden"
      animate="visible"
    >
      <Container className="flex h-full flex-col justify-between py-8">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label={site.ui.menuClose}
            className="flex h-12 w-12 items-center justify-center rounded-md border border-hairline/15 text-ink-primary transition-colors duration-hover hover:border-accent/50 hover:bg-bg-elevated"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label={site.ui.menuLandmark} className="flex-1 overflow-y-auto py-8">
          <ul className="flex flex-col gap-2">
            {site.nav.menu.map((item, index) => (
              <motion.li
                key={item.href}
                custom={index}
                variants={overlayItemVariants(reduced)}
                initial="hidden"
                animate="visible"
              >
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="group/menu flex items-baseline gap-5 py-2 text-h2 font-medium text-ink-primary transition-colors duration-hover hover:text-accent-ink"
                >
                  <IndexNumber value={item.index} className="w-8 shrink-0" />
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-6 border-t border-hairline/10 pt-8 text-body-sm sm:grid-cols-2">
          <address className="not-italic text-ink-secondary">
            <span className="block text-ink-primary">{site.contact.organisation}</span>
            {site.contact.addressLines.map((line) => (
              <PlaceholderBadge key={line.value} item={line} className="mt-1">
                {line.value}
              </PlaceholderBadge>
            ))}
          </address>

          <div className="flex flex-col items-start gap-2 sm:items-end">
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
      </Container>
    </motion.div>
  );
}
