import { Link } from 'react-router-dom';
import type { ContentValue } from '@datagateways/shared';
import { ArrowLink } from '@/components/primitives/ArrowLink';
import { PlaceholderBadge } from '@/components/primitives/PlaceholderBadge';
import { RevealItem } from '@/components/primitives/Reveal';
import { AVAILABLE_MEDIA } from '@/generated/media';
import { formatDate } from '@/lib/format';
import { site } from '@/content/site';

/** Same contract as the heroes: an image that was never synced renders nothing, not a broken box. */
const hasMedia = (path: string) => AVAILABLE_MEDIA.includes(path);

export interface ArticleCardContent {
  readonly slug: string;
  readonly date: string | ContentValue<string>;
  readonly headline: string;
  readonly caption: string;
  readonly href: string;
  /** Optional lead image. Decorative — the headline carries the meaning — so it takes empty alt. */
  readonly image?: string;
}

export interface ArticleCardProps {
  article: ArticleCardContent;
}

const isFlagged = (value: ArticleCardContent['date']): value is ContentValue<string> =>
  typeof value === 'object' && value !== null && 'status' in value;

export function ArticleCard({ article }: ArticleCardProps) {
  const rawDate = isFlagged(article.date) ? article.date.value : article.date;
  const dateNode = (
    <time dateTime={rawDate} className="text-eyebrow uppercase text-ink-dim">
      {formatDate(rawDate)}
    </time>
  );

  return (
    <RevealItem
      as="li"
      className="group/card relative flex flex-col justify-between overflow-hidden rounded-sm border border-hairline/10 bg-bg-surface/50 transition-[border-color,box-shadow] duration-hover hover:border-accent/40 hover:shadow-card-hover focus-within:border-accent/40"
    >
      {article.image && hasMedia(article.image) ? (
        <div className="aspect-[16/9] overflow-hidden bg-bg-navy">
          <img
            src={article.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-entrance group-hover/card:scale-105"
          />
        </div>
      ) : null}

      <div className="p-6">
        <div className="flex items-center gap-4">
          {isFlagged(article.date) ? (
            <PlaceholderBadge item={article.date}>{dateNode}</PlaceholderBadge>
          ) : (
            dateNode
          )}
          <span aria-hidden="true" className="h-px flex-1 bg-hairline/10" />
          <span className="text-eyebrow uppercase text-ink-dim">{article.caption}</span>
        </div>

        <h3 className="mt-8 text-h3 font-medium text-ink-primary">
          <Link
            to={article.href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {article.headline}
          </Link>
        </h3>

        <ArrowLink asText label={site.ui.readArticle} className="mt-8" />
      </div>
    </RevealItem>
  );
}
