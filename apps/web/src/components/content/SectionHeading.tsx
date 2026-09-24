import type { Heading } from '@datagateways/shared';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import { Reveal } from '@/components/primitives/Reveal';
import { cn } from '@/lib/cn';

export interface SectionHeadingProps {
  heading: Heading;
  id?: string;
  eyebrow?: string;
  lead?: string;
  className?: string;
  align?: 'start' | 'center';
}

/** Eyebrow plus h2 plus optional lead — the opening of nearly every section on the site. */
export function SectionHeading({
  heading,
  id,
  eyebrow,
  lead,
  className,
  align = 'start',
}: SectionHeadingProps) {
  return (
    <Reveal className={cn(align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <Eyebrow className={cn('mb-5', align === 'center' && 'justify-center')}>{eyebrow}</Eyebrow> : null}
      <SplitHeading
        id={id}
        as="h2"
        roman={heading.roman}
        accent={heading.accent}
        className="max-w-[18ch]"
      />
      {lead ? (
        <p className={cn('mt-6 max-w-measure text-lead text-ink-secondary', align === 'center' && 'mx-auto')}>
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
