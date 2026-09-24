import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { IndexedCard } from '@datagateways/shared';
import { heroStripVariants } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { site } from '@/content/site';

export interface HeroCardProps {
  card: IndexedCard;
  /** Position in the strip, which sets this cell's slice of the load-in stagger. */
  index?: number;
}

/**
 * One cell of the strip across the hero floor, matching the reference's own behaviour: collapsed
 * to a peek showing the index and the title, opening on hover or focus to reveal the tag, the
 * blurb and the link cue, while the headline above it steps back.
 *
 * Everything about that opening is CSS (see `.hero-card` in styles/index.css) rather than state.
 * A React `onMouseEnter` would not fire for a keyboard user, and `:focus-within` gets that for
 * free — which is the whole reason the detail is revealed by a parent selector and not a prop.
 *
 * The title carries the only anchor, stretched over the cell with an ::after overlay. The arrow is
 * decorative: five cells each holding a second link reading "Explore" is the kind of thing that
 * passes an automated audit and fails a real one. It also means nothing inside the folded-away
 * detail is focusable, so the collapsed state hides no tab stop.
 */
export function HeroCard({ card, index = 0 }: HeroCardProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.li
      custom={index}
      variants={heroStripVariants(reduced)}
      initial="hidden"
      animate="visible"
      className={cn(
        // Content is anchored to the TOP, not the bottom: while the cell is closed only the index
        // and the title are above the fold of the peek, and the detail beneath them has been
        // folded to zero height rather than pushed out of sight.
        'hero-card group/card relative flex flex-col gap-3.5',
        'border-t border-hairline/25 px-5 pb-7 pt-6 lg:px-[clamp(1.125rem,2vw,2.125rem)]',
        // Below lg the cells are a stacked band, so they need their own divider treatment; the
        // grid rules above only apply once they become five columns.
        'last:border-b lg:last:border-b-0',
      )}
    >
      <span className="hero-card__index block font-mono text-index font-semibold tracking-[0.1em] text-ink-primary">
        {card.index}
      </span>

      {/* Sized so the longest title in the deck still fits one line inside a fifth of the
          container. Keep it that way: the closed cells are held level by `min-height`, and a title
          that wraps to two lines pushes its own cell past that floor and leaves the strip ragged
          along the top. */}
      <h3 className="hero-card__title text-[clamp(1.375rem,2vw,2.25rem)] font-bold uppercase leading-[1.05] tracking-[-0.015em] text-ink-primary [text-shadow:0_2px_14px_rgb(4_30_66_/_0.45)]">
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

      {/* Two elements, not one: the outer is the row that animates open and the inner is what gets
          clipped while it does. A single element cannot do both — see the note in index.css. */}
      <div className="hero-card__detail">
        <div className="hero-card__detail-inner">
          {card.tag ? (
            <span className="mb-2.5 block text-eyebrow font-semibold uppercase tracking-[0.16em] text-accent-teal">
              {card.tag}
            </span>
          ) : null}

          <p className="mb-4 text-body-sm text-ink-secondary">{card.blurb}</p>

          {card.href ? (
            <span className="inline-flex items-center gap-2 text-eyebrow font-semibold uppercase tracking-[0.12em] text-ink-primary">
              {site.ui.explore}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover/card:translate-x-1"
              />
            </span>
          ) : null}
        </div>
      </div>
    </motion.li>
  );
}
