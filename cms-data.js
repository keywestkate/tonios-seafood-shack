/**
 * TONIO'S SEAFOOD SHACK — CMS DATA FILE
 * ======================================
 * Edit this file to update the website without touching any code.
 * Save the file and upload it to your hosting provider.
 *
 * SECTIONS YOU CAN EDIT:
 *   - ANNOUNCEMENT BAR
 *   - TODAY AT TONIO'S panels
 *   - DAILY SPECIALS
 *   - HAPPY HOUR
 *   - LIVE MUSIC & EVENTS
 *   - HOURS
 *   - SOCIAL LINKS
 *   - APPAREL
 *   - MENUS
 */

const CMS = {

  // ─────────────────────────────────────────────
  // ANNOUNCEMENT BAR
  // ─────────────────────────────────────────────
  announcement: {
    active: true,
    messages: [
      "🐟 Today's Fresh Catch: Hogfish · Yellowtail Snapper · Local Shrimp",
      "🍺 Happy Hour Daily 3–6 PM — $4 drafts · $6 wells · $8 house cocktails",
      "🎸 Live Music Tonight · 8 PM · No Cover — follow us on social for tonight's lineup",
    ]
  },

  // ─────────────────────────────────────────────
  // TODAY AT TONIO'S — Three editorial panels
  // ─────────────────────────────────────────────
  today: {
    special: {
      eyebrow: "Today's Special",
      headline: "Grilled Hogfish Plate",
      description: "Fresh-caught hogfish from the reef, grilled with garlic butter, served with black beans, yellow rice and a cold slaw. $24",
      tag: "Fresh Off the Boat"
    },
    bar: {
      eyebrow: "At the Bar",
      headline: "Cold & Trouble",
      description: "The Keys Mule is on tap. Dark rum, fresh lime, ginger beer and a sprig of mint. Trouble never tasted this cold. $10",
      tag: "Drink of the Day"
    },
    stage: {
      eyebrow: "On Stage Tonight",
      headline: "Live Music Tonight",
      description: "Local Keys musicians, cold drinks and waterfront nights. 8 PM · No Cover. Get here early and get a seat before the dock fills up. Follow us on social for tonight's lineup.",
      tag: "Live Tonight · 8 PM"
    }
  },

  // ─────────────────────────────────────────────
  // HAPPY HOUR
  // ─────────────────────────────────────────────
  happyHour: {
    days: "Monday – Friday",
    time: "3:00 PM – 6:00 PM",
    deals: [
      { item: "Draft Beer", price: "$4" },
      { item: "House Wells", price: "$6" },
      { item: "House Cocktails", price: "$8" },
      { item: "Shrimp Basket", price: "$10" },
      { item: "Fish Tacos (2)", price: "$9" },
    ]
  },

  // ─────────────────────────────────────────────
  // LIVE MUSIC & EVENTS
  // ─────────────────────────────────────────────
  events: [
    {
      id: "evt-001",
      active: true,
      name: "Live Music Night",
      type: "Live Music",
      date: "2026-07-04",
      time: "8:00 PM",
      cover: "No Cover",
      description: "Fourth of July on the dock — live music, cold drinks and waterfront fireworks views. Follow us on social for tonight's lineup.",
      poster: null,
      featured: true,
      cancelled: false,
    },
    {
      id: "evt-002",
      active: true,
      name: "Live Music Night",
      type: "Weekly",
      date: "2026-07-08",
      time: "7:00 PM",
      cover: "No Cover",
      description: "Local Keys musicians, cold drinks and waterfront nights. Follow us on social for tonight's lineup.",
      poster: null,
      featured: false,
      cancelled: false,
    },
    {
      id: "evt-003",
      active: true,
      name: "Live Music Night",
      type: "Weekly",
      date: "2026-07-11",
      time: "8:00 PM",
      cover: "No Cover",
      description: "Local Keys musicians, cold drinks and waterfront nights. Follow us on social for tonight's lineup.",
      poster: null,
      featured: false,
      cancelled: false,
    },
    {
      id: "evt-004",
      active: true,
      name: "Live Music Night",
      type: "Special Event",
      date: "2026-07-18",
      time: "7:30 PM",
      cover: "No Cover",
      description: "Live music on the waterfront. Seafood specials all evening. Follow us on social for tonight's lineup.",
      poster: null,
      featured: true,
      cancelled: false,
    },
  ],

  // ─────────────────────────────────────────────
  // HOURS
  // ─────────────────────────────────────────────
  hours: [
    { day: "Monday",    open: "11:00 AM", close: "10:00 PM" },
    { day: "Tuesday",   open: "11:00 AM", close: "10:00 PM" },
    { day: "Wednesday", open: "11:00 AM", close: "11:00 PM" },
    { day: "Thursday",  open: "11:00 AM", close: "11:00 PM" },
    { day: "Friday",    open: "11:00 AM", close: "Midnight" },
    { day: "Saturday",  open: "10:00 AM", close: "Midnight" },
    { day: "Sunday",    open: "10:00 AM", close: "10:00 PM" },
  ],

  // ─────────────────────────────────────────────
  // LOCATION
  // ─────────────────────────────────────────────
  location: {
    name: "Tonio's Seafood Shack & Tiki Bar",
    address: "Mile Marker 25, Summerland Key, FL 33042",
    phone: "(305) 745-3322",
    phoneRaw: "3057453322",
    parking: "Free parking on-site. Overflow parking available at the adjacent lot. Golf carts welcome.",
    boatAccess: "Dockage available for small vessels. Call ahead to confirm slip availability.",
    mapsUrl: "https://maps.google.com/?q=Summerland+Key+FL",
  },

  // ─────────────────────────────────────────────
  // TODAY'S FRESH CATCH
  // ─────────────────────────────────────────────
  freshCatch: {
    available: true,
    lastUpdated: "Today, June 30",
    note: "Availability changes daily based on the boats, the weather, and what's biting.",
    items: [
      { name: "Key West Pink Shrimp",  status: "in",  note: "Market fresh today" },
      { name: "Stone Crab Claws",       status: "in",  note: "Seasonal · Limited" },
      { name: "Yellowtail Snapper",     status: "in",  note: "Local boats" },
      { name: "Black Grouper",          status: "in",  note: "Straight off the reef" },
      { name: "Mahi-Mahi",              status: "in",  note: "Gulf Stream" },
      { name: "Hogfish",                status: "in",  note: "Keys reef" },
      { name: "Local Lobster",          status: "out", note: "Out of season" },
      { name: "Conch",                  status: "call", note: "Call to check availability" },
    ],
    igHashtag: "#ToniosFreshCatch"
  },

  // ─────────────────────────────────────────────
  // SOCIAL LINKS
  // ─────────────────────────────────────────────
  social: {
    instagram: "https://www.instagram.com/toniosseafoodtiki/",
    facebook:  "https://www.facebook.com/ToniosTiki/",
    tiktok:    "https://www.tiktok.com/@toniostiki",
    website:   "https://www.toniostiki.com",
  },

  // ─────────────────────────────────────────────
  // APPAREL
  // ─────────────────────────────────────────────
  apparel: [
    {
      name: "Fishing Club Badge Tee",
      description: "Heavyweight cotton with our classic patch-style mark. Faded navy.",
      price: "$32",
      tag: "Best Seller"
    },
    {
      name: "Fresh Catch Full-Back Tee",
      description: "Bold market art on a natural cotton tee. Oversized fit.",
      price: "$38",
      tag: "New"
    },
    {
      name: "Cold Beer Koozie",
      description: "Neoprene koozie with our type-stack design. Keeps it cold like us.",
      price: "$10",
      tag: ""
    },
    {
      name: "MM25 Patch Hat",
      description: "Unstructured dad hat with embroidered Mile Marker 25 mark. Tan or Navy.",
      price: "$28",
      tag: "Fan Favorite"
    },
  ],

  // ─────────────────────────────────────────────
  // MENUS — headlines and descriptions
  // ─────────────────────────────────────────────
  menus: {
    breakfast: {
      title: "Breakfast & Brunch",
      tagline: "Morning on the water hits different.",
      url: "menu-breakfast.html"
    },
    lunch: {
      title: "Lunch",
      tagline: "Fresh catch, cold beer, midday sun.",
      url: "menu-lunch.html"
    },
    dinner: {
      title: "Dinner",
      tagline: "When the boats come in.",
      url: "menu-dinner.html"
    },
    drinks: {
      title: "Drinks",
      tagline: "Cold, stiff and unforgettable.",
      url: "menu-drinks.html"
    },
    happyHour: {
      title: "Happy Hour",
      tagline: "3–6 PM. You know what to do.",
      url: "menu-happy-hour.html"
    },
    special: {
      title: "Special Menus",
      tagline: "Holidays, events and the unexpected.",
      url: "special-menus.html"
    },
  }
};

// Auto-generate today's date label
CMS._today = new Date().toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

// Filter only active, non-cancelled, future events
CMS._upcomingEvents = CMS.events.filter(e => {
  if (!e.active || e.cancelled) return false;
  const eventDate = new Date(e.date);
  const now = new Date();
  now.setHours(0,0,0,0);
  return eventDate >= now;
}).sort((a, b) => new Date(a.date) - new Date(b.date));
