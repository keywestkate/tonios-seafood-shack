import { StructureBuilder } from 'sanity/structure'

/* Per-page filtered menu items view */
function menuPageItems(S: StructureBuilder, label: string, page: string) {
  return S.listItem()
    .title(label)
    .child(
      S.documentList()
        .title(label)
        .filter('_type == "menuItem" && category->menuPage == $page')
        .params({ page })
        .defaultOrdering([
          { field: 'sortOrder', direction: 'asc' },
          { field: 'name',      direction: 'asc' },
        ])
    )
}

/* Singleton helper — opens document directly, skips list view */
function singleton(
  S: StructureBuilder,
  title: string,
  schemaType: string,
  documentId: string
) {
  return S.listItem()
    .title(title)
    .child(
      S.document()
        .schemaType(schemaType)
        .documentId(documentId)
        .title(title)
    )
}

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Tonio's Seafood Shack")
    .items([

      /* ── MENUS ──────────────────────────────────────────── */
      S.listItem()
        .title('Menus')
        .child(
          S.list()
            .title('Menus')
            .items([
              menuPageItems(S, 'Breakfast',  'breakfast'),
              menuPageItems(S, 'Lunch',      'lunch'),
              menuPageItems(S, 'Dinner',     'dinner'),
              menuPageItems(S, 'Drinks',     'drinks'),
              menuPageItems(S, 'Happy Hour', 'happy-hour'),
              S.divider(),
              S.listItem()
                .title('Sushi Night Rolls')
                .schemaType('sushiRoll')
                .child(
                  S.documentTypeList('sushiRoll')
                    .title('Sushi Rolls')
                    .defaultOrdering([{ field: 'sortOrder', direction: 'asc' }])
                ),
              S.listItem()
                .title('Pasta Night Dishes')
                .schemaType('pastaItem')
                .child(
                  S.documentTypeList('pastaItem')
                    .title('Pasta Dishes')
                    .defaultOrdering([{ field: 'sortOrder', direction: 'asc' }])
                ),
              S.divider(),
              S.listItem()
                .title('All Menu Categories')
                .schemaType('menuCategory')
                .child(
                  S.documentTypeList('menuCategory')
                    .title('Menu Categories')
                    .defaultOrdering([
                      { field: 'menuPage',   direction: 'asc' },
                      { field: 'sortOrder',  direction: 'asc' },
                    ])
                ),
              S.listItem()
                .title('All Menu Items')
                .schemaType('menuItem')
                .child(
                  S.documentTypeList('menuItem')
                    .title('All Menu Items')
                    .defaultOrdering([{ field: 'sortOrder', direction: 'asc' }])
                ),
            ])
        ),

      S.divider(),

      /* ── DAILY UPDATES — top-level for quick access ────── */
      S.listItem()
        .title('Daily Specials')
        .schemaType('dailySpecial')
        .child(
          S.documentTypeList('dailySpecial')
            .title('Daily Specials')
            .defaultOrdering([{ field: 'sortOrder', direction: 'asc' }])
        ),

      S.listItem()
        .title('Fresh Catch Board')
        .child(
          S.list()
            .title('Fresh Catch Board')
            .items([
              S.listItem()
                .title('Catch Items')
                .schemaType('freshCatchItem')
                .child(
                  S.documentTypeList('freshCatchItem')
                    .title('Fresh Catch Items')
                    .defaultOrdering([{ field: 'sortOrder', direction: 'asc' }])
                ),
              singleton(S, 'Page Settings & Note', 'freshCatchSettings', 'freshCatchSettings'),
            ])
        ),

      S.listItem()
        .title('Live Music & Events')
        .child(
          S.list()
            .title('Live Music & Events')
            .items([
              S.listItem()
                .title('📅 Upcoming Events')
                .child(
                  S.documentList()
                    .title('Upcoming Events')
                    .schemaType('liveEvent')
                    .filter(`_type == "liveEvent" && date >= $today`)
                    .params({ today: new Date().toISOString().slice(0, 10) })
                    .defaultOrdering([{ field: 'date', direction: 'asc' }])
                ),
              S.listItem()
                .title('📆 All Events (by Date)')
                .schemaType('liveEvent')
                .child(
                  S.documentTypeList('liveEvent')
                    .title('All Events')
                    .defaultOrdering([{ field: 'date', direction: 'asc' }])
                ),
              S.listItem()
                .title('⭐ Featured Events')
                .child(
                  S.documentList()
                    .title('Featured Events')
                    .schemaType('liveEvent')
                    .filter(`_type == "liveEvent" && featured == true`)
                    .defaultOrdering([{ field: 'date', direction: 'asc' }])
                ),
              S.listItem()
                .title('🕰️ Past Events')
                .child(
                  S.documentList()
                    .title('Past Events')
                    .schemaType('liveEvent')
                    .filter(`_type == "liveEvent" && date < $today`)
                    .params({ today: new Date().toISOString().slice(0, 10) })
                    .defaultOrdering([{ field: 'date', direction: 'desc' }])
                ),
              S.divider(),
              S.listItem()
                .title('🎤 Musicians')
                .schemaType('musician')
                .child(
                  S.documentTypeList('musician')
                    .title('Musicians')
                    .defaultOrdering([{ field: 'name', direction: 'asc' }])
                ),
            ])
        ),

      S.divider(),

      /* ── NEWSLETTER ─────────────────────────────────────── */
      S.listItem()
        .title('Newsletter & Email')
        .child(
          S.list()
            .title('Newsletter & Email')
            .items([
              singleton(S, '⚙️ Newsletter Settings', 'newsletterSettings', 'newsletterSettings'),
              S.divider(),
              S.listItem()
                .title('📋 All Subscribers')
                .schemaType('newsletterSignup')
                .child(
                  S.documentTypeList('newsletterSignup')
                    .title('All Subscribers')
                    .defaultOrdering([{ field: 'signedUpAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('✅ Synced to Mailchimp')
                .child(
                  S.documentList()
                    .title('Synced to Mailchimp')
                    .schemaType('newsletterSignup')
                    .filter('_type == "newsletterSignup" && mailchimpSynced == true')
                    .defaultOrdering([{ field: 'signedUpAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('⚠️ Pending Mailchimp Sync')
                .child(
                  S.documentList()
                    .title('Pending Mailchimp Sync')
                    .schemaType('newsletterSignup')
                    .filter('_type == "newsletterSignup" && (mailchimpSynced != true)')
                    .defaultOrdering([{ field: 'signedUpAt', direction: 'desc' }])
                ),
            ])
        ),

      S.divider(),

      /* ── WEBSITE CONTENT ────────────────────────────────── */
      S.listItem()
        .title('Website Content')
        .child(
          S.list()
            .title('Website Content')
            .items([
              singleton(S, 'Homepage Content',  'homepageContent', 'homepageContent'),
              singleton(S, 'Logo & Branding',   'branding',        'branding'),
              S.listItem()
                .title('Photo Gallery')
                .schemaType('galleryPhoto')
                .child(S.documentTypeList('galleryPhoto').title('Gallery Photos')),
            ])
        ),

      S.divider(),

      /* ── SETTINGS ───────────────────────────────────────── */
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              singleton(S, 'Announcements & Happy Hour', 'siteSettings', 'siteSettings'),
              singleton(S, 'Hours & Location',           'siteSettings', 'siteSettings'),
            ])
        ),

    ])
