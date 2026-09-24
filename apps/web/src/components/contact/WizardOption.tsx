import { ArrowRight } from 'lucide-react';
import { IndexNumber } from '@/components/primitives/IndexNumber';
import type { WizardOption as WizardOptionContent } from '@/content/contact';

export interface WizardOptionProps {
  option: WizardOptionContent;
  onSelect: (id: string) => void;
}

export function WizardOption({ option, onSelect }: WizardOptionProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(option.id)}
        className="group/option flex w-full items-start gap-5 rounded-sm border border-hairline/10 bg-bg-surface/50 p-6 text-left transition-[border-color,background-color] duration-hover hover:border-accent/40 hover:bg-bg-elevated"
      >
        <IndexNumber value={option.index} className="mt-1.5" />

        <span className="flex-1">
          <span className="block text-h3 font-medium text-ink-primary">{option.title}</span>
          <span className="mt-2 block text-body-sm text-ink-secondary">{option.line}</span>
        </span>

        <ArrowRight
          aria-hidden="true"
          className="mt-1.5 h-4 w-4 shrink-0 text-accent-ink transition-transform duration-hover group-hover/option:translate-x-1"
        />
      </button>
    </li>
  );
}
