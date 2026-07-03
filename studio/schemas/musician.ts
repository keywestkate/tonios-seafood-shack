import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'musician',
  title: 'Musician',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Musician / Band Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The name that appears on the website and in the event calendar.',
    }),
    defineField({
      name: 'active',
      title: 'Active / Available',
      type: 'boolean',
      initialValue: true,
      description: 'Only active musicians appear in the event booking dropdown.',
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'Shown in the event popup on the website.',
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      description: 'e.g. Acoustic, Classic Rock, Reggae, Blues, Island',
      options: {
        list: [
          { title: 'Acoustic / Singer-Songwriter', value: 'Acoustic' },
          { title: 'Classic Rock',                 value: 'Classic Rock' },
          { title: 'Country',                      value: 'Country' },
          { title: 'Blues',                        value: 'Blues' },
          { title: 'Reggae / Island',              value: 'Reggae' },
          { title: 'Jazz',                         value: 'Jazz' },
          { title: 'Pop',                          value: 'Pop' },
          { title: 'Original / Other',             value: 'Original' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Used as the event image if no event-specific photo is uploaded.',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Internal only — not shown on the website.',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Internal only — not shown on the website.',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      description: 'e.g. https://theirwebsite.com',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      description: 'e.g. https://instagram.com/theirhandle',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 2,
      description: 'Internal notes — booking preferences, set length, equipment needs, etc.',
    }),
  ],
  orderings: [
    {
      title: 'Name A–Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title:  'name',
      subtitle: 'genre',
      active: 'active',
      media:  'photo',
    },
    prepare({ title, subtitle, active, media }: {
      title: string; subtitle: string; active: boolean; media: unknown;
    }) {
      return {
        title:    active === false ? `○ ${title}` : title,
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
