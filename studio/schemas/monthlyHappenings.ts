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
      name: 'monthLabel',
      title: 'Month',
      type: 'string',
      description: 'Shown above the heading, e.g. "November 2026". Update this each month.',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: "What's Happening This Month",
    }),
    defineField({
      name: 'items',
      title: 'Events (up to 8)',
      type: 'array',
      description: 'Up to 8 placements, 4 per row. Drag to reorder. Every card links to the Live Music calendar unless you add a different link.',
      validation: (Rule) => Rule.max(8).error('Maximum 8 events — remove one before adding another.'),
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
              title: 'Photo (optional)',
              type: 'image',
              options: { hotspot: true },
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
    select: { subtitle: 'monthLabel' },
    prepare: ({ subtitle }) => ({ title: "What's Happening This Month", subtitle }),
  },
})
