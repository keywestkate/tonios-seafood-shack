import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'branding',
  title: 'Logo & Branding',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'mainLogo',
      title: 'Main Logo (nav bar)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'footerLogo',
      title: 'Footer Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color (hex e.g. #C2532E)',
      type: 'string',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Accent Color (hex)',
      type: 'string',
    }),
  ],
})
