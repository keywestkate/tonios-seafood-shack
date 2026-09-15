/**
 * TONIO'S — Printify Pop-Up Store Product Feed
 *
 * GET /api/printify-products
 *
 * Server-side proxy to the Printify API. Keeps PRINTIFY_API_TOKEN out of
 * browser code entirely. Returns only the fields the Shop page needs:
 * id, title, image, price, and the verified public storefront URL
 * (Printify's `external.handle` field for this Pop-Up Store).
 *
 * Caching: relies on HTTP Cache-Control (CDN-level, no redeploy needed) so
 * the catalog is refreshed at most every 5 minutes, plus a short in-memory
 * cache as a fallback for warm serverless instances.
 *
 * Environment variables (set in Vercel project settings):
 *   PRINTIFY_API_TOKEN  — Printify personal access token (Read scope: products.read, shops.read)
 *   PRINTIFY_SHOP_ID    — Printify shop ID for the "Tonios Vercel" Pop-Up Store (28952617)
 */

const PRINTIFY_API_BASE = 'https://api.printify.com/v1';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

let memoryCache = { data: null, fetchedAt: 0 };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // CDN-level cache: refresh at most every 5 minutes, serve stale while revalidating.
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');

  const token  = process.env.PRINTIFY_API_TOKEN;
  const shopId = process.env.PRINTIFY_SHOP_ID || '28952617';

  if (!token) {
    console.error('[Printify] PRINTIFY_API_TOKEN not configured.');
    return res.status(200).json({ products: [], error: 'not_configured' });
  }

  const now = Date.now();
  if (memoryCache.data && (now - memoryCache.fetchedAt) < CACHE_TTL_MS) {
    return res.status(200).json({ products: memoryCache.data, cached: true });
  }

  try {
    const products = await fetchAllVisibleProducts(shopId, token);
    memoryCache = { data: products, fetchedAt: now };
    return res.status(200).json({ products, cached: false });
  } catch (err) {
    console.error('[Printify] Fetch failed:', err.message);

    // Serve last-known-good data if we have it, rather than showing an error.
    if (memoryCache.data) {
      return res.status(200).json({ products: memoryCache.data, cached: true, stale: true });
    }
    return res.status(200).json({ products: [], error: 'fetch_failed' });
  }
}

async function fetchAllVisibleProducts(shopId, token) {
  const results = [];
  let page = 1;
  const limit = 50;

  while (true) {
    const r = await fetch(
      `${PRINTIFY_API_BASE}/shops/${shopId}/products.json?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'TonioSeafoodShack/1.0',
        },
      }
    );

    if (!r.ok) {
      throw new Error(`Printify API returned ${r.status}`);
    }

    const body = await r.json();
    const items = Array.isArray(body.data) ? body.data : [];

    for (const p of items) {
      if (p.is_deleted || !p.visible) continue;

      const enabledVariants = (p.variants || []).filter(v => v.is_enabled);
      if (enabledVariants.length === 0) continue;

      const cents = enabledVariants.map(v => v.price);
      const minCents = Math.min(...cents);
      const maxCents = Math.max(...cents);

      const image =
        (p.images || []).find(img => img.is_default)?.src ||
        (p.images || [])[0]?.src ||
        null;

      const url = p.external && p.external.handle ? p.external.handle : null;

      // Never show a product we can't link to a verified public page for.
      if (!url) continue;

      results.push({
        id: p.id,
        title: p.title,
        image,
        priceMin: minCents / 100,
        priceMax: maxCents / 100,
        url,
      });
    }

    const totalPages = Math.ceil((body.total || items.length) / limit);
    if (page >= totalPages || items.length === 0) break;
    page += 1;
  }

  return results;
}
