import { postType }         from './postType'
import dailySpecial         from './dailySpecial'
import freshCatchItem       from './freshCatchItem'
import freshCatchSettings   from './freshCatchSettings'
import musician             from './musician'
import menuCategory         from './menuCategory'
import menuItem             from './menuItem'
import sushiRoll            from './sushiRoll'
import pastaItem            from './pastaItem'
import liveEvent            from './liveEvent'
import homepageContent      from './homepageContent'
import galleryPhoto         from './galleryPhoto'
import branding             from './branding'
import siteSettings         from './siteSettings'
import newsletterSignup     from './newsletterSignup'
import newsletterSettings   from './newsletterSettings'

export const schemaTypes = [
  // Singletons
  homepageContent,
  branding,
  siteSettings,
  freshCatchSettings,
  newsletterSettings,

  // Menus
  menuCategory,
  menuItem,
  sushiRoll,
  pastaItem,

  // Daily content
  dailySpecial,
  freshCatchItem,
  liveEvent,
  musician,

  // Website
  galleryPhoto,
  newsletterSignup,
  postType,
]
