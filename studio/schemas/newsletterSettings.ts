import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'newsletterSettings',
  title: 'Newsletter Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show "Stay in the Loop" Section',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle the newsletter signup section on the homepage.',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      initialValue: 'Stay in the Loop',
      description: 'Small label above the headline.',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Never Miss What\'s Fresh at Tonio\'s',
    }),
    defineField({
      name: 'subheadline',
      title: 'Supporting Copy',
      type: 'text',
      rows: 2,
      initialValue: 'Be the first to hear about fresh catch arrivals, daily specials, live music, happy hour, holiday events, and everything happening at the Shack.',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline (below supporting copy)',
      type: 'string',
      initialValue: 'No spam. Just fresh seafood, cold drinks, great music, and island life.',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'JOIN THE SHACK LIST',
    }),
    defineField({
      name: 'successTitle',
      title: 'Success Message Title',
      type: 'string',
      initialValue: 'Welcome to the Shack!',
    }),
    defineField({
      name: 'successBody',
      title: 'Success Message Body',
      type: 'text',
      rows: 2,
      initialValue: 'You\'re officially on the Tonio\'s VIP List. We\'ll keep you updated with fresh catch, daily specials, live music, and special events.',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Photo',
      type: 'image',
      description: 'Waterfront or seafood photo. Appears behind a dark overlay.',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { showSection: 'showSection', headline: 'headline' },
    prepare({ showSection, headline }: { showSection: boolean; headline: string }) {
      return {
        title: 'Newsletter Settings',
        subtitle: `${showSection ? '✓ Visible' : '○ Hidden'} · ${headline || ''}`,
      }
    },
  },
})
