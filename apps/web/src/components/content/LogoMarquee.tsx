import { cn } from '@/lib/cn';

export interface LogoMarqueeProps {
  tiles: readonly string[];
  /** Names the list for assistive tech, since the visual duplication carries no meaning. */
  label: string;
}

const Tile = ({ name }: { name: string }) => (
  <span className="flex shrink-0 items-center whitespace-nowrap rounded-sm border border-hairline/10 px-8 py-5 text-body-sm uppercase tracking-[0.18em] text-ink-muted transition-colors duration-hover hover:border-accent/30 hover:text-ink-primary">
    {name}
  </span>
);

/**
 * Continuous horizontal loop, ~40s a cycle, paused on hover.
 *
 * The track is duplicated so the translate can wrap at -50% without a visible seam; the second copy
 * is hidden from assistive tech so the list is not read out twice. Under reduced motion the
 * animation is dropped by the global media query and the row simply sits still.
 */
export function LogoMarquee({ tiles, label }: LogoMarqueeProps) {
  return (
    <div className="mask-edges group/marquee overflow-hidden">
      <div
        className={cn(
          'flex w-max animate-marquee gap-4',
          'group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none',
        )}
      >
        <ul aria-label={label} className="flex shrink-0 gap-4">
          {tiles.map((name) => (
            <li key={name}>
              <Tile name={name} />
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="flex shrink-0 gap-4">
          {tiles.map((name) => (
            <Tile key={`${name}-duplicate`} name={name} />
          ))}
        </div>
      </div>
    </div>
  );
}
