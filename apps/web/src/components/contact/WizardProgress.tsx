import { contact } from '@/content/contact';

export interface WizardProgressProps {
  current: number;
  total: number;
}

const pad = (value: number) => String(value).padStart(2, '0');

/** "01 / 03" for sighted readers, a full sentence for everyone else. */
export function WizardProgress({ current, total }: WizardProgressProps) {
  return (
    <p className="font-mono text-index text-ink-dim">
      <span className="sr-only">{`${contact.wizard.labels.stepWord} ${current} ${contact.wizard.labels.progressOf} ${total}`}</span>
      <span aria-hidden="true">
        <span className="text-accent-ink">{pad(current)}</span>
        {` / ${pad(total)}`}
      </span>
    </p>
  );
}
