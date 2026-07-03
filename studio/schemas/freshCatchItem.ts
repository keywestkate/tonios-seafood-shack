import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'freshCatchItem',
  title: 'Fresh Catch Item',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to hide this item completely from the website.',
    }),
    defineField({
      name: 'name',
      title: 'Fish / Seafood Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. Hogfish, Yellowtail Snapper, Stone Crab Claws, Mahi-Mahi',
    }),
    defineField({
      name: 'description',
      title: 'Description / Notes',
      type: 'text',
      rows: 2,
      description: 'e.g. Fresh local catch, available blackened, grilled, or fried.',
    }),
    defineField({
      name: 'status',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          { title: '✅ In Stock',        value: 'in-stock'  },
          { title: '⚠️  Limited',        value: 'limited'   },
          { title: '❌ Sold Out',        value: 'sold-out'  },
          { title: '📞 Call to Check',  value: 'call'      },
          { title: '🌊 Seasonal',       value: 'seasonal'  },
        ],
        layout: 'radio',
      },
      initialValue: 'in-stock',
    }),
    defineField({
      name: 'priceType',
      title: 'Price Type',
      type: 'string',
      options: {
        list: [
          { title: 'Market Price',  value: 'market' },
          { title: 'Fixed Price',   value: 'fixed'  },
          { title: 'Call for Price', value: 'call'  },
        ],
        layout: 'radio',
      },
      initialValue: 'market',
    }),
    defineField({
      name: 'fixedPrice',
      title: 'Price (e.g. $28/lb)',
      type: 'string',
      hidden: ({ document }) => document?.priceType !== 'fixed',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Item',
      type: 'boolean',
      initialValue: false,
      description: 'Display this item larger with a "Featured Catch" badge at the top of the board.',
    }),
    defineField({
      name: 'freshnessBadge',
      title: 'Freshness Badge',
      type: 'string',
      description: 'Small badge shown on the item — optional.',
      options: {
        list: [
          { title: 'Just In',                value: 'Just In'                },
          { title: 'Straight from the Dock', value: 'Straight from the Dock' },
          { title: 'Local Favorite',          value: 'Local Favorite'         },
          { title: 'Chef Recommends',         value: 'Chef Recommends'        },
          { title: 'Selling Fast',            value: 'Selling Fast'           },
          { title: 'Seasonal Catch',          value: 'Seasonal Catch'         },
          { title: 'Today Only',              value: 'Today Only'             },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'prepOptions',
      title: 'Preparation Options',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Grilled',        value: 'Grilled'        },
          { title: 'Blackened',      value: 'Blackened'      },
          { title: 'Fried',          value: 'Fried'          },
          { title: 'Broiled',        value: 'Broiled'        },
          { title: 'Stuffed',        value: 'Stuffed'        },
          { title: 'Raw Bar',        value: 'Raw Bar'        },
          { title: "Chef's Choice",  value: "Chef's Choice"  },
        ],
        layout: 'grid',
      },
      description: 'How this item can be prepared.',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional — adds a photo to the card.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Use 1, 2, 3… to control order.',
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title:    'name',
      subtitle: 'status',
      media:    'photo',
    },
    prepare({ title, subtitle, media }: { title: string; subtitle: string; media: unknown }) {
      const labels: Record<string, string> = {
        'in-stock':  '✅ In Stock',
        'available': '✅ In Stock',
        'limited':   '⚠️ Limited',
        'sold-out':  '❌ Sold Out',
        'call':      '📞 Call to Check',
        'seasonal':  '🌊 Seasonal',
      }
      return { title, subtitle: labels[subtitle] || subtitle || '', media }
    },
  },
})
