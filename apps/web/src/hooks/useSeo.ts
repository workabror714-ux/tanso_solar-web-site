import { useEffect } from 'react';

const SITE_URL = 'https://www.tanso-solar.uz';

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

const PRODUCT_JSONLD_ID = 'seo-product-jsonld';

function upsertProductJsonLd(jsonLd: Record<string, unknown> | undefined) {
  const existing = document.getElementById(PRODUCT_JSONLD_ID);
  if (!jsonLd) {
    // Navigated away from a product page -- don't leave stale Product data
    // behind for the next page's crawl.
    existing?.remove();
    return;
  }
  let el = existing as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = PRODUCT_JSONLD_ID;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(jsonLd);
}

export interface SeoInput {
  /** Page title WITHOUT the "| TANSO" suffix -- that is appended automatically. */
  title: string;
  description?: string;
  /** Path starting with "/", e.g. "/catalog/bosimsiz". Defaults to the current location. */
  path?: string;
  /**
   * Product detail pages only: a schema.org Product object (name, image,
   * brand, offers with current price/availability). This is what lets
   * Google (and Google Business Profile's automatic product detection)
   * read accurate, up-to-date product data straight off the page instead
   * of relying on a stale manually-entered catalog.
   */
  jsonLd?: Record<string, unknown>;
}

/**
 * Keeps <title>, meta description, canonical and Open Graph tags in sync with
 * the currently rendered route. This is a client-side-only SPA (no SSR): the
 * tags start from the defaults baked into index.html and are overwritten per
 * page here -- search engines that execute JS (Google, Yandex) read the
 * final DOM state.
 */
export function useSeo({ title, description, path, jsonLd }: SeoInput) {
  useEffect(() => {
    // Every per-page title passed into this hook already includes "TANSO"
    // (see Home/Catalog/Product/About/... callers) -- do not also append a
    // brand suffix here, or it shows up twice in the tab title and SERP.
    document.title = title;

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
    }

    upsertMeta('property', 'og:title', title);

    const canonicalUrl = `${SITE_URL}${path ?? window.location.pathname}`;
    upsertCanonical(canonicalUrl);
    upsertMeta('property', 'og:url', canonicalUrl);

    upsertProductJsonLd(jsonLd);
  }, [title, description, path, jsonLd]);
}
