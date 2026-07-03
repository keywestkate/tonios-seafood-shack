#!/usr/bin/env node
/**
 * Post-build patcher for Tonio's Sanity Studio.
 * Runs after `sanity build` to inject Tonio's branding into the HTML shell
 * before the deploy step uploads the dist folder.
 */
const fs   = require('fs')
const path = require('path')

const DIST   = path.join(__dirname, 'dist')
const STATIC = path.join(__dirname, 'static')

/* ── 1. Patch index.html title ─────────────────────────────── */
const htmlPath = path.join(DIST, 'index.html')
let html = fs.readFileSync(htmlPath, 'utf8')

html = html
  .replace('<title>Sanity Studio</title>', "<title>Tonio's Seafood Shack CMS</title>")
  // Inject theme-color meta for mobile browser chrome
  .replace(
    '<meta content="same-origin" name="referrer"/>',
    '<meta content="same-origin" name="referrer"/><meta name="theme-color" content="#102F34"/>'
  )

fs.writeFileSync(htmlPath, html, 'utf8')
console.log('✅ Patched dist/index.html title → Tonio\'s Seafood Shack CMS')

/* ── 2. Copy Tonio's static assets into dist/static ────────── */
const ASSET_MAP = {
  'favicon.ico':        'favicon.ico',
  'favicon-32x32.png':  'favicon-32x32.png',
  'favicon-16x16.png':  'favicon-16x16.png',
  'apple-touch-icon.png': 'apple-touch-icon.png',
  'tonios-logo.png':    'tonios-logo.png',
  'tonios-sign.png':    'tonios-sign.png',
}

const distStatic = path.join(DIST, 'static')

for (const [src, dest] of Object.entries(ASSET_MAP)) {
  const srcPath  = path.join(STATIC, src)
  const destPath = path.join(distStatic, dest)
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath)
    console.log(`✅ Copied static/${src} → dist/static/${dest}`)
  } else {
    console.warn(`⚠️  Missing: static/${src} — skipping`)
  }
}

/* ── 3. Patch web manifest ─────────────────────────────────── */
const manifestPath = path.join(distStatic, 'manifest.webmanifest')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

manifest.name            = "Tonio's Seafood Shack CMS"
manifest.short_name      = "Tonio's CMS"
manifest.background_color = '#102F34'
manifest.theme_color      = '#102F34'
manifest.start_url        = '/'
manifest.display          = 'standalone'

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8')
console.log('✅ Patched manifest.webmanifest')

console.log('\n🍹 Tonio\'s branding applied to Studio build.')
