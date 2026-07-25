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
    crabDayItemsData,
    wingsDayItemsData,
    newsletterSettingsData,
    galleryPhotosData,
    sitePhotosData,
    pageVisibilityData,
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
    fetchSanityData(`*[_type == "crabDayItem"] | order(sortOrder asc)`),
    fetchSanityData(`*[_type == "wingsDayItem"] | order(sortOrder asc)`),
    fetchSanityData(`*[_type == "newsletterSettings"][0]{ showSection, eyebrow, headline, subheadline, tagline, buttonText, successTitle, successBody, backgroundImage }`),
    fetchSanityData(`*[_type == "galleryPhoto" && visible != false] | order(sortOrder asc, _createdAt asc) { _id, photo, caption, category, featured, sortOrder }`),
    fetchSanityData(`*[_type == "sitePhotos"][0]`),
    fetchSanityData(`*[_type == "pageVisibility"][0]`),
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
    CMS.hero = CMS.hero || {};
    if (homepage.heroStamp)       CMS.hero.stamp      = homepage.heroStamp;
    if (homepage.heroHeadline)    CMS.hero.headline   = homepage.heroHeadline;
    if (homepage.heroSubheadline) CMS.hero.subheadline = homepage.heroSubheadline;
    if (homepage.heroCta1Label)   CMS.hero.ctaLabel1  = homepage.heroCta1Label;
    if (homepage.heroCta1Url)     CMS.hero.ctaUrl1    = homepage.heroCta1Url;
    if (homepage.heroCta2Label)   CMS.hero.ctaLabel2  = homepage.heroCta2Label;
    if (homepage.heroCta2Url)     CMS.hero.ctaUrl2    = homepage.heroCta2Url;

    // Intro section
    CMS.intro = CMS.intro || {};
    if (homepage.introHeadline)  CMS.intro.headline  = homepage.introHeadline;
    if (homepage.introBody)      CMS.intro.body      = homepage.introBody;
    if (homepage.introCtaLabel)  CMS.intro.ctaLabel  = homepage.introCtaLabel;
    if (homepage.introCtaUrl)    CMS.intro.ctaUrl    = homepage.introCtaUrl;

    // Fresh Catch teaser
    CMS.catchTeaser = CMS.catchTeaser || {};
    if (homepage.catchTeaserHeadline)  CMS.catchTeaser.headline  = homepage.catchTeaserHeadline;
    if (homepage.catchTeaserCookLabel) CMS.catchTeaser.cookLabel = homepage.catchTeaserCookLabel;
    if (homepage.catchTeaserBody)      CMS.catchTeaser.body      = homepage.catchTeaserBody;
    if (homepage.catchTeaserCta1Label) CMS.catchTeaser.cta1Label = homepage.catchTeaserCta1Label;
    if (homepage.catchTeaserCta2Label) CMS.catchTeaser.cta2Label = homepage.catchTeaserCta2Label;

    // Crew section
    CMS.crew = CMS.crew || {};
    if (homepage.crewEyebrow)  CMS.crew.eyebrow  = homepage.crewEyebrow;
    if (homepage.crewHeadline) CMS.crew.headline = homepage.crewHeadline;
    if (homepage.crewBody)     CMS.crew.body     = homepage.crewBody;
    if (homepage.crewCtaLabel) CMS.crew.ctaLabel = homepage.crewCtaLabel;
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

  // ── Crab Day Items ────────────────────────────────────────────────────────
  if (crabDayItemsData && crabDayItemsData.length) {
    CMS.crabDayItems = crabDayItemsData.map(c => ({
      id:          c._id,
      name:        c.name,
      description: c.description || '',
      price:       c.price || '',
      photo:       sanityImageUrl(c.photo, 600),
      featured:    c.featured || false,
    }));
  }

  // ── Wings Day Items ───────────────────────────────────────────────────────
  if (wingsDayItemsData && wingsDayItemsData.length) {
    CMS.wingsDayItems = wingsDayItemsData.map(w => ({
      id:          w._id,
      name:        w.name,
      description: w.description || '',
      price:       w.price || '',
      photo:       sanityImageUrl(w.photo, 600),
      featured:    w.featured || false,
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

  // ── Site Photos ───────────────────────────────────────────────────────────
  if (sitePhotosData) {
    const sp = sitePhotosData;
    // Helper: set background-image on an element by ID
    function setBg(id, imageObj, width) {
      const url = sanityImageUrl(imageObj, width);
      if (!url) return;
      const el = document.getElementById(id);
      if (el) el.style.backgroundImage = `url('${url}')`;
    }
    // Helper: set src on an <img> by ID
    function setImg(id, imageObj, width) {
      const url = sanityImageUrl(imageObj, width);
      if (!url) return;
      const el = document.getElementById(id);
      if (el) el.src = url;
    }

    // Homepage
    if (sp.heroBackground)   setBg('hero-bg-photo',   sp.heroBackground,   1920);
    if (sp.introPhoto)       setBg('intro-bg-photo',   sp.introPhoto,       1200);
    if (sp.menusTeaserPhoto) setBg('menus-bg-photo',   sp.menusTeaserPhoto, 1400);
    if (sp.catchTeaserPhoto) setImg('catch-main-photo', sp.catchTeaserPhoto, 1400);
    if (sp.crewPhoto)        setImg('crew-bg-photo',    sp.crewPhoto,        1400);
    if (sp.newsletterBg) {
      const bgImg = document.querySelector('.vip-bg-img');
      const url = sanityImageUrl(sp.newsletterBg, 1600);
      if (bgImg && url) bgImg.src = url;
    }

    // Store for page-specific scripts to use
    CMS.sitePhotos = {
      visitHeroPhoto:  sanityImageUrl(sp.visitHeroPhoto,  1400),
      visitDockPhoto:  sanityImageUrl(sp.visitDockPhoto,  1200),
      visitViewPhoto:  sanityImageUrl(sp.visitViewPhoto,  1200),
      visitRegulars1:  sanityImageUrl(sp.visitRegulars1,  800),
      visitRegulars2:  sanityImageUrl(sp.visitRegulars2,  800),
      musicPhoto1:     sanityImageUrl(sp.musicPhoto1,     1200),
      musicPhoto2:     sanityImageUrl(sp.musicPhoto2,     1400),
      musicPhoto3:     sanityImageUrl(sp.musicPhoto3,     1200),
      musicPhoto4:     sanityImageUrl(sp.musicPhoto4,     800),
      crewPageHero:    sanityImageUrl(sp.crewPageHero,    1600),
      marketPhoto:     sanityImageUrl(sp.marketPhoto,     800),
      marketExterior:  sanityImageUrl(sp.marketExterior,  800),
    };

    // Apply to any page-specific elements present on the current page
    const pagePhotos = [
      ['visit-hero-photo',  sp.visitHeroPhoto,  1400],
      ['visit-dock-photo',  sp.visitDockPhoto,  1200],
      ['visit-view-photo',  sp.visitViewPhoto,  1200],
      ['visit-regulars-1',  sp.visitRegulars1,  800],
      ['visit-regulars-2',  sp.visitRegulars2,  800],
      ['music-photo-1',     sp.musicPhoto1,     1200],
      ['music-photo-2',     sp.musicPhoto2,     1400],
      ['music-photo-3',     sp.musicPhoto3,     1200],
      ['music-photo-4',     sp.musicPhoto4,     800],
      ['crew-page-hero',    sp.crewPageHero,    1600],
      ['market-photo',      sp.marketPhoto,     800],
      ['market-exterior',   sp.marketExterior,  800],
    ];
    pagePhotos.forEach(([id, obj, w]) => {
      if (obj) {
        const el = document.getElementById(id);
        if (el) {
          if (el.tagName === 'IMG') setImg(id, obj, w);
          else setBg(id, obj, w);
        }
      }
    });
  }

  // ── Gallery Photos ────────────────────────────────────────────────────────
  if (galleryPhotosData && galleryPhotosData.length) {
    CMS.galleryPhotos = galleryPhotosData.map(p => ({
      id:       p._id,
      photo:    sanityImageUrl(p.photo, 1200),
      caption:  p.caption  || '',
      category: p.category || 'food',
      featured: p.featured || false,
    })).filter(p => p.photo);
  }

  // ── Page Visibility ───────────────────────────────────────────────────────
  if (pageVisibilityData) {
    CMS.pageVisibility = pageVisibilityData;

    // Hide nav links to pages that are toggled off
    const pageNavMap = {
      meetTheCrew: 'meet-the-crew.html',
      menuBreakfast: 'menu-breakfast.html',
      menuLunch: 'menu-lunch.html',
      menuDinner: 'menu-dinner.html',
      menuDrinks: 'menu-drinks.html',
      menuHappyHour: 'menu-happy-hour.html',
      specialMenus: 'special-menus.html',
      freshCatch: 'fresh-catch.html',
      liveMusic: 'live-music.html',
      gallery: 'gallery.html',
      shopTheShack: 'shop-the-shack.html',
      visit: 'visit.html',
      faq: 'faq.html',
    };
    Object.entries(pageNavMap).forEach(([key, href]) => {
      if (pageVisibilityData[key] === false) {
        document.querySelectorAll(`a[href="${href}"]`).forEach(el => {
          el.style.display = 'none';
        });
      }
    });
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
