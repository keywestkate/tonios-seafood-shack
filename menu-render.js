/* ============================================================
   TONIO'S — Shared Menu Renderer
   Fetches menuCategory + menuItem from Sanity CDN and renders
   them into menu pages. Falls back to static HTML if Sanity
   is unreachable or returns no data.
   ============================================================ */

(function () {

  const PROJECT_ID = '3laoz40d';
  const DATASET    = 'production';
  const CDN_URL    = `https://${PROJECT_ID}.apicdn.sanity.io/v2021-10-21/data/query/${DATASET}`;

  /* ── Category IDs that get 2-column layout ──────────────── */
  const TWO_COL_CATS = new Set([
    'cat-lunch-appetizers',
    'cat-dinner-sea',
    'cat-dinner-land',
    'cat-dinner-sides',
    'cat-brk-sides',
    'cat-brk-drinks',
    'cat-drinks-beer',
    'cat-drinks-wine',
    'cat-drinks-na',
  ]);

  /* ── Section notes by category ID ──────────────────────── */
  const SECTION_NOTES = {
    'cat-lunch-sandwiches': 'All sandwiches served with French fries.',
    'cat-dinner-soups':     'Add grilled, blackened or fried Mahi, Shrimp, Chicken or Crabmeat to any salad.',
    'cat-dinner-pasta':     'Choice of sauce: Red (marinara), White (lemon garlic white wine butter) or Fra Diavolo (spicy red).',
    'cat-dinner-sea':       'All entrées served with choice of one side & cole slaw. Broiled, blackened or fried.',
    'cat-dinner-land':      'All entrées served with choice of one side & cole slaw.',
    'cat-hh-drinks':        'Available Monday–Friday 3–6 PM, dine-in only.',
    'cat-hh-food':          'Happy Hour food specials available during happy hour hours only, dine-in only.',
    'cat-brk-eggs':         'Served with toast, grits or home fries unless noted.',
  };

  /* ── GROQ fetch helper ──────────────────────────────────── */
  async function fetchGroq(query, params) {
    try {
      let url = `${CDN_URL}?query=${encodeURIComponent(query)}`;
      if (params) {
        url += `&${Object.entries(params)
          .map(([k, v]) => `$${k}=${encodeURIComponent(JSON.stringify(v))}`)
          .join('&')}`;
      }
      const res = await fetch(url);
      if (!res.ok) return null;
      const json = await res.json();
      return json.result ?? null;
    } catch {
      return null;
    }
  }

  /* ── Build one <section class="menu-section"> ───────────── */
  function buildSection(cat, items) {
    const note    = SECTION_NOTES[cat._id] || '';
    const twoCol  = TWO_COL_CATS.has(cat._id);

    const itemsHtml = items.map(item => {
      const isMarketPrice = Array.isArray(item.labels) && item.labels.includes('Market Price');
      const priceHtml = item.price
        ? `<span class="menu-item-price">${item.price}</span>`
        : isMarketPrice
          ? `<span class="menu-item-price menu-item-market">Market Price</span>`
          : '';
      const descHtml = item.description
        ? `<div class="menu-item-desc">${item.description}</div>`
        : '';
      return `
        <div class="menu-item-row">
          <div class="menu-item-info">
            <div class="menu-item-name">${item.name}</div>
            ${descHtml}
          </div>
          ${priceHtml}
        </div>
      `;
    }).join('');

    return `
      <section class="menu-section reveal">
        <div class="menu-section-label">
          <h2 class="menu-section-name">${cat.name}</h2>
          <span class="menu-section-line" aria-hidden="true"></span>
        </div>
        ${note ? `<span class="menu-section-note">${note}</span>` : ''}
        <div class="menu-items${twoCol ? ' menu-items-2col' : ''}">
          ${itemsHtml}
        </div>
      </section>
    `;
  }

  /* ── Observe newly injected reveal elements ─────────────── */
  function observeReveals(container) {
    const els = container.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
  }

  /* ── Regular menu page renderer ─────────────────────────── */
  async function renderMenuPage(menuMain) {
    const page = menuMain.dataset.menuPage;
    if (!page) return;

    /* Fetch categories for this page */
    const cats = await fetchGroq(
      `*[_type == "menuCategory" && menuPage == $page] | order(sortOrder asc) { _id, name, sortOrder }`,
      { page }
    );
    if (!cats || !cats.length) return; // leave static HTML intact

    const catIds = cats.map(c => c._id);

    /* Fetch active items for those categories */
    const items = await fetchGroq(
      `*[_type == "menuItem" && active != false && category._ref in $catIds] | order(sortOrder asc) { _id, name, description, price, labels, sortOrder, "catId": category._ref }`,
      { catIds }
    );
    if (!items) return;

    /* Group items by category */
    const byCategory = {};
    items.forEach(item => {
      if (!byCategory[item.catId]) byCategory[item.catId] = [];
      byCategory[item.catId].push(item);
    });

    /* Build new HTML — preserve any .menu-callout divs */
    const callouts = Array.from(menuMain.querySelectorAll('.menu-callout'));

    /* Only replace if at least one category has items */
    const hasContent = cats.some(c => (byCategory[c._id] || []).length > 0);
    if (!hasContent) return;

    /* Remove existing sections, keep callouts */
    menuMain.querySelectorAll('.menu-section').forEach(s => s.remove());

    /* Re-insert callouts followed by new sections */
    callouts.forEach(c => c.remove()); // detach temporarily

    /* For each category in order, insert section */
    cats.forEach(cat => {
      const catItems = byCategory[cat._id] || [];
      if (!catItems.length) return;
      const section = document.createElement('div');
      section.innerHTML = buildSection(cat, catItems);
      const el = section.firstElementChild;
      menuMain.appendChild(el);
    });

    /* Re-attach callouts at the top */
    if (callouts.length) {
      callouts.forEach(c => menuMain.insertBefore(c, menuMain.firstChild));
    }

    observeReveals(menuMain);
  }

  /* ── Special menus: sushi ────────────────────────────────── */
  async function renderSushiSection() {
    const container = document.querySelector('.sm-section--sushi .sm-menu-grid');
    if (!container) return;

    const rolls = await fetchGroq(
      `*[_type == "sushiRoll"] | order(sortOrder asc) { _id, name, ingredients, price }`
    );
    if (!rolls || !rolls.length) return;

    container.innerHTML = rolls.map(r => {
      const priceHtml = r.price
        ? `<span class="sm-item-price">${r.price}</span>`
        : `<span class="sm-item-price">&nbsp;</span>`;
      const descHtml = r.ingredients
        ? `<span class="sm-item-desc">${r.ingredients}</span>`
        : '';
      return `
        <div class="sm-item">
          <span class="sm-item-name">${r.name}</span>
          ${priceHtml}
          ${descHtml}
        </div>
      `;
    }).join('');
  }

  /* ── Special menus: pasta ────────────────────────────────── */
  async function renderPastaSection() {
    const container = document.querySelector('.sm-section--pasta .sm-menu-grid');
    if (!container) return;

    const pastas = await fetchGroq(
      `*[_type == "pastaItem" && comingSoon != true] | order(sortOrder asc) { _id, name, description, price }`
    );
    if (!pastas || !pastas.length) return;

    container.innerHTML = pastas.map(p => {
      const priceHtml = p.price
        ? `<span class="sm-item-price">${p.price}</span>`
        : `<span class="sm-item-price">&nbsp;</span>`;
      const descHtml = p.description
        ? `<span class="sm-item-desc">${p.description}</span>`
        : '';
      return `
        <div class="sm-item">
          <span class="sm-item-name">${p.name}</span>
          ${priceHtml}
          ${descHtml}
        </div>
      `;
    }).join('');
  }

  /* ── Entry point ─────────────────────────────────────────── */
  function init() {
    const menuMain = document.querySelector('main[data-menu-page]');
    if (menuMain) {
      renderMenuPage(menuMain);
      return;
    }
    /* special-menus.html — check for sushi / pasta sections */
    if (document.querySelector('.sm-section--sushi')) renderSushiSection();
    if (document.querySelector('.sm-section--pasta')) renderPastaSection();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
