import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'announcementActive',
      title: 'Announcement Bar On/Off',
      type: 'boolean',
      initialValue: true,
    }),

    // Happy Hour
    defineField({
      name: 'happyHourDays',
      title: 'Happy Hour Days',
      type: 'string',
      description: 'e.g. Monday – Friday',
    }),
    defineField({
      name: 'happyHourTime',
      title: 'Happy Hour Time',
      type: 'string',
      description: 'e.g. 3:00 PM – 6:00 PM',
    }),
    defineField({
      name: 'happyHourDeals',
      title: 'Happy Hour Deals',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'item',  title: 'Item',  type: 'string' }),
            defineField({ name: 'price', title: 'Price', type: 'string' }),
          ],
          preview: {
            select: { title: 'item', subtitle: 'price' },
          },
        },
      ],
    }),

    // Location
    defineField({
      name: 'locationAddress',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'locationPhone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'locationParking',
      title: 'Parking Info',
      type: 'text',
      rows: 2,
    }),

    // Social
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'string',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'string',
    }),
    defineField({
      name: 'tiktokUrl',
      title: 'TikTok URL',
      type: 'string',
    }),

    // Fresh Catch
    defineField({
      name: 'freshCatchNote',
      title: 'Fresh Catch Note',
      description: 'Shown below the fresh catch list',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'freshCatchLastUpdated',
      title: 'Fresh Catch Last Updated',
      type: 'string',
      description: 'e.g. Today, June 30',
    }),
  ],
})
