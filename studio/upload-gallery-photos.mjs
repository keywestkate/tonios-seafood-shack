import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { readFileSync } from 'fs'

const client = createClient({
  projectId: '3laoz40d',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: JSON.parse(readFileSync(`${process.env.HOME}/.config/sanity/config.json`, 'utf8')).authToken,
  useCdn: false,
})

const IMAGES_DIR = path.resolve('../images')

// Map filename patterns to category and caption
const photoMap = [
  // FOOD
  { file: 'gallery-food-1.jpg',              category: 'food',   featured: true,  caption: "Fresh from the water to your plate" },
  { file: 'gallery-food-2.jpg',              category: 'food',   featured: true,  caption: "Tonio's fresh catch" },
  { file: 'cook-your-catch-tonies.png',      category: 'food',   featured: false, caption: "Cook your catch — we'll prepare it any way you like" },
  { file: 'fresh-catch-og.jpg',              category: 'food',   featured: true,  caption: "Today's fresh catch" },
  { file: 'burger-tonies.jpg',               category: 'food',   featured: false, caption: "Tonio's famous burger" },
  { file: 'fish-dinner.jpg',                 category: 'food',   featured: false, caption: "Fish dinner done right" },
  { file: 'Food-lobster.jpg',                category: 'food',   featured: true,  caption: "Fresh lobster" },
  { file: 'fresh-snapper-tonies.jpg',        category: 'food',   featured: false, caption: "Fresh snapper" },
  { file: 'main-lobster-clams-tonies.jpg',   category: 'food',   featured: true,  caption: "Lobster and clams from the Keys" },
  { file: 'new-stone-crab-tonies.png',       category: 'food',   featured: true,  caption: "Stone crab claws — Florida's finest" },
  { file: 'new-stone-crab-tonies-2.png',     category: 'food',   featured: false, caption: "Stone crab night" },
  { file: 'pasta-night-tonies.jpg',          category: 'food',   featured: false, caption: "Monday pasta night" },
  { file: 'pasta-tonies.jpg',                category: 'food',   featured: false, caption: "Homemade pasta" },
  { file: 'peel-eat-shrimp-tonies.jpg',      category: 'food',   featured: true,  caption: "Peel & eat shrimp" },
  { file: 'salad-tonies.jpg',                category: 'food',   featured: false, caption: "Fresh salad" },
  { file: 'stone-crab-tonies.jpg',           category: 'food',   featured: false, caption: "Stone crab claws" },
  { file: 'stone-crab-tonies-2.jpg',         category: 'food',   featured: false, caption: "Stone crab feast" },
  { file: 'stone-crabs.jpg',                 category: 'food',   featured: false, caption: "Florida stone crabs" },
  { file: 'stuffed-lobster-dinner-tonies.jpg', category: 'food', featured: true,  caption: "Stuffed lobster dinner" },
  { file: 'sushi-night-tonies.jpg',          category: 'food',   featured: false, caption: "Thursday sushi night" },
  { file: 'tuna-app-tonies.jpg',             category: 'food',   featured: false, caption: "Tuna appetizer" },
  { file: 'wings-tonies.jpg',                category: 'food',   featured: false, caption: "Wednesday wings night" },
  { file: 'fresh-catch-hero.jpg',            category: 'food',   featured: false, caption: "Fresh catch of the day" },

  // SHACK
  { file: 'gallery-exterior.jpg',            category: 'shack',  featured: true,  caption: "Tonio's Seafood Shack — Big Pine Key" },
  { file: 'TONIES-Shack-high-res.png',       category: 'shack',  featured: true,  caption: "The Shack at sunset" },
  { file: 'dockside-tonies.png',             category: 'shack',  featured: false, caption: "Dockside dining" },
  { file: 'high-res-shack-.png',             category: 'shack',  featured: false, caption: "Tonio's Shack" },
  { file: 'outside-high-res-shack.png',      category: 'shack',  featured: true,  caption: "Outside the shack" },
  { file: 'outside-tonies-shack.jpg',        category: 'shack',  featured: false, caption: "Come on in" },
  { file: 'outside-tonies-shack-2.jpg',      category: 'shack',  featured: false, caption: "The shack from the road" },
  { file: 'seafood-market.jpg',              category: 'shack',  featured: false, caption: "Fresh seafood market" },
  { file: 'the-shack-toines.jpg',            category: 'shack',  featured: false, caption: "Tonio's at dusk" },
  { file: 'the-shack-toinies-2.jpg',         category: 'shack',  featured: false, caption: "The shack on the water" },
  { file: 'tiki-board.png',                  category: 'shack',  featured: false, caption: "Today's catch board" },
  { file: 'story-photo.jpg',                 category: 'shack',  featured: false, caption: "Tonio's story" },
  { file: 'view-tonies.jpg',                 category: 'shack',  featured: true,  caption: "The view from Tonio's" },
  { file: 'Bring-your-catch-to-tonies.jpg',  category: 'shack',  featured: false, caption: "Bring your own catch — we'll cook it" },
  { file: 'tonies-seafood-shack.jpg',        category: 'shack',  featured: false, caption: "Tonio's Seafood Shack" },
  { file: 'tonies-seafood-shake.jpg',        category: 'shack',  featured: false, caption: "Tonio's on Big Pine Key" },

  // MUSIC
  { file: 'gallery-music.jpg',               category: 'music',  featured: true,  caption: "Live music at Tonio's" },
  { file: 'live-music-tonies-1.png',         category: 'music',  featured: true,  caption: "Friday night live" },
  { file: 'live-music-tonies-2.png',         category: 'music',  featured: false, caption: "Live music on the patio" },
  { file: 'live-music-tonies-5.png',         category: 'music',  featured: false, caption: "The crowd loves it" },
  { file: 'live-music-tonies-friends.png',   category: 'music',  featured: false, caption: "Friends and music" },
  { file: 'music-tonies-.jpg',               category: 'music',  featured: false, caption: "Music night at Tonio's" },
  { file: 'pierce-art-tonies.png',           category: 'music',  featured: false, caption: "Pierce performing" },
  { file: 'pierce-music-toines.jpg',         category: 'music',  featured: false, caption: "Pierce live at Tonio's" },
  { file: 'pierce-tonies.png',               category: 'music',  featured: true,  caption: "Pierce — live music every weekend" },
  { file: 'tonies-music.jpg',                category: 'music',  featured: false, caption: "Music under the palms" },
  { file: 'tonies-music-2.jpg',              category: 'music',  featured: false, caption: "Saturday night session" },
  { file: 'tonies-music2.jpg',               category: 'music',  featured: false, caption: "Good vibes at Tonio's" },

  // PEOPLE
  { file: 'gallery-people-1.jpg',            category: 'people', featured: true,  caption: "Good times at Tonio's" },
  { file: 'gallery-people-2.jpg',            category: 'people', featured: false, caption: "Regulars love it here" },
  { file: 'gallery-people-3.jpg',            category: 'people', featured: false, caption: "Friends at the shack" },
  { file: 'gallery-people-4.jpg',            category: 'people', featured: false, caption: "Smiles and seafood" },
  { file: 'gallery-people-5.jpg',            category: 'people', featured: false, caption: "The best crowd in the Keys" },
  { file: 'gallery-people-6.jpg',            category: 'people', featured: false, caption: "Weekend vibes" },
  { file: 'day-at-tonies.jpg',               category: 'people', featured: false, caption: "A day at Tonio's" },
  { file: 'server-tonies.jpg',               category: 'people', featured: false, caption: "Our amazing crew" },
  { file: 'server-tonies.png',               category: 'people', featured: false, caption: "Service with a smile" },
  { file: 'the crew tonies.jpg',             category: 'people', featured: true,  caption: "Meet the crew" },
  { file: 'tonies-friends.png',              category: 'people', featured: false, caption: "Friends at the shack" },
  { file: 'tonies-regulars.jpg',             category: 'people', featured: false, caption: "Our regulars" },
  { file: 'tonies-regulars-2.jpg',           category: 'people', featured: false, caption: "Always a good time" },
  { file: 'tonies-regulars-4.jpg',           category: 'people', featured: false, caption: "Regulars at Tonio's" },
  { file: 'tonies-regulars-5.jpg',           category: 'people', featured: false, caption: "The Tonio's family" },
  { file: 'appearal-tonies.jpg',             category: 'people', featured: false, caption: "Tonio's merch" },
  { file: 'tonies-apperal.png',              category: 'people', featured: false, caption: "Rep the shack" },
]

