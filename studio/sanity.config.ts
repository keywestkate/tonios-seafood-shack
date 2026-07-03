import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { structure } from './structure'
import { StudioLogo } from './components/StudioLogo'
import { StudioNavbar } from './components/StudioNavbar'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = 'production'

export default defineConfig({
  name:    'tonios-studio',
  title:   "Tonio's Seafood Shack CMS",
  basePath: '/',

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      logo:   StudioLogo,
      navbar: StudioNavbar,
    },
  },

  document: {
    // Show a breadcrumb subtitle under the document type name
    productionUrl: async (prev, { document }) => {
      const slug = (document as any)?.slug?.current
      if (slug) return `https://tonios-seafood-shack.vercel.app/${slug}`
      return prev
    },
  },
})
