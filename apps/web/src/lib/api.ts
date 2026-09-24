import type { ArticleListResponse, ContactAccepted, ContactPayload } from '@datagateways/shared';

export type ContactErrorKind = 'rateLimited' | 'generic';

export class ContactError extends Error {
  constructor(readonly kind: ContactErrorKind) {
    super(kind);
    this.name = 'ContactError';
  }
}

export const postContact = async (payload: ContactPayload): Promise<ContactAccepted> => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.status === 429) throw new ContactError('rateLimited');
  if (!response.ok) throw new ContactError('generic');

  return (await response.json()) as ContactAccepted;
};

export const fetchArticles = async (category?: string): Promise<ArticleListResponse> => {
  const query = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
  const response = await fetch(`/api/resources${query}`);

  if (!response.ok) throw new Error(`Resources request failed with ${response.status}`);

  return (await response.json()) as ArticleListResponse;
};
