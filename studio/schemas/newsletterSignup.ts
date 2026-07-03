import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'newsletterSignup',
  title: 'Newsletter Subscriber',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'delete'],
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Mobile Phone',
      type: 'string',
      readOnly: true,
      description: 'Available for future SMS marketing.',
    }),
    defineField({
      name: 'signedUpAt',
      title: 'Signed Up',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'consent',
      title: 'Gave Consent',
      type: 'boolean',
      readOnly: true,
      initialValue: true,
    }),
    defineField({
      name: 'source',
      title: 'Signup Source',
      type: 'string',
      readOnly: true,
      description: 'Where on the website they signed up.',
    }),
    defineField({
      name: 'mailchimpSynced',
      title: 'Synced to Mailchimp',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Website Signup',  value: 'Website Signup'  },
          { title: 'Fresh Catch',     value: 'Fresh Catch'     },
          { title: 'Live Music',      value: 'Live Music'      },
          { title: 'Happy Hour',      value: 'Happy Hour'      },
          { title: 'Birthday Club',   value: 'Birthday Club'   },
          { title: 'Locals',          value: 'Locals'          },
          { title: 'Visitors',        value: 'Visitors'        },
          { title: 'VIP',             value: 'VIP'             },
        ],
        layout: 'tags',
      },
      description: 'Interest tags for targeted email campaigns.',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 2,
      description: 'Internal notes — visible only in Sanity.',
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'signedUpAtDesc',
      by: [{ field: 'signedUpAt', direction: 'desc' }],
    },
    {
      title: 'Name A–Z',
      name: 'nameAsc',
      by: [{ field: 'firstName', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      firstName:  'firstName',
      email:      'email',
      signedUpAt: 'signedUpAt',
      synced:     'mailchimpSynced',
    },
    prepare({ firstName, email, signedUpAt, synced }: {
      firstName: string; email: string; signedUpAt: string; synced: boolean;
    }) {
      const date = signedUpAt
        ? new Date(signedUpAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '';
      return {
        title:    `${firstName || '?'} — ${email}`,
        subtitle: `${date}  ·  ${synced ? '✓ Mailchimp' : '○ Mailchimp'}`,
      }
    },
  },
})
