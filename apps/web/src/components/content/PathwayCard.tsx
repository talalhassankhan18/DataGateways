import { Link } from 'react-router-dom';
import type { IndexedCard } from '@datagateways/shared';
import { ArrowLink } from '@/components/primitives/ArrowLink';
import { IndexNumber } from '@/components/primitives/IndexNumber';
import { motion, useReducedMotion } from 'framer-motion';
import { PlaceholderBadge } from '@/components/primitives/PlaceholderBadge';
import { heroStripVariants } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { site } from '@/content/site';

export interface PathwayCardProps {
  card: IndexedCard;
  /** Position in the strip, which sets this cell's slice of the load-in stagger. */
  index?: number;
  className?: string;
}

/**
 * One cell of the numbered strip that runs directly beneath the hero, as the reference lays it out:
 * a flush row of cells divided by hairlines rather than a gapped grid of filled cards. The index
 * sits above a large uppercase title, and the blurb carries the detail the reference leaves out —
 * these cells name real products, so they have to say more than a single word.
 *
 * When the cell links somewhere the title holds the only anchor, stretched across the whole cell
 * with an ::after overlay. The arrow is then decorative — five cells each containing a second link
 * reading "Explore" is the kind of thing that passes an automated audit and fails a real one.
 */
export function PathwayCard({ card, index = 0, className }: PathwayCardProps) {
  const reduced = useReducedMotion() ?? false;

  const body = (
    <>
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <IndexNumber value={card.index} />
          {card.tag ? (
            <span className="text-eyebrow uppercase tracking-[0.18em] text-ink-dim">{card.tag}</span>
          ) : null}
        </div>

        <h3 className="mt-6 text-h3 font-bold uppercase text-ink-primary">
          {card.href ? (
            <Link
              to={card.href}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {card.title}
            </Link>
          ) : (
            card.title
          )}
        </h3>

        <p className="mt-3 text-body-sm text-ink-secondary">{card.blurb}</p>
      </div>

      {card.href ? <ArrowLink asText label={site.ui.explore} className="mt-6" /> : null}
    </>
  );

  return (
    <motion.li
      custom={index}
      variants={heroStripVariants(reduced)}
      initial="hidden"
      animate="visible"
      className={cn(
        // Hairlines between cells, not around them: a top rule on every cell and a left rule from
        // the second column on, so the strip reads as one divided band at every breakpoint.
        'group/card relative flex h-full flex-col justify-between border-t border-hairline/15 p-6 transition-colors duration-hover lg:px-8 lg:py-10',
        'sm:[&:nth-child(n+3)]:border-t lg:[&:nth-child(n+4)]:border-t xl:[&:nth-child(n+2)]:border-t-0',
        'sm:[&:nth-child(2n+2)]:border-l lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:not(:nth-child(3n+1))]:border-l xl:[&:not(:first-child)]:border-l',
        'border-l-hairline/15',
        card.href && 'hover:bg-bg-elevated/60 focus-within:bg-bg-elevated/60',
        className,
      )}
    >
      {card.unverified ? (
        <PlaceholderBadge as="div" item={card.unverified} className="h-full">
          {body}
        </PlaceholderBadge>
      ) : (
        body
      )}
    </motion.li>
  );
}