async function uploadPhoto(entry, sortOrder) {
  const filePath = path.join(IMAGES_DIR, entry.file)
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  SKIPPED (not found): ${entry.file}`)
    return null
  }

  const fileBuffer = fs.readFileSync(filePath)
  const ext = path.extname(entry.file).slice(1).toLowerCase()
  const mimeType = ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png'

  try {
    console.log(`  📤 Uploading: ${entry.file}`)
    const asset = await client.assets.upload('image', fileBuffer, {
      filename: entry.file,
      contentType: mimeType,
    })

    const doc = await client.create({
      _type: 'galleryPhoto',
      photo: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
      caption: entry.caption,
      category: entry.category,
      featured: entry.featured,
      sortOrder,
    })

    console.log(`  ✅ Created: ${entry.file} [${entry.category}]`)
    return doc._id
  } catch (err) {
    console.log(`  ❌ Failed: ${entry.file} — ${err.message}`)
    return null
  }
}

async function main() {
  console.log(`\n🦞 Uploading ${photoMap.length} photos to Tonio's Sanity Photo Gallery...\n`)

  let sortOrder = 10
  let uploaded = 0
  let skipped = 0

  for (const entry of photoMap) {
    const result = await uploadPhoto(entry, sortOrder)
    if (result) { uploaded++; sortOrder += 10 }
    else skipped++
  }

  console.log(`\n🎉 Done! ${uploaded} uploaded, ${skipped} skipped.`)
}

main().catch(console.error)
