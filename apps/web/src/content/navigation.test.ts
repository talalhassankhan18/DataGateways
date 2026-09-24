import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { NavNode } from '@datagateways/shared';
import { CAPABILITY_SLUGS } from './capabilities';
import { PRODUCT_SLUGS } from './products';
import { SERVICE_SLUGS } from './services';
import { features, site } from './site';

/**
 * The routes App.tsx actually registers, read from the source so this cannot drift from the router.
 *
 * Patterns are expanded against the slug lists their page validates with, rather than skipped:
 * `/platform/socmint` and `/platform/datanerve/dspm` are only reachable because `socmint` and
 * `dspm` are in those lists, so a nav item pointing at a slug nobody added should fail here rather
 * than render the 404 page in front of the client.
 */
const routerSource = readFileSync(join(__dirname, '..', 'App.tsx'), 'utf8');

const PATTERN_SLUGS: Record<string, readonly string[]> = {
  ':slug': PRODUCT_SLUGS,
  ':capability': CAPABILITY_SLUGS,
  ':service': SERVICE_SLUGS,
};

const expand = (path: string): readonly string[] => {
  const param = path.split('/').find((segment) => segment.startsWith(':'));
  if (!param) return [path];

  const slugs = PATTERN_SLUGS[param];
  if (!slugs) return [];
  return slugs.map((slug) => path.replace(param, slug));
};

const registeredPaths = new Set(
  [...routerSource.matchAll(/<Route\s+path="([^"]+)"/g)]
    .map(([, path]) => path)
    .filter((path) => path !== '*')
    .flatMap(expand)
    .map((path) => `/${path}`),
);
registeredPaths.add('/');

/**
 * Pages the copy deck says the client still owes us. They are linked from the footer on purpose —
 * the links are the record of what is outstanding — but they must never appear in a nav, and every
 * one has to be replaced before launch. See docs/PLACEHOLDERS.md.
 */
const PENDING_PAGES = new Set([
  '/careers',
  '/security',
  '/status',
  '/docs',
  '/privacy',
  '/terms',
]);

const isResolvable = (href: string) =>
  registeredPaths.has(href) || PENDING_PAGES.has(href) || href.startsWith('#');

/** Every node in the primary nav, at any depth. */
const flatten = (nodes: readonly NavNode[]): readonly NavNode[] =>
  nodes.flatMap((node) => [node, ...flatten(node.children ?? [])]);

const allPrimary = flatten(site.nav.primary);

describe('navigation', () => {
  it('registers a route for every primary nav link, at every level', () => {
    const dead = allPrimary.filter((item) => !registeredPaths.has(item.href));
    expect(dead.map((item) => `${item.label} -> ${item.href}`)).toEqual([]);
  });

  it('gives every nav node that opens a panel its own destination', () => {
    // A parent reachable only by hovering is unreachable on touch and by keyboard.
    const unreachable = allPrimary.filter((item) => item.children && !item.href);
    expect(unreachable.map((item) => item.label)).toEqual([]);
  });

  it('registers a route for every fullscreen-menu link', () => {
    const dead = site.nav.menu.filter((item) => !isResolvable(item.href));
    expect(dead.map((item) => `${item.label} -> ${item.href}`)).toEqual([]);
  });

  it('drops the Resources nav item whenever the page itself is cut', () => {
    // The copy deck's instruction is to cut the page AND the nav item together.
    const hrefs = [...allPrimary, ...site.nav.menu].map((item) => item.href);

    if (features.resources) {
      expect(hrefs).toContain('/resources');
    } else {
      expect(hrefs).not.toContain('/resources');
    }
  });

  it('numbers the fullscreen menu 01..0n with no gap', () => {
    expect(site.nav.menu.map((item) => item.index)).toEqual(
      site.nav.menu.map((_, index) => String(index + 1).padStart(2, '0')),
    );
  });

  it('points every footer link at a real route or a page known to be outstanding', () => {
    const links = [...site.footer.secondary, ...site.footer.legal];
    const unresolvable = links.filter((item) => !isResolvable(item.href));

    // A new footer link to a page nobody has built is either a typo or a missing PENDING_PAGES
    // entry. Both should fail here rather than 404 in front of the client.
    expect(unresolvable.map((item) => `${item.label} -> ${item.href}`)).toEqual([]);
  });
});
