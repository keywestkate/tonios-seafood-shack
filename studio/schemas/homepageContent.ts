import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepageContent',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'announcement', title: '📢 Announcement Bar' },
    { name: 'hero',         title: '🏠 Hero' },
    { name: 'intro',        title: '🏡 Intro Section' },
    { name: 'catchTeaser',  title: '🐟 Fresh Catch Teaser' },
    { name: 'crew',         title: '👥 Crew Section' },
    { name: 'seo',          title: '🔍 SEO' },
  ],
  fields: [

    // ── ANNOUNCEMENT BAR ─────────────────────────────────────────────────────
    defineField({
      name: 'announcementMessages',
      title: 'Scrolling Messages',
      description: 'Each line scrolls across the top bar. Keep them short and punchy.',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'announcement',
    }),

    // ── HERO ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroStamp',
      title: 'Stamp Text',
      description: 'Small label above the headline — e.g. "Fresh Catch Daily · Mile Marker 25"',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Headline',
      description: 'Main hero headline (currently: Seafood. Cold Drinks. Good Trouble.)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Subheadline',
      description: 'Paragraph below the headline',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroCta1Label',
      title: 'Button 1 — Label',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta1Url',
      title: 'Button 1 — Link',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta2Label',
      title: 'Button 2 — Label',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta2Url',
      title: 'Button 2 — Link',
      type: 'string',
      group: 'hero',
    }),

    // ── INTRO SECTION ────────────────────────────────────────────────────────
    defineField({
      name: 'introHeadline',
      title: 'Headline',
      description: 'Currently: "THE SHACK AT MILE MARKER 25"',
      type: 'string',
      group: 'intro',
    }),
    defineField({
      name: 'introBody',
      title: 'Body Text',
      description: 'The paragraph below the intro headline',
      type: 'text',
      rows: 3,
      group: 'intro',
    }),
    defineField({
      name: 'introCtaLabel',
      title: 'Button Label',
      type: 'string',
      group: 'intro',
    }),
    defineField({
      name: 'introCtaUrl',
      title: 'Button Link',
      type: 'string',
      group: 'intro',
    }),

    // ── FRESH CATCH TEASER ───────────────────────────────────────────────────
    defineField({
      name: 'catchTeaserHeadline',
      title: 'Headline',
      description: 'Currently: "WHAT CAME OFF THE BOAT?"',
      type: 'string',
      group: 'catchTeaser',
    }),
    defineField({
      name: 'catchTeaserCookLabel',
      title: '"Cook Your Catch" Label',
      description: 'Currently: "WE COOK YOUR CATCH!"',
      type: 'string',
      group: 'catchTeaser',
    }),
    defineField({
      name: 'catchTeaserBody',
      title: 'Body Text',
      type: 'text',
      rows: 3,
      group: 'catchTeaser',
    }),
    defineField({
      name: 'catchTeaserCta1Label',
      title: 'Button 1 — Label',
      type: 'string',
      group: 'catchTeaser',
    }),
    defineField({
      name: 'catchTeaserCta2Label',
      title: 'Button 2 — Label',
      type: 'string',
      group: 'catchTeaser',
    }),

    // ── CREW SECTION ─────────────────────────────────────────────────────────
    defineField({
      name: 'crewEyebrow',
      title: 'Eyebrow Text',
      description: 'Currently: "The People Behind the Shack"',
      type: 'string',
      group: 'crew',
    }),
    defineField({
      name: 'crewHeadline',
      title: 'Headline',
      description: 'Currently: "MEET THE CREW"',
      type: 'string',
      group: 'crew',
    }),
    defineField({
      name: 'crewBody',
      title: 'Body Text',
      type: 'text',
      rows: 2,
      group: 'crew',
    }),
    defineField({
      name: 'crewCtaLabel',
      title: 'Button Label',
      type: 'string',
      group: 'crew',
    }),

    // ── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'pageTitle',       title: 'Page Title',         type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta Description',   type: 'text', rows: 2 }),
        defineField({ name: 'ogImage',         title: 'Social Share Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
  ],
})
