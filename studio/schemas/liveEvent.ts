import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'liveEvent',
  title: 'Live Event',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to hide this event from the website without deleting it.',
    }),
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. Live Music Night, July 4th Celebration, Pierce Live',
    }),
    defineField({
      name: 'musicianRef',
      title: 'Musician / Performer',
      type: 'reference',
      to: [{ type: 'musician' }],
      options: {
        filter: 'active != false',
        disableNew: false,
      },
      description: 'Select a saved musician — their name and photo will fill in automatically. Only active musicians appear here.',
    }),
    defineField({
      name: 'performer',
      title: 'Performer Name Override',
      type: 'string',
      description: 'Optional — only needed if the performer is not saved in the Musicians list yet. If a musician is selected above, this field overrides their name on the website.',
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: '🎵 Live Music',       value: 'Live Music'       },
          { title: '🎉 Special Event',    value: 'Special Event'    },
          { title: '🎆 Holiday Event',    value: 'Holiday Event'    },
          { title: '💛 Fundraiser',       value: 'Fundraiser'       },
          { title: '🍻 Food & Drink Event', value: 'Food & Drink Event' },
          { title: '🤝 Community Event',  value: 'Community Event'  },
        ],
        layout: 'radio',
      },
      initialValue: 'Live Music',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Start Time',
      type: 'string',
      description: 'e.g. 6:00 PM',
      initialValue: '6:00 PM',
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      description: 'e.g. 9:00 PM — used for Google Calendar link',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'What should guests know about this event?',
    }),
    defineField({
      name: 'cover',
      title: 'Cover Charge',
      type: 'string',
      options: {
        list: [
          { title: 'No Cover',        value: 'no-cover' },
          { title: 'Cover Charge',    value: 'charge'   },
          { title: 'Call to Confirm', value: 'call'     },
        ],
        layout: 'radio',
      },
      initialValue: 'no-cover',
    }),
    defineField({
      name: 'coverPrice',
      title: 'Cover Price',
      type: 'string',
      description: 'e.g. $5, $10 at the door — only shown if Cover Charge is selected.',
      hidden: ({ document }) => document?.cover !== 'charge',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: false,
      description: 'If on, this event gets extra visual emphasis on the website.',
    }),
    defineField({
      name: 'cancelled',
      title: 'Mark as Cancelled',
      type: 'boolean',
      initialValue: false,
      description: 'Shows a "Cancelled" badge on the event instead of hiding it.',
    }),
    defineField({
      name: 'photo',
      title: 'Event Image / Performer Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional — shown in the event detail popup.',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'e.g. "Add to Calendar", "RSVP Now" — leave blank to hide',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      description: 'e.g. a ticketing URL or RSVP link',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Optional — overrides date ordering within the same day.',
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: 'By Date (Upcoming First)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'By Date (Most Recent First)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title:     'title',
      performer: 'performer',
      date:      'date',
      media:     'photo',
      cancelled: 'cancelled',
      active:    'active',
    },
    prepare({ title, performer, date, media, cancelled, active }: {
      title: string; performer: string; date: string;
      media: unknown; cancelled: boolean; active: boolean;
    }) {
      const flag = cancelled ? '❌ ' : !active ? '👁️ ' : '';
      const dateStr = date ? new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      }) : '';
      return {
        title: `${flag}${title}`,
        subtitle: [dateStr, performer].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
