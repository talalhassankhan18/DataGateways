import { cn } from '@/lib/cn';

export interface EyebrowProps {
  children: string;
  className?: string;
  id?: string;
}

/** The uppercase label that sits above every h1, preceded by a short accent rule. */
export function Eyebrow({ children, className, id }: EyebrowProps) {
  return (
    <p id={id} className={cn('flex items-center gap-3 text-eyebrow uppercase text-ink-dim', className)}>
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-accent/70" />
      {children}
    </p>
  );
}
