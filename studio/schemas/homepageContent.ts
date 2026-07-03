import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepageContent',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'today', title: "Today's Updates" },
  ],
  fields: [
    // Announcement Bar
    defineField({
      name: 'announcementMessages',
      title: 'Scrolling Announcement Bar Messages',
      description: 'Each line scrolls across the top of the site',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // Hero
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 2,
    }),

    // Today — Special
    defineField({
      name: 'todaySpecialEyebrow',
      title: "Today's Special — Eyebrow Label",
      type: 'string',
      group: 'today',
    }),
    defineField({
      name: 'todaySpecialHeadline',
      title: "Today's Special — Headline",
      type: 'string',
      group: 'today',
    }),
    defineField({
      name: 'todaySpecialDescription',
      title: "Today's Special — Description",
      type: 'text',
      rows: 3,
      group: 'today',
    }),
    defineField({
      name: 'todaySpecialTag',
      title: "Today's Special — Tag",
      type: 'string',
      group: 'today',
    }),

    // Today — Bar
    defineField({
      name: 'todayBarEyebrow',
      title: 'At the Bar — Eyebrow Label',
      type: 'string',
      group: 'today',
    }),
    defineField({
      name: 'todayBarHeadline',
      title: 'At the Bar — Headline',
      type: 'string',
      group: 'today',
    }),
    defineField({
      name: 'todayBarDescription',
      title: 'At the Bar — Description',
      type: 'text',
      rows: 3,
      group: 'today',
    }),
    defineField({
      name: 'todayBarTag',
      title: 'At the Bar — Tag',
      type: 'string',
      group: 'today',
    }),

    // Today — Stage
    defineField({
      name: 'todayStageEyebrow',
      title: 'On Stage — Eyebrow Label',
      type: 'string',
      group: 'today',
    }),
    defineField({
      name: 'todayStageHeadline',
      title: 'On Stage — Headline',
      type: 'string',
      group: 'today',
    }),
    defineField({
      name: 'todayStageDescription',
      title: 'On Stage — Description',
      type: 'text',
      rows: 3,
      group: 'today',
    }),
    defineField({
      name: 'todayStageTag',
      title: 'On Stage — Tag',
      type: 'string',
      group: 'today',
    }),

    // CTAs
    defineField({
      name: 'ctaLabel1',
      title: 'Button 1 Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl1',
      title: 'Button 1 Link',
      type: 'string',
    }),
    defineField({
      name: 'ctaLabel2',
      title: 'Button 2 Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl2',
      title: 'Button 2 Link',
      type: 'string',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({ name: 'pageTitle',       title: 'Page Title',        type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta Description',  type: 'text', rows: 2 }),
        defineField({ name: 'ogImage',         title: 'Social Share Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
  ],
})
