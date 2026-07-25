import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryPhoto',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      description: 'Short description shown in the lightbox',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Food & Drinks',  value: 'food' },
          { title: 'The Shack',      value: 'shack' },
          { title: 'Live Music',     value: 'music' },
          { title: 'People & Crew',  value: 'people' },
          { title: 'Events',         value: 'events' },
        ],
        layout: 'radio',
      },
      initialValue: 'food',
    }),
    defineField({
      name: 'featured',
      title: 'Featured (show on homepage)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Order (lower = first)',
      type: 'number',
      initialValue: 99,
    }),
    defineField({
      name: 'visible',
      title: 'Show in gallery',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'caption', subtitle: 'category', media: 'photo' },
    prepare({ title, subtitle, media }: any) {
      const cats: Record<string,string> = { food:'🍽️ Food & Drinks', shack:'🏠 The Shack', music:'🎸 Live Music', people:'👥 People & Crew', events:'🎉 Events' }
      return { title: title || 'Untitled Photo', subtitle: cats[subtitle] || subtitle || '', media }
    },
  },
})
