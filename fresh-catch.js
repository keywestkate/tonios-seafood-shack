/* ============================================================
   TONIO'S — Fresh Catch Page Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Catch Board (initial render using cms-data fallback) ── */
  renderCatchBoard();

  /* ── Hours ────────────────────────────────────────────────── */
  const hoursList = document.getElementById('fc-hours-list');
  if (hoursList && CMS.hours) {
    hoursList.innerHTML = CMS.hours.map(h => `
      <div class="fc-hours-row">
        <span class="day">${h.day}</span>
        <span class="time">${h.open} – ${h.close}</span>
      </div>
    `).join('');
  }

  /* ── Scroll reveal ────────────────────────────────────────── */
  initFcReveal(document);

  /* ── Mobile nav ───────────────────────────────────────────── */
  const burger  = document.getElementById('burger');
  const mobMenu = document.getElementById('mob-menu');
  burger?.addEventListener('click', () => {
    const open = mobMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobMenu.classList.remove('open');
      burger?.classList.remove('open');
      burger?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ── Nav scroll ───────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

});

/* ── Re-render when Sanity data arrives ────────────────────── */
document.addEventListener('sanityLoaded', () => {
  renderCatchBoard();
});

/* ── Status helpers ─────────────────────────────────────────── */
const STATUS_CONFIG = {
  'in':       { cls: 'fc-in',       label: 'In Stock',      dot: 'fc-dot-in'      },
  'limited':  { cls: 'fc-limited',  label: 'Limited',       dot: 'fc-dot-limited' },
  'out':      { cls: 'fc-out',      label: 'Sold Out',      dot: 'fc-dot-out'     },
  'call':     { cls: 'fc-call',     label: 'Call to Check', dot: 'fc-dot-call'    },
  'seasonal': { cls: 'fc-seasonal', label: 'Seasonal',      dot: 'fc-dot-call'    },
};

function statusCfg(status) {
  return STATUS_CONFIG[status] || STATUS_CONFIG['call'];
}

function priceDisplay(item) {
  if (item.priceType === 'fixed' && item.note)  return item.note;
  if (item.priceType === 'call')                 return 'Call for Price';
  return 'Market Price';
}

/* ── Featured card HTML ─────────────────────────────────────── */
function featuredCardHTML(item) {
  const cfg        = statusCfg(item.status);
  const price      = priceDisplay(item);
  const photoStyle = item.photo ? `style="background-image:url('${item.photo}')"` : '';
  const photoClass = item.photo ? 'fc-feat-has-photo' : '';
  const badgeHTML  = item.freshnessBadge
    ? `<span class="fc-freshness-badge">${item.freshnessBadge}</span>` : '';
  const prepHTML   = item.prepOptions && item.prepOptions.length
    ? `<div class="fc-prep-tags">${item.prepOptions.map(p => `<span class="fc-prep-tag">${p}</span>`).join('')}</div>` : '';
  const descHTML   = item.description
    ? `<p class="fc-feat-desc">${item.description}</p>` : '';

  return `
    <div class="fc-featured-card ${cfg.cls} ${photoClass}" role="listitem">
      ${item.photo ? `<div class="fc-feat-photo" ${photoStyle} aria-hidden="true"></div>` : ''}
      <div class="fc-feat-body">
        <div class="fc-feat-top">
          <span class="fc-featured-label">⭐ Featured Catch</span>
          ${badgeHTML}
          <span class="fc-status-pill ${cfg.cls}">${cfg.label}</span>
        </div>
        <h3 class="fc-feat-name">${item.name}</h3>
        ${descHTML}
        ${prepHTML}
        <div class="fc-feat-foot">
          <span class="fc-feat-price">${price}</span>
          <div class="fc-feat-actions">
            <a href="tel:+13057453322" class="btn btn-primary btn--sm">Call to Check</a>
            <a href="menu-dinner.html" class="btn-ghost-nav btn--sm">View Dinner Menu</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ── Regular catch card HTML ────────────────────────────────── */
function catchCardHTML(item, delay) {
  const cfg       = statusCfg(item.status);
  const price     = priceDisplay(item);
  const badgeHTML = item.freshnessBadge
    ? `<span class="fc-freshness-badge fc-freshness-badge--sm">${item.freshnessBadge}</span>` : '';
  const prepHTML  = item.prepOptions && item.prepOptions.length
    ? `<div class="fc-prep-tags">${item.prepOptions.map(p => `<span class="fc-prep-tag">${p}</span>`).join('')}</div>` : '';
  const descHTML  = item.description
    ? `<p class="fc-card-desc">${item.description}</p>` : '';
  const soldClass = item.status === 'out' ? ' fc-card--sold-out' : '';

  return `
    <div class="fc-card ${cfg.cls}${soldClass} reveal${delay ? ' reveal-d' + Math.min(delay, 4) : ''}"
         role="listitem">
      <div class="fc-card-top">
        <div class="fc-card-meta">
          <span class="fc-status-dot ${cfg.cls}"></span>
          ${badgeHTML}
        </div>
        <span class="fc-card-name">${item.name}</span>
        ${descHTML}
        ${prepHTML}
      </div>
      <div class="fc-card-foot">
        <span class="fc-card-price ${item.status === 'out' ? 'fc-card-price--out' : ''}">${price}</span>
        <span class="fc-status-label">${cfg.label}</span>
      </div>
    </div>
  `;
}

/* ── Main catch board renderer ──────────────────────────────── */
function renderCatchBoard() {
  const board      = document.getElementById('catch-board');
  const featuredEl = document.getElementById('catch-featured');
  const emptyEl    = document.getElementById('catch-empty');
  const topNoteEl  = document.getElementById('catch-top-note');
  const noteTextEl = document.getElementById('catch-note-text');
  const noteEl     = document.getElementById('catch-note');
  const timeEl     = document.getElementById('catch-updated-time');
  if (!board || !CMS.freshCatch) return;

  const fc = CMS.freshCatch;

  /* Last updated / note */
  if (timeEl) timeEl.textContent = fc.lastUpdated || 'Today';

  /* Top note banner */
  const settings = CMS.freshCatchSettings;
  const topNote  = (settings && settings.topNote) || fc.note || '';
  if (topNoteEl && noteTextEl && topNote) {
    noteTextEl.textContent = topNote;
    topNoteEl.hidden = false;
  }
  /* Legacy note element */
  if (noteEl) noteEl.textContent = '';

  const items = fc.items || [];

  /* Empty state */
  if (!items.length) {
    board.innerHTML    = '';
    if (featuredEl)    { featuredEl.hidden = true; featuredEl.innerHTML = ''; }
    if (emptyEl)       emptyEl.hidden = false;
    return;
  }
  if (emptyEl)         emptyEl.hidden = true;

  /* Featured item (first featured one wins) */
  const featuredItem = items.find(i => i.featured);
  const regularItems = items.filter(i => !i.featured);

  if (featuredEl) {
    if (featuredItem) {
      featuredEl.innerHTML = featuredCardHTML(featuredItem);
      featuredEl.hidden    = false;
    } else {
      featuredEl.hidden    = true;
      featuredEl.innerHTML = '';
    }
  }

  /* Regular items grid */
  board.innerHTML = regularItems.map((item, i) => catchCardHTML(item, i)).join('');

  initFcReveal(board);
  if (featuredEl && !featuredEl.hidden) initFcReveal(featuredEl);
}

function initFcReveal(root) {
  const els = root.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => obs.observe(el));
}
