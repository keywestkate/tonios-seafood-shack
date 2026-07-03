import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'freshCatchSettings',
  title: 'Fresh Catch Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Page Headline',
      type: 'string',
      initialValue: 'Fresh Catch Market',
      description: 'Main headline on the Fresh Catch page.',
    }),
    defineField({
      name: 'subheadline',
      title: 'Page Subheadline',
      type: 'string',
      initialValue: 'Straight from the dock. Updated daily.',
    }),
    defineField({
      name: 'topNote',
      title: 'Top Note',
      type: 'text',
      rows: 2,
      description: 'Short note shown above the catch board. Update this when the catch changes.',
      initialValue: 'Fresh catch availability changes fast. Call ahead for the latest dock drop.',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'string',
      description: 'e.g. "This Morning", "Today at 9 AM", "July 3rd"',
      initialValue: 'Today',
    }),
    defineField({
      name: 'showPage',
      title: 'Show Fresh Catch Page',
      type: 'boolean',
      initialValue: true,
      description: 'If off, the Fresh Catch page will show a "Coming Soon" message.',
    }),
  ],
})
