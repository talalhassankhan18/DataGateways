import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export interface ArrowLinkProps {
  label: string;
  to?: string;
  href?: string;
  className?: string;
  /**
   * When the link sits inside a card whose title already names the destination, pass the title so
   * the accessible name is "Explore, DataNerve" rather than four identical "Explore" links.
   */
  context?: string;
  /** Set when an ancestor already carries the click target, e.g. a card-wide stretched link. */
  asText?: boolean;
}

const CLASSES =
  'group/arrow inline-flex items-center gap-2 text-body-sm font-medium text-accent-ink transition-colors duration-hover hover:text-ink-primary';

const Inner = ({ label }: { label: string }) => (
  <>
    {label}
    <ArrowRight
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-hover group-hover/arrow:translate-x-1 group-hover/card:translate-x-1"
    />
  </>
);

export function ArrowLink({ label, to, href, className, context, asText }: ArrowLinkProps) {
  const accessibleName = context ? `${label}, ${context}` : undefined;

  if (asText) {
    return (
      <span aria-hidden="true" className={cn(CLASSES, className)}>
        <Inner label={label} />
      </span>
    );
  }

  if (to) {
    return (
      <Link to={to} className={cn(CLASSES, className)} aria-label={accessibleName}>
        <Inner label={label} />
      </Link>
    );
  }

  return (
    <a href={href} className={cn(CLASSES, className)} aria-label={accessibleName}>
      <Inner label={label} />
    </a>
  );
}
