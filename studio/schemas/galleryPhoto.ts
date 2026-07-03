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
      type: 'string',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Order (lower = first)',
      type: 'number',
    }),
    defineField({
      name: 'visible',
      title: 'Show in gallery',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'photo',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Untitled Photo',
        media,
      }
    },
  },
})
