import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Menu Category',
      type: 'reference',
      to: [{ type: 'menuCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Item Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'price',
      title: 'Price — leave blank to hide',
      type: 'string',
    }),
    defineField({
      name: 'addOns',
      title: 'Add-On Options',
      description: 'e.g. Add shrimp $7',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'labels',
      title: 'Labels',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Spicy',        value: 'Spicy' },
              { title: 'Popular',      value: 'Popular' },
              { title: 'Market Price', value: 'Market Price' },
              { title: 'New',          value: 'New' },
              { title: 'Staff Pick',   value: 'Staff Pick' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within the category',
    }),
    defineField({
      name: 'active',
      title: 'Show on menu',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
    },
  },
})
