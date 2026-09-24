import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { IntegrationsSection } from '@datagateways/shared';
import { PlaceholderBadge } from '@/components/primitives/PlaceholderBadge';
import { Reveal } from '@/components/primitives/Reveal';
import { Counter } from './Counter';
import { FilterTabs } from './FilterTabs';

export interface IntegrationGridProps {
  section: IntegrationsSection;
  /** Accessible name for the filter group, e.g. "Filter DataNerve integrations". */
  filterLabel: string;
}

export function IntegrationGrid({ section, filterLabel }: IntegrationGridProps) {
  const [active, setActive] = useState('all');
  const reduced = useReducedMotion() ?? false;

  const tiles = section.tiles.value;
  const filtered = active === 'all' ? tiles : tiles.filter((tile) => tile.categoryId === active);

  return (
    <div>
      <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Counter item={{ value: section.countBadge, label: section.countLabel }} />
        <FilterTabs tabs={section.tabs} active={active} onChange={setActive} label={filterLabel} />
      </Reveal>

      {filtered.length === 0 ? (
        <PlaceholderBadge item={section.tiles} as="div" className="mt-12">
          <p className="rounded-sm border border-dashed border-hairline/15 px-6 py-10 text-center text-body-sm text-ink-secondary">
            {section.emptyState}
          </p>
        </PlaceholderBadge>
      ) : (
        <motion.ul layout={!reduced} className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((tile) => (
              <motion.li
                key={tile.name}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: reduced ? 0 : 0.25 }}
                className="flex items-center justify-center rounded-sm border border-hairline/10 bg-bg-surface/50 px-4 py-6 text-center text-body-sm text-ink-secondary transition-[border-color,color,transform] duration-hover hover:-translate-y-0.5 hover:border-accent/40 hover:text-ink-primary"
              >
                {tile.name}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
