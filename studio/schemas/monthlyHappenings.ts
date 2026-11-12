import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'monthlyHappenings',
  title: "What's Happening This Month",
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to hide the whole section (shows right under the homepage hero).',
    }),
    defineField({
      name: 'howItWorks',
      title: 'How this works',
      type: 'string',
      readOnly: true,
      initialValue: '',
      description: 'The cards come from your events. Open Live Music & Events → Upcoming Events, open an event, and turn on "⭐ Show in What\'s Happening This Month" (up to 8 per month). The month name updates by itself on the 1st. See the list under Live Music & Events → "🏠 On Homepage This Month".',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: "What's Happening This Month",
    }),
    defineField({
      name: 'items',
      title: 'Extra Cards (things that are not calendar events)',
      type: 'array',
      description: 'Optional — e.g. "Weekly Specials". These show AFTER your featured events and only fill empty spots (8 cards total). Real events go in Live Music & Events instead.',
      validation: (Rule) => Rule.max(8),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'happening',
          title: 'Event',
          fields: [
            defineField({
              name: 'when',
              title: 'When',
              type: 'string',
              validation: (Rule) => Rule.required().max(40),
              description: 'Short date/time line, e.g. "Every Sunday · 9 AM" or "Sat Nov 14 · 7–10 PM"',
            }),
            defineField({
              name: 'title',
              title: 'Event Name',
              type: 'string',
              validation: (Rule) => Rule.required().max(50),
            }),
            defineField({
              name: 'detail',
              title: 'Short Detail (optional)',
              type: 'string',
              validation: (Rule) => Rule.max(90),
              description: 'One short line, e.g. "Live on the outdoor stage"',
            }),
            defineField({
              name: 'photo',
              title: 'Square Photo',
              type: 'image',
              options: { hotspot: true },
              description: 'Shows as a square above the event. Any photo works — click the crop icon to choose the focus point. Until a photo is added, the card shows "Photo Coming Soon".',
            }),
            defineField({
              name: 'link',
              title: 'Link (optional)',
              type: 'string',
              description: 'Leave blank to link to the Live Music calendar. Or enter a page like "special-menus.html#sushi-night".',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'when', media: 'photo' },
          },
        }),
      ],
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'See the Full Calendar',
    }),
  ],
  preview: {
    prepare: () => ({ title: "What's Happening This Month" }),
  },
})
