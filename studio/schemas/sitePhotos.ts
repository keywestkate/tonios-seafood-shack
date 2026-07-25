import { defineType, defineField } from 'sanity'

const photo = (name: string, title: string, description: string) =>
  defineField({ name, title, description, type: 'image', options: { hotspot: true } })

export default defineType({
  name: 'sitePhotos',
  title: 'Site Photos',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'homepage', title: '🏠 Homepage' },
    { name: 'visit',    title: '📍 Visit Page' },
    { name: 'music',    title: '🎸 Live Music Page' },
    { name: 'crew',     title: '👥 Crew Page' },
    { name: 'market',   title: '🐟 Fresh Catch Page' },
  ],
  fields: [

    // ── HOMEPAGE ──────────────────────────────────────────────────────────────
    photo('heroBackground',    'Hero — Background Photo',          'Large photo behind the hero section (right side). Currently: exterior of the Shack.'),
    photo('introPhoto',        'Intro — Section Photo',            'Photo in the "THE SHACK AT MILE MARKER 25" section.'),
    photo('menusTeaserPhoto',  'Menus Teaser — Background Photo',  'Background behind the "COME HUNGRY" menus section.'),
    photo('catchTeaserPhoto',  'Fresh Catch Teaser — Main Photo',  'The plated fish photo in the "WHAT CAME OFF THE BOAT?" section.'),
    photo('crewPhoto',         'Crew Section — Background Photo',  'Background photo behind the "MEET THE CREW" section on the homepage.'),
    photo('newsletterBg',      'Newsletter — Background Photo',    'Background behind the "Stay in the Loop" signup section.'),

    // ── VISIT PAGE ────────────────────────────────────────────────────────────
    photo('visitHeroPhoto',    'Visit — Hero Photo',               'Main exterior photo at the top of the Visit page.'),
    photo('visitDockPhoto',    'Visit — Dock/Waterfront Photo',    'Dockside photo on the Visit page.'),
    photo('visitViewPhoto',    'Visit — View Photo',               'Waterfront view photo on the Visit page.'),
    photo('visitRegulars1',    'Visit — Regulars Photo 1',         'Photo of guests/regulars at the Shack.'),
    photo('visitRegulars2',    'Visit — Regulars Photo 2',         'Second photo of guests/regulars at the Shack.'),

    // ── LIVE MUSIC PAGE ───────────────────────────────────────────────────────
    photo('musicPhoto1',       'Live Music — Photo 1',             'First live music photo on the music page.'),
    photo('musicPhoto2',       'Live Music — Photo 2',             'Second live music photo / hero background.'),
    photo('musicPhoto3',       'Live Music — Photo 3',             'Third live music photo.'),
    photo('musicPhoto4',       'Live Music — Photo 4 (Pierce)',    'Pierce / featured performer photo.'),

    // ── CREW PAGE ─────────────────────────────────────────────────────────────
    photo('crewPageHero',      'Crew — Hero Photo',                'Background photo on the Crew page hero.'),

    // ── FRESH CATCH / MARKET ─────────────────────────────────────────────────
    photo('marketPhoto',       'Market — Main Photo',              'Fresh catch display or fish market photo.'),
    photo('marketExterior',    'Market — Exterior Photo',          'Exterior/building photo used on the Market page.'),
  ],
})
