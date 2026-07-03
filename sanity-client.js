/**
 * TONIO'S — SANITY CMS CLIENT
 * ============================
 * Browser-compatible script that fetches live content from Sanity CMS
 * and merges it into the global CMS object (defined in cms-data.js).
 *
 * HOW IT WORKS:
 * 1. cms-data.js always loads first with fallback/default content.
 * 2. This script runs after and overwrites sections with live Sanity data.
 * 3. If Sanity is unreachable (no internet, project not set up yet), the
 *    site falls back gracefully to the data in cms-data.js — nothing breaks.
 *
 * SETUP:
 * After you run `npx sanity@latest init` in the studio/ folder, replace
 * YOUR_PROJECT_ID_HERE below with your real Sanity project ID.
 */

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG — replace after running sanity init
// ─────────────────────────────────────────────────────────────────────────────
const SANITY_PROJECT_ID = '3laoz40d';
const SANITY_DATASET    = 'production';

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch a GROQ query from the Sanity CDN.
 * Returns the result array/object, or null on failure.
 */
async function fetchSanityData(query) {
  if (!SANITY_PROJECT_ID || SANITY_PROJECT_ID === 'YOUR_PROJECT_ID_HERE') {
    return null; // Not configured yet — silent skip
  }
  try {
    const encoded = encodeURIComponent(query);
    const url = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}?query=${encoded}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    return json.result ?? null;
  } catch (err) {
    console.warn('[Sanity] Fetch failed, using fallback data:', err.message);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Image URL helper
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert a Sanity image reference object into a CDN URL.
 * Returns null if asset is missing.
 */
function sanityImageUrl(imageObj, width) {
  if (!imageObj || !imageObj.asset || !imageObj.asset._ref) return null;
  const ref = imageObj.asset._ref; // e.g. "image-abc123-800x600-jpg"
  const [, id, dimensions, ext] = ref.split('-');
  const baseUrl = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${ext}`;
  return width ? `${baseUrl}?w=${width}&auto=format` : baseUrl;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main loader
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all CMS content from Sanity and merge into the global CMS object.
 * Called automatically when the page loads (see bottom of file).
 */
async function loadCMSFromSanity() {
  // Run all queries in parallel for speed
  const [
    homepage,
    dailySpecials,
    freshCatchItems,
    freshCatchSettingsData,
    upcomingEvents,
    settings,
    brandingData,
    sushiRolls,
    pastaItems,
    newsletterSettingsData,
  ] = await Promise.all([
    fetchSanityData(`*[_type == "homepageContent"][0]`),
    fetchSanityData(`*[_type == "dailySpecial" && active != false] | order(sortOrder asc) { _id, title, label, description, price, marketPrice, tag, icon, buttonText, buttonLink, photo, dayOfWeek, active, sortOrder }`),
    fetchSanityData(`*[_type == "freshCatchItem" && active != false] | order(sortOrder asc, _createdAt asc) { _id, name, description, status, priceType, fixedPrice, featured, freshnessBadge, prepOptions, photo, active, sortOrder }`),
    fetchSanityData(`*[_type == "freshCatchSettings"][0]`),
    fetchSanityData(
      `*[_type == "liveEvent" && active != false] | order(date asc, sortOrder asc)[0...50] { _id, title, performer, musicianRef->{ name, bio, photo, instagram, website, genre }, eventType, date, time, endTime, description, cover, coverPrice, featured, cancelled, photo, buttonText, buttonLink, active, sortOrder }`
    ),
    fetchSanityData(`*[_type == "siteSettings"][0]`),
    fetchSanityData(`*[_type == "branding"][0]`),
    fetchSanityData(`*[_type == "sushiRoll"] | order(sortOrder asc)`),
    fetchSanityData(`*[_type == "pastaItem"] | order(sortOrder asc)`),
    fetchSanityData(`*[_type == "newsletterSettings"][0]{ showSection, eyebrow, headline, subheadline, tagline, buttonText, successTitle, successBody, backgroundImage }`),
  ]);

  // Make sure CMS object exists (cms-data.js should have created it already)
  if (typeof CMS === 'undefined') {
    console.warn('[Sanity] CMS global not found — skipping merge');
    return;
  }

  // ── Homepage Content ─────────────────────────────────────────────────────
  if (homepage) {
    // Announcement bar messages
    if (homepage.announcementMessages && homepage.announcementMessages.length) {
      CMS.announcement.messages = homepage.announcementMessages;
    }

    // Hero
    if (homepage.heroHeadline)     CMS.hero = CMS.hero || {};
    if (homepage.heroHeadline)     CMS.hero.headline    = homepage.heroHeadline;
    if (homepage.heroSubheadline)  CMS.hero.subheadline = homepage.heroSubheadline;

    // Today panels
    if (homepage.todaySpecialHeadline || homepage.todaySpecialDescription) {
      if (homepage.todaySpecialEyebrow)    CMS.today.special.eyebrow     = homepage.todaySpecialEyebrow;
      if (homepage.todaySpecialHeadline)   CMS.today.special.headline    = homepage.todaySpecialHeadline;
      if (homepage.todaySpecialDescription) CMS.today.special.description = homepage.todaySpecialDescription;
      if (homepage.todaySpecialTag)        CMS.today.special.tag         = homepage.todaySpecialTag;
    }
    if (homepage.todayBarHeadline || homepage.todayBarDescription) {
      if (homepage.todayBarEyebrow)    CMS.today.bar.eyebrow     = homepage.todayBarEyebrow;
      if (homepage.todayBarHeadline)   CMS.today.bar.headline    = homepage.todayBarHeadline;
      if (homepage.todayBarDescription) CMS.today.bar.description = homepage.todayBarDescription;
      if (homepage.todayBarTag)        CMS.today.bar.tag         = homepage.todayBarTag;
    }
    if (homepage.todayStageHeadline || homepage.todayStageDescription) {
      if (homepage.todayStageEyebrow)    CMS.today.stage.eyebrow     = homepage.todayStageEyebrow;
      if (homepage.todayStageHeadline)   CMS.today.stage.headline    = homepage.todayStageHeadline;
      if (homepage.todayStageDescription) CMS.today.stage.description = homepage.todayStageDescription;
      if (homepage.todayStageTag)        CMS.today.stage.tag         = homepage.todayStageTag;
    }

    // CTAs
    if (homepage.ctaLabel1 || homepage.ctaUrl1) {
      CMS.cta = CMS.cta || {};
      if (homepage.ctaLabel1) CMS.cta.label1 = homepage.ctaLabel1;
      if (homepage.ctaUrl1)   CMS.cta.url1   = homepage.ctaUrl1;
      if (homepage.ctaLabel2) CMS.cta.label2 = homepage.ctaLabel2;
      if (homepage.ctaUrl2)   CMS.cta.url2   = homepage.ctaUrl2;
    }
  }

  // ── Site Settings ────────────────────────────────────────────────────────
  if (settings) {
    if (typeof settings.announcementActive === 'boolean') {
      CMS.announcement.active = settings.announcementActive;
    }
    if (settings.happyHourDays)  CMS.happyHour.days = settings.happyHourDays;
    if (settings.happyHourTime)  CMS.happyHour.time = settings.happyHourTime;
    if (settings.happyHourDeals && settings.happyHourDeals.length) {
      CMS.happyHour.deals = settings.happyHourDeals;
    }
    if (settings.locationAddress) CMS.location.address = settings.locationAddress;
    if (settings.locationPhone)   CMS.location.phone   = settings.locationPhone;
    if (settings.locationParking) CMS.location.parking = settings.locationParking;
    if (settings.instagramUrl)    CMS.social.instagram  = settings.instagramUrl;
    if (settings.facebookUrl)     CMS.social.facebook   = settings.facebookUrl;
    if (settings.tiktokUrl)       CMS.social.tiktok     = settings.tiktokUrl;
    if (settings.freshCatchNote)        CMS.freshCatch.note        = settings.freshCatchNote;
    if (settings.freshCatchLastUpdated) CMS.freshCatch.lastUpdated = settings.freshCatchLastUpdated;
  }

  // ── Daily Specials ────────────────────────────────────────────────────────
  if (dailySpecials && dailySpecials.length) {
    CMS.dailySpecials = dailySpecials.map(s => ({
      id:          s._id,
      label:       s.label || s.dayOfWeek || 'Daily Special',
      title:       s.title,
      description: s.description || '',
      price:       s.price || '',
      marketPrice: s.marketPrice || false,
      tag:         s.tag || 'Today Only',
      icon:        s.icon || 'fish',
      buttonText:  s.buttonText || '',
      buttonLink:  s.buttonLink || '',
      photo:       sanityImageUrl(s.photo, 800),
      active:      s.active !== false,
      sortOrder:   s.sortOrder || 99,
    }));
  }

  // ── Fresh Catch ───────────────────────────────────────────────────────────
  if (freshCatchItems && freshCatchItems.length) {
    CMS.freshCatch.items = freshCatchItems.map(item => {
      const rawStatus = item.status || 'in-stock';
      // Map old values (available/coming-soon) and new values to display status
      const statusMap = {
        'available':  'in',
        'in-stock':   'in',
        'limited':    'limited',
        'sold-out':   'out',
        'call':       'call',
        'seasonal':   'seasonal',
        'coming-soon':'seasonal',
      };
      const priceNote = item.priceType === 'fixed'  ? (item.fixedPrice || '')
                      : item.priceType === 'call'   ? 'Call for Price'
                      : 'Market Price';
      return {
        // Homepage-compatible fields — keep unchanged
        name:     item.name,
        status:   statusMap[rawStatus] || 'call',
        note:     priceNote,
        photo:    sanityImageUrl(item.photo, 600),
        featured: item.featured || false,
        // Extended fields for Fresh Catch page
        description:    item.description || '',
        freshnessBadge: item.freshnessBadge || '',
        prepOptions:    item.prepOptions || [],
        priceType:      item.priceType || 'market',
        rawStatus,
      };
    });
  }

  // ── Fresh Catch Settings ───────────────────────────────────────────────────
  if (freshCatchSettingsData) {
    CMS.freshCatchSettings = {
      headline:    freshCatchSettingsData.headline    || 'Fresh Catch Market',
      subheadline: freshCatchSettingsData.subheadline || 'Straight from the dock. Updated daily.',
      topNote:     freshCatchSettingsData.topNote     || '',
      lastUpdated: freshCatchSettingsData.lastUpdated || 'Today',
      showPage:    freshCatchSettingsData.showPage !== false,
    };
    // Also update the note + lastUpdated on the freshCatch object
    if (freshCatchSettingsData.topNote)     CMS.freshCatch.note        = freshCatchSettingsData.topNote;
    if (freshCatchSettingsData.lastUpdated) CMS.freshCatch.lastUpdated = freshCatchSettingsData.lastUpdated;
  }

  // ── Newsletter Settings ───────────────────────────────────────────────────
  if (newsletterSettingsData) {
    const ns = newsletterSettingsData;
    CMS.newsletterSettings = {
      showSection:  ns.showSection  !== false,
      eyebrow:      ns.eyebrow      || 'Stay in the Loop',
      headline:     ns.headline     || "Never Miss What's Fresh at Tonio's",
      subheadline:  ns.subheadline  || '',
      tagline:      ns.tagline      || '',
      buttonText:   ns.buttonText   || 'JOIN THE SHACK LIST',
      successTitle: ns.successTitle || 'Welcome to the Shack!',
      successBody:  ns.successBody  || '',
    };
    const section = document.getElementById('vip-signup');
    if (section) {
      if (!CMS.newsletterSettings.showSection) {
        section.hidden = true;
      } else {
        section.hidden = false;
        const eyebrowEl = section.querySelector('.vip-eyebrow');
        const h2        = section.querySelector('.vip-h2');
        const subEls    = section.querySelectorAll('.vip-sub');
        const btnText   = section.querySelector('#vip-btn-text');
        const succTitle = section.querySelector('.vip-success-title');
        const succBody  = section.querySelector('.vip-success-body');
        if (eyebrowEl && ns.eyebrow)      eyebrowEl.textContent = ns.eyebrow;
        if (h2        && ns.headline)     h2.textContent        = ns.headline;
        if (subEls[0] && ns.subheadline)  subEls[0].textContent = ns.subheadline;
        if (subEls[1] && ns.tagline)      subEls[1].textContent = ns.tagline;
        if (btnText   && ns.buttonText)   btnText.textContent   = ns.buttonText;
        if (succTitle && ns.successTitle) succTitle.textContent = ns.successTitle;
        if (succBody  && ns.successBody)  succBody.textContent  = ns.successBody;
        // Background image override
        if (ns.backgroundImage && ns.backgroundImage.asset) {
          const bgImg = section.querySelector('.vip-bg-img');
          if (bgImg) bgImg.src = sanityImageUrl(ns.backgroundImage, 1600) || bgImg.src;
        }
      }
    }
  }

  // ── Live Events ───────────────────────────────────────────────────────────
  if (upcomingEvents && upcomingEvents.length) {
    const coverLabel = (c) =>
      c === 'charge' ? 'Cover Charge'
      : c === 'call' ? 'Call to Confirm'
      : 'No Cover';

    CMS.events = upcomingEvents.map(evt => {
      const m = evt.musicianRef || null;
      // Performer name: manual override → musician name → fallback
      const performerName = evt.performer || (m && m.name) || '';
      // Photo: event photo → musician photo → null
      const photoUrl = sanityImageUrl(evt.photo, 800) || (m ? sanityImageUrl(m.photo, 800) : null);
      return {
        id:          evt._id,
        active:      evt.active !== false,
        cancelled:   evt.cancelled || false,
        name:        evt.title,
        type:        evt.eventType || 'Live Music',
        performer:   performerName,
        date:        evt.date,
        time:        evt.time || '8:00 PM',
        endTime:     evt.endTime || '',
        description: evt.description || (m && m.bio) || '',
        cover:       coverLabel(evt.cover),
        coverRaw:    evt.cover || 'no-cover',
        coverPrice:  evt.coverPrice || '',
        photo:       photoUrl,
        featured:    evt.featured || false,
        buttonText:  evt.buttonText || '',
        buttonLink:  evt.buttonLink || (m && m.instagram) || '',
        // Musician extras (for future use)
        musicianInstagram: m ? m.instagram || '' : '',
        musicianWebsite:   m ? m.website   || '' : '',
        genre:             m ? m.genre     || '' : '',
      };
    });

    // All events from today forward (for the live music page calendar)
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    CMS._upcomingEvents = CMS.events.filter(e => {
      if (!e.active || e.cancelled) return false;
      return new Date(e.date + 'T12:00:00') >= now;
    });
    // Full list including past events (for calendar nav)
    CMS._allEvents = CMS.events.filter(e => e.active && !e.cancelled);
  }

  // ── Sushi Rolls ───────────────────────────────────────────────────────────
  if (sushiRolls && sushiRolls.length) {
    CMS.sushiRolls = sushiRolls.map(r => ({
      id:          r._id,
      name:        r.name,
      ingredients: r.ingredients || '',
      price:       r.price || '',
      photo:       sanityImageUrl(r.photo, 600),
      featured:    r.featured || false,
    }));
  }

  // ── Pasta Items ───────────────────────────────────────────────────────────
  if (pastaItems && pastaItems.length) {
    CMS.pastaItems = pastaItems.map(p => ({
      id:          p._id,
      name:        p.name,
      description: p.description || '',
      price:       p.price || '',
      photo:       sanityImageUrl(p.photo, 600),
      comingSoon:  p.comingSoon || false,
    }));
  }

  // ── Branding ──────────────────────────────────────────────────────────────
  if (brandingData) {
    CMS.branding = {
      mainLogoUrl:    sanityImageUrl(brandingData.mainLogo, 400),
      footerLogoUrl:  sanityImageUrl(brandingData.footerLogo, 400),
      faviconUrl:     sanityImageUrl(brandingData.favicon, 64),
      primaryColor:   brandingData.primaryColor   || null,
      secondaryColor: brandingData.secondaryColor || null,
    };
  }

  // Dispatch an event so scripts can react when Sanity data is ready
  document.dispatchEvent(new CustomEvent('sanityLoaded', { detail: CMS }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Auto-run on page load
// ─────────────────────────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCMSFromSanity);
} else {
  loadCMSFromSanity();
}
