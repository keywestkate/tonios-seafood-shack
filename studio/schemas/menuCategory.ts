import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Order on menu',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'menuPage',
      title: 'Which Menu Page',
      type: 'string',
      options: {
        list: [
          { title: 'Breakfast & Brunch', value: 'breakfast' },
          { title: 'Lunch',              value: 'lunch' },
          { title: 'Dinner',             value: 'dinner' },
          { title: 'Drinks',             value: 'drinks' },
          { title: 'Happy Hour',         value: 'happy-hour' },
        ],
        layout: 'dropdown',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'menuPage',
    },
  },
})
