import { useEffect } from 'react';

const SITE_URL = 'https://www.tanso-solar.uz';
const BRAND = 'TANSO';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export interface SeoInput {
  /** Page title WITHOUT the "| TANSO" suffix -- that is appended automatically. */
  title: string;
  description?: string;
  /** Path starting with "/", e.g. "/catalog/bosimsiz". Defaults to the current location. */
  path?: string;
}

/**
 * Keeps <title>, meta description, canonical and Open Graph tags in sync with
 * the currently rendered route. This is a client-side-only SPA (no SSR): the
 * tags start from the defaults baked into index.html and are overwritten per
 * page here -- search engines that execute JS (Google, Yandex) read the
 * final DOM state.
 */
export function useSeo({ title, description, path }: SeoInput) {
  useEffect(() => {
    const fullTitle = `${title} | ${BRAND}`;
    document.title = fullTitle;

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
    }

    upsertMeta('property', 'og:title', fullTitle);

    const canonicalUrl = `${SITE_URL}${path ?? window.location.pathname}`;
    upsertCanonical(canonicalUrl);
    upsertMeta('property', 'og:url', canonicalUrl);
  }, [title, description, path]);
}
