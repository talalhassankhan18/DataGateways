import { motion, useReducedMotion } from 'framer-motion';
import { AVAILABLE_MEDIA } from '@/generated/media';
import type { BackdropVariant } from '@/lib/backdrop';
import { GenerativeBackdrop } from './GenerativeBackdrop';
import { HeroShell, type HeroShellProps } from './HeroShell';

export interface ImageHeroProps extends Omit<HeroShellProps, 'media'> {
  media: {
    readonly image: string;
    readonly generative: BackdropVariant;
  };
}

/**
 * Static hero for the inner pages. The image is decorative — the headline carries the meaning — so
 * it takes an empty alt and is marked high priority as the LCP candidate.
 *
 * The plate and the canvas draw the same composition, so they are layered rather than swapped: the
 * plate paints immediately and becomes the LCP element, then the canvas animates on top of it. The
 * canvas skips its own wash because the plate already carries one, and it is left off entirely
 * under reduced motion, where the still plate alone is exactly the right answer.
 */
export function ImageHero({ media, ...shell }: ImageHeroProps) {
  const reduced = useReducedMotion() ?? false;
  const plate = AVAILABLE_MEDIA.includes(media.image);

  return (
    <HeroShell
      {...shell}
      media={
        <>
          {plate ? (
            <motion.img
              src={media.image}
              alt=""
              // React 18 does not map the camelCase name onto the DOM attribute and warns
              // instead, so the hint is spelled the way HTML spells it.
              {...{ fetchpriority: 'high' }}
              decoding="async"
              // Reference: the hero plate settles from 1.12 rather than sitting still, which is
              // what keeps a static image from reading as a screenshot.
              initial={reduced ? false : { scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}

          {plate && reduced ? null : (
            <GenerativeBackdrop variant={media.generative} wash={!plate} />
          )}
        </>
      }
    />
  );
}
