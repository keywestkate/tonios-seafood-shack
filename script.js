/* ============================================================
   TONIO'S SEAFOOD SHACK — Main Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Announcement Bar ─────────────────────────────────── */
  const track = document.getElementById('marquee-track');
  if (track && CMS.announcement.active) {
    const msgs = CMS.announcement.messages;
    const all = [...msgs, ...msgs, ...msgs, ...msgs, ...msgs, ...msgs];
    track.innerHTML = all.map(m =>
      `<span>${m}</span><span class="marquee-dot">·</span>`
    ).join('');
  }

  /* ── Navigation scroll behavior ──────────────────────── */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    if (window.scrollY > 60 && nav.style.top !== '0px') {
      nav.style.top = '0px';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile hamburger ──────────────────────────────── */
  const burger = document.getElementById('burger');
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

  /* ── Today date ──────────────────────────────────────── */
  const todayDateEl = document.getElementById('today-date');
  if (todayDateEl) todayDateEl.textContent = CMS._today;

  /* ── Today strip, music, catch, events ───────────────── */
  renderTodayStrip();
  renderCatchBoard();
  renderMusicNext();
  renderEventsList();
  renderDailySpecials();

  /* ── Menu list ────────────────────────────────────────── */
  const menuList = document.getElementById('menu-list');
  if (menuList) {
    const items = [
      { num: '01', key: 'breakfast' },
      { num: '02', key: 'lunch' },
      { num: '03', key: 'dinner' },
      { num: '04', key: 'drinks' },
      { num: '05', key: 'happyHour' },
      { num: '06', key: 'special' },
    ];
    menuList.innerHTML = items.map(({ num, key }, i) => {
      const m = CMS.menus[key];
      return `
        <a href="${m.url}" class="menu-item reveal${i > 0 ? ' reveal-d' + Math.min(i,4) : ''}"
           role="listitem" aria-label="${m.title}">
          <div class="menu-item-left">
            <span class="menu-num">${num}</span>
            <span class="menu-title">${m.title}</span>
          </div>
          <span class="menu-tagline">${m.tagline}</span>
          <span class="menu-arrow" aria-hidden="true">→</span>
        </a>
      `;
    }).join('');
  }

  /* ── Happy Hour ──────────────────────────────────────── */
  const hhTime  = document.getElementById('hh-time');
  const hhDeals = document.getElementById('hh-deals');
  if (hhTime) hhTime.textContent = `${CMS.happyHour.days} · ${CMS.happyHour.time}`;
  if (hhDeals) {
    hhDeals.innerHTML = CMS.happyHour.deals.map(d =>
      `<span class="hh-deal">${d.item} <strong>${d.price}</strong></span>`
    ).join('');
  }

  /* ── Hours table ─────────────────────────────────────── */
  const hoursList = document.getElementById('hours-list');
  if (hoursList) {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    hoursList.innerHTML = CMS.hours.map(h => `
      <div class="h-row${h.day === today ? ' is-today' : ''}">
        <span class="h-day">${h.day}${h.day === today ? ' (Today)' : ''}</span>
        <span>${h.open} – ${h.close}</span>
      </div>
    `).join('');
  }

  /* ── Parking note ────────────────────────────────────── */
  const parkingEl = document.getElementById('visit-parking');
  if (parkingEl) parkingEl.textContent = CMS.location.parking;

  /* ── Apparel ─────────────────────────────────────────── */
  const apparelList = document.getElementById('apparel-list');
  if (apparelList) {
    const icons = [
      `<svg class="a-icon" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M15 10 L5 20 L15 24 L15 50 L45 50 L45 24 L55 20 L45 10 Q38 18 30 18 Q22 18 15 10Z" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
      `<svg class="a-icon" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M15 10 L5 20 L15 24 L15 50 L45 50 L45 24 L55 20 L45 10 Q38 18 30 18 Q22 18 15 10Z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M22 18 Q30 22 38 18" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
      `<svg class="a-icon" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M18 15 L42 15 L38 50 L22 50 Z" stroke="currentColor" stroke-width="2" fill="none"/><ellipse cx="30" cy="15" rx="12" ry="4" stroke="currentColor" stroke-width="2" fill="none"/><line x1="20" y1="28" x2="40" y2="28" stroke="currentColor" stroke-width="1.5"/></svg>`,
      `<svg class="a-icon" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 35 Q30 15 50 35" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 38 Q30 36 52 38" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M8 38 L4 42 L56 42 L52 38" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    ];
    apparelList.innerHTML = CMS.apparel.map((item, i) => `
      <div class="a-item reveal${i > 0 ? ' reveal-d' + Math.min(i,4) : ''}">
        <div class="a-left">
          ${icons[i] || icons[0]}
          <div>
            ${item.tag ? `<span class="a-tag">${item.tag}</span>` : ''}
            <div class="a-name">${item.name}</div>
            <div class="a-desc">${item.description}</div>
          </div>
        </div>
        <div class="a-price">${item.price}</div>
        <span class="a-arrow" aria-hidden="true">→</span>
      </div>
    `).join('');
  }

  /* ── Scroll reveal ───────────────────────────────────── */
  initReveal();

  /* ── Hero parallax ───────────────────────────────────── */
  const heroBg = document.getElementById('hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `translateY(${y * 0.35}px)`;
      }
    }, { passive: true });
  }

  /* ── Keyboard trap for mobile menu ──────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobMenu?.classList.contains('open')) {
      mobMenu.classList.remove('open');
      burger?.classList.remove('open');
      burger?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      burger?.focus();
    }
  });

});

/* ── Re-render live sections when Sanity data arrives ──── */
document.addEventListener('sanityLoaded', () => {
  renderTodayStrip();
  renderCatchBoard();
  renderMusicNext();
  renderEventsList();
  renderDailySpecials();
});

/* ── Renderers (called on DOMContentLoaded + sanityLoaded) ── */

function renderTodayStrip() {
  const hoursValueEl = document.getElementById('today-hours-value');
  if (hoursValueEl) {
    const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayHours = CMS.hours.find(h => h.day === todayName);
    hoursValueEl.textContent = todayHours ? `${todayHours.open} – ${todayHours.close}` : 'See hours';
  }

  const catchValueEl = document.getElementById('today-catch-value');
  if (catchValueEl && CMS.freshCatch) {
    const inStock = CMS.freshCatch.items.filter(i => i.status === 'in').slice(0, 3).map(i => i.name);
    catchValueEl.textContent = inStock.length ? inStock.join(' · ') : 'Call to check';
  }

  const musicValueEl = document.getElementById('today-music-value');
  if (musicValueEl) {
    const todayStr = new Date().toISOString().slice(0, 10);
    const tonight = CMS._upcomingEvents.find(e => e.date === todayStr);
    musicValueEl.textContent = tonight ? `${tonight.name} · ${tonight.time}` : 'See full calendar';
  }

  const visitCompactHours = document.getElementById('visit-compact-hours');
  if (visitCompactHours) {
    const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayHours = CMS.hours.find(h => h.day === todayName);
    visitCompactHours.textContent = todayHours
      ? `Today's Hours: ${todayHours.open} – ${todayHours.close}`
      : 'See full hours';
  }
}

function renderCatchBoard() {
  const catchBoard = document.getElementById('catch-board');
  const catchNote  = document.getElementById('catch-note');
  const catchTime  = document.getElementById('catch-updated-time');
  if (!catchBoard || !CMS.freshCatch) return;
  const fc = CMS.freshCatch;
  if (catchNote) catchNote.textContent = fc.note;
  if (catchTime) catchTime.textContent = fc.lastUpdated;
  catchBoard.innerHTML = fc.items.map((item, i) => {
    const cls = item.status === 'in' ? 'catch-in'
              : item.status === 'out' ? 'catch-out'
              : 'catch-call';
    const label = item.status === 'in'   ? '● In Stock'
                : item.status === 'out'  ? '○ Out of Season'
                : '◐ Call to Check';
    return `
      <div class="catch-item ${cls} reveal${i > 0 ? ' reveal-d' + Math.min(i,4) : ''}">
        <div class="catch-item-left">
          <span class="catch-status-dot"></span>
          <span class="catch-name">${item.name}</span>
        </div>
        <div class="catch-item-right">
          <span class="catch-note-small">${item.note}</span>
          <span class="catch-status-label">${label}</span>
        </div>
      </div>
    `;
  }).join('');
  initReveal(catchBoard);
}

function renderMusicNext() {
  const musicNext = document.getElementById('music-next');
  if (!musicNext) return;
  const next = CMS._upcomingEvents.slice(0, 2);
  if (!next.length) {
    musicNext.innerHTML = `<p class="no-events">Check back soon for upcoming shows.</p>`;
    return;
  }
  musicNext.innerHTML = next.map((e, i) => {
    const d = new Date(e.date + 'T00:00:00');
    const dateStr = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    return `
      <div class="music-next-item reveal${i > 0 ? ' reveal-d1' : ''}">
        <span class="music-next-date">${dateStr} · ${e.time}</span>
        <h3 class="music-next-name">${e.name}</h3>
        <p class="music-next-desc">${e.description}</p>
      </div>
    `;
  }).join('');
  initReveal(musicNext);
}

function renderEventsList() {
  const eventsList = document.getElementById('events-list');
  if (!eventsList) return;
  const events = CMS._upcomingEvents;
  eventsList.innerHTML = '';
  if (!events.length) {
    eventsList.innerHTML = `<div class="no-events">Check back soon for upcoming events.</div>`;
    return;
  }
  const row = document.createElement('div');
  row.className = 'events-row';
  row.innerHTML = events.map(e => {
    const d = new Date(e.date + 'T00:00:00');
    const dateStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' });
    const calLink = buildCalLink(e, d);
    return `
      <article class="e-poster${e.featured ? ' featured' : ''}" role="listitem">
        <span class="e-type">${e.type}</span>
        <div class="e-body">
          <h3 class="e-name">${e.name}</h3>
          <p class="e-desc">${e.description}</p>
        </div>
        <div class="e-meta">
          <span class="e-date">${dateStr} · ${e.time}</span>
          <span class="e-cover">${e.cover === 'No Cover' ? 'Free · No Cover' : 'Cover: ' + e.cover}</span>
          <div class="e-actions">
            <button class="e-btn" onclick="window.open('${calLink}','_blank')" aria-label="Add ${e.name} to calendar">+ Calendar</button>
            <button class="e-btn" onclick="shareEvent('${e.name}','${dateStr} at ${e.time}')" aria-label="Share ${e.name}">Share</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
  eventsList.appendChild(row);
}

/* ── Scroll reveal (re-observable) ───────────────────────── */
function initReveal(root) {
  const els = (root || document).querySelectorAll('.reveal:not(.in)');
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

/* ── Helpers ──────────────────────────────────────────────── */

function buildCalLink(event, date) {
  const d = new Date(date);
  const pad = n => String(n).padStart(2,'0');
  const fmt = dt => `${dt.getFullYear()}${pad(dt.getMonth()+1)}${pad(dt.getDate())}`;
  const start = fmt(d) + 'T200000';
  const end   = fmt(d) + 'T230000';
  const text  = encodeURIComponent(`${event.name} at Tonio's Seafood Shack`);
  const loc   = encodeURIComponent("Mile Marker 25, Summerland Key, FL 33042");
  const details = encodeURIComponent(`${event.description} — ${event.cover === 'No Cover' ? 'No Cover Charge' : 'Cover: ' + event.cover}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&location=${loc}&details=${details}`;
}

function shareEvent(name, dateStr) {
  const url = window.location.href.split('#')[0] + '#music';
  const text = `${name} at Tonio's Seafood Shack · ${dateStr} · Mile Marker 25, Summerland Key FL`;
  if (navigator.share) {
    navigator.share({ title: name, text, url }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(`${text}\n${url}`).then(() => {
      showToast('Link copied to clipboard!');
    });
  }
}

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', bottom: '90px', left: '50%', transform: 'translateX(-50%)',
    background: '#F3C74F', color: '#102F34', padding: '.7rem 1.5rem',
    fontFamily: "'Syne', sans-serif", fontSize: '.78rem', fontWeight: '700',
    letterSpacing: '.1em', textTransform: 'uppercase', zIndex: '9999',
    borderRadius: '2px', boxShadow: '0 4px 20px rgba(0,0,0,.4)',
    animation: 'fadeInOut 2.5s forwards',
  });
  const style = document.createElement('style');
  style.textContent = '@keyframes fadeInOut{0%{opacity:0;transform:translateX(-50%) translateY(10px)}15%{opacity:1;transform:translateX(-50%)}85%{opacity:1}100%{opacity:0}}';
  document.head.appendChild(style);
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

/* ════════════════════════════════════════════════════════════
   DAILY SPECIALS RENDERER
   ════════════════════════════════════════════════════════════ */

/* SVG icons by type — aqua-colored, drawn on 32×24 viewbox */
const DS_ICONS = {
  fish: `<svg class="ds-card-icon" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 12C24 12 20 6 12 4C6 4 2 8 2 12C2 16 6 20 12 20C20 18 24 12 24 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M24 12L30 7M24 12L30 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="9" cy="10" r="1.2" fill="currentColor"/>
    <path d="M13 10C14 9 16 9 17 10" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
  </svg>`,

  shrimp: `<svg class="ds-card-icon" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10 4C10 4 8 6 9 9C10 12 14 13 16 16C18 19 17 21 17 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M10 4C13 3 17 4 19 7C21 10 20 14 17 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M9 9L6 8M9 9L7 11" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
    <path d="M14 13L12 11M14 13L11 14" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
    <circle cx="10.5" cy="5" r="1" fill="currentColor"/>
  </svg>`,

  lobster: `<svg class="ds-card-icon" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="16" cy="13" rx="5" ry="7" stroke="currentColor" stroke-width="1.5"/>
    <path d="M11 11L7 9M11 11L7 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M21 11L25 9M21 11L25 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M14 6L13 3M18 6L19 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M13 17L12 20M16 20L16 22M19 17L20 20" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
    <circle cx="14" cy="11" r=".8" fill="currentColor"/>
    <circle cx="18" cy="11" r=".8" fill="currentColor"/>
  </svg>`,

  cocktail: `<svg class="ds-card-icon" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 4H24L17 14V20H20M17 14L15 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="13" y1="20" x2="21" y2="20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="22" cy="7" r="2" fill="currentColor" opacity=".4"/>
    <path d="M10 9H18" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity=".5"/>
  </svg>`,

  wave: `<svg class="ds-card-icon" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 10Q6 6 10 10Q14 14 18 10Q22 6 26 10Q28 12 30 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M2 15Q6 11 10 15Q14 19 18 15Q22 11 26 15Q28 17 30 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>
    <path d="M4 19H28" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity=".25"/>
  </svg>`,
};

/* Fallback specials — shown before Sanity loads or if Sanity has none */
const DS_FALLBACK = [
  {
    label:      'Lunch Special',
    title:      "Today's Lunch Feature",
    description: "Fresh-caught, shack-prepared, and gone by 3 PM. Ask your server what came in this morning.",
    price:      '',
    marketPrice: false,
    tag:        "Ask Before It's Gone",
    icon:       'fish',
    buttonText: 'See the Lunch Menu',
    buttonLink: 'menu-lunch.html',
    photo:      null,
  },
  {
    label:      'Dinner Feature',
    title:      "Chef's Catch Tonight",
    description: "Straight off the local docks — whole or filleted, grilled or blackened, your call. Limited nightly.",
    price:      '',
    marketPrice: true,
    tag:        'Straight from the Dock',
    icon:       'lobster',
    buttonText: 'See the Dinner Menu',
    buttonLink: 'menu-dinner.html',
    photo:      null,
  },
  {
    label:      'Drink Special',
    title:      'Tiki Shack Punch',
    description: "House rum, fresh OJ, pineapple and grenadine — served on the rocks with a toasted coconut rim.",
    price:      '$8',
    marketPrice: false,
    tag:        'Shack Favorite',
    icon:       'cocktail',
    buttonText: 'See the Drinks Menu',
    buttonLink: 'menu-drinks.html',
    photo:      null,
  },
  {
    label:      'Fresh Catch Today',
    title:      'Market Fish Board',
    description: "What's in depends on what came off the boat. Ask us — we'll cook it however you like.",
    price:      '',
    marketPrice: true,
    tag:        'Fresh Catch Feature',
    icon:       'wave',
    buttonText: 'Check Fresh Catch',
    buttonLink: 'fresh-catch.html',
    photo:      null,
  },
];

function renderDailySpecials() {
  const section = document.getElementById('daily-specials');
  const grid    = document.getElementById('ds-grid');
  if (!section || !grid) return;

  /* Use Sanity data if it loaded (even if empty array).
     Fall back to DS_FALLBACK only if Sanity fetch failed entirely (null). */
  const sanityLoaded = CMS.dailySpecials !== undefined && CMS.dailySpecials !== null;
  const raw    = sanityLoaded ? CMS.dailySpecials : DS_FALLBACK;
  const active = raw.filter(s => s.active !== false);

  /* Zero active → hide entire section */
  if (!active.length) {
    section.classList.add('ds-empty');
    return;
  }
  section.classList.remove('ds-empty');

  /* Set grid column layout via data attribute */
  grid.dataset.count = String(Math.min(active.length, 4));

  /* Build cards */
  grid.innerHTML = active.slice(0, 4).map(s => {
    const icon     = DS_ICONS[s.icon] || DS_ICONS.fish;
    const badgeTag = s.tag || 'Today Only';

    const photoHtml = s.photo
      ? `<div class="ds-card-photo">
           <img src="${s.photo}" alt="${s.title}" loading="lazy" width="600" height="340"/>
         </div>`
      : '';

    const priceHtml = s.marketPrice
      ? `<span class="ds-card-market">Market Price</span>`
      : s.price
        ? `<span class="ds-card-price">${s.price}</span>`
        : '';

    const btnHtml = s.buttonText && s.buttonLink
      ? `<a href="${s.buttonLink}" class="ds-card-btn">${s.buttonText}</a>`
      : '';

    const priceRowHtml = (priceHtml || btnHtml)
      ? `<div class="ds-card-price-row">${priceHtml}${btnHtml}</div>`
      : '';

    return `
      <article class="ds-card reveal" role="listitem">
        <span class="ds-badge" aria-label="${badgeTag}">${badgeTag}</span>
        ${photoHtml}
        ${icon}
        <span class="ds-card-label">${s.label || 'Daily Special'}</span>
        <div class="ds-card-rope" aria-hidden="true">
          <span class="ds-card-rope-anchor">⚓</span>
        </div>
        <h3 class="ds-card-name">${s.title}</h3>
        ${s.description ? `<p class="ds-card-desc">${s.description}</p>` : ''}
        ${priceRowHtml}
      </article>
    `;
  }).join('');

  initReveal(grid);
}
