import { useEffect } from 'react';
import type { SeoMeta } from '@datagateways/shared';
import { site } from '@/content/site';

export interface MetaProps {
  seo: SeoMeta;
  /** Path of the current route, used for the canonical URL. */
  path: string;
}

/**
 * Per-route document metadata.
 *
 * This replaces react-helmet-async, which renders nothing at all under React 18 StrictMode — its
 * dispatcher deregisters on the simulated unmount and never re-registers, so titles, canonicals and
 * OG tags silently never appear. The library has been unmaintained since 2023 and does not support
 * React 19 either, so rather than drop StrictMode to accommodate it, this does the same job in
 * forty lines with no dependency.
 *
 * Every tag it writes is marked `data-meta="route"` so it only ever edits its own, never the static
 * tags in index.html.
 */

const upsert = (selector: string, create: () => HTMLElement, value: string) => {
  const head = document.head;
  let element = head.querySelector<HTMLElement>(`${selector}[data-meta="route"]`);

  if (!element) {
    element = create();
    element.setAttribute('data-meta', 'route');
    head.appendChild(element);
  }

  if (element instanceof HTMLLinkElement) element.href = value;
  else element.setAttribute('content', value);
};

const meta = (attribute: 'name' | 'property', key: string, value: string) =>
  upsert(`meta[${attribute}="${key}"]`, () => {
    const element = document.createElement('meta');
    element.setAttribute(attribute, key);
    return element;
  }, value);

export function Meta({ seo, path }: MetaProps) {
  useEffect(() => {
    const canonical = `${site.url}${path}`;

    document.title = seo.title;

    // The static description in index.html has no data-meta marker, so it would be left in place
    // alongside ours. Retire it the first time a route takes over.
    document.head.querySelector('meta[name="description"]:not([data-meta])')?.remove();

    meta('name', 'description', seo.description);
    meta('property', 'og:type', 'website');
    meta('property', 'og:site_name', site.name);
    meta('property', 'og:title', seo.title);
    meta('property', 'og:description', seo.description);
    meta('property', 'og:url', canonical);
    meta('name', 'twitter:card', 'summary_large_image');
    meta('name', 'twitter:title', seo.title);
    meta('name', 'twitter:description', seo.description);

    upsert('link[rel="canonical"]', () => {
      const element = document.createElement('link');
      element.rel = 'canonical';
      return element;
    }, canonical);
  }, [seo.title, seo.description, path]);

  return null;
}
