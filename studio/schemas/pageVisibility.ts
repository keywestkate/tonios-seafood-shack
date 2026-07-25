import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageVisibility',
  title: 'Page Visibility',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'note',
      title: '📌 How This Works',
      type: 'string',
      readOnly: true,
      initialValue: 'Toggle any page OFF to hide it from visitors. Toggle ON to make it live again.',
    }),

    defineField({
      name: 'homepage',
      title: '🏠 Homepage',
      type: 'boolean',
      initialValue: true,
      description: 'The main homepage (tonios-seafood-shack.vercel.app)',
    }),
    defineField({
      name: 'menuBreakfast',
      title: '🍳 Breakfast Menu',
      type: 'boolean',
      initialValue: true,
      description: 'Breakfast & Brunch menu page',
    }),
    defineField({
      name: 'menuLunch',
      title: '🐟 Lunch Menu',
      type: 'boolean',
      initialValue: true,
      description: 'Lunch menu page',
    }),
    defineField({
      name: 'menuDinner',
      title: '🦞 Dinner Menu',
      type: 'boolean',
      initialValue: true,
      description: 'Dinner menu page',
    }),
    defineField({
      name: 'menuDrinks',
      title: '🍹 Drinks Menu',
      type: 'boolean',
      initialValue: true,
      description: 'Drinks menu page',
    }),
    defineField({
      name: 'menuHappyHour',
      title: '🍺 Happy Hour Menu',
      type: 'boolean',
      initialValue: true,
      description: 'Happy Hour menu page',
    }),
    defineField({
      name: 'specialMenus',
      title: '🍣 Special Menus (Sushi / Pasta / Crab / Wings)',
      type: 'boolean',
      initialValue: true,
      description: 'Nightly special menus page',
    }),
    defineField({
      name: 'freshCatch',
      title: '🎣 Fresh Catch & Market',
      type: 'boolean',
      initialValue: true,
      description: 'Fresh catch board and market page',
    }),
    defineField({
      name: 'liveMusic',
      title: '🎸 Live Music & Events',
      type: 'boolean',
      initialValue: true,
      description: 'Live music calendar and events page',
    }),
    defineField({
      name: 'meetTheCrew',
      title: '👥 Meet the Crew',
      type: 'boolean',
      initialValue: true,
      description: 'Meet the crew page',
    }),
    defineField({
      name: 'shopTheShack',
      title: '👕 Shop the Shack',
      type: 'boolean',
      initialValue: true,
      description: 'Merchandise and shop page',
    }),
    defineField({
      name: 'visit',
      title: '📍 Visit',
      type: 'boolean',
      initialValue: true,
      description: 'Hours, directions and visit info page',
    }),
    defineField({
      name: 'faq',
      title: '❓ FAQ',
      type: 'boolean',
      initialValue: true,
      description: 'Frequently asked questions page',
    }),
    defineField({
      name: 'gallery',
      title: '📸 Gallery',
      type: 'boolean',
      initialValue: true,
      description: 'Photo gallery page',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Page Visibility' }
    },
  },
})
