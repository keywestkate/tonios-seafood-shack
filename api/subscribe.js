/**
 * TONIO'S — Newsletter Signup API
 *
 * POST /api/subscribe
 * Body: { firstName, email, phone? }
 *
 * 1. Validates input
 * 2. Saves subscriber to Sanity CMS (always)
 * 3. Syncs to Mailchimp (best-effort — never blocks the signup)
 *
 * Environment variables (set in Vercel project settings):
 *   SANITY_PROJECT_ID   — e.g. 3laoz40d
 *   SANITY_DATASET      — production
 *   SANITY_WRITE_TOKEN  — Sanity API token with write access
 *   MAILCHIMP_API_KEY   — e.g. abc123...xyz-us14
 *   MAILCHIMP_LIST_ID   — Audience/List ID from Mailchimp
 */

export default async function handler(req, res) {
  // CORS — allow same-origin + Vercel preview URLs
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  /* ── Parse body ─────────────────────────────────────────────── */
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const firstName = (body.firstName || '').trim();
  const email     = (body.email     || '').trim().toLowerCase();
  const phone     = (body.phone     || '').trim();

  if (!firstName || !email) {
    return res.status(400).json({ error: 'First name and email are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const signedUpAt = new Date().toISOString();
  const results    = { sanity: false, mailchimp: false, mailchimpError: null };

  /* ── 1. Save to Sanity ──────────────────────────────────────── */
  const projectId = process.env.SANITY_PROJECT_ID || '3laoz40d';
  const dataset   = process.env.SANITY_DATASET    || 'production';
  const writeToken = process.env.SANITY_WRITE_TOKEN;

  if (writeToken) {
    try {
      const sanityRes = await fetch(
        `https://${projectId}.api.sanity.io/v2021-10-21/data/mutate/${dataset}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${writeToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mutations: [{
              create: {
                _type:      'newsletterSignup',
                firstName,
                email,
                phone:      phone || null,
                signedUpAt,
                consent:    true,
                source:     'Homepage',
                mailchimpSynced: false,
                notes:      '',
              },
            }],
          }),
        }
      );
      if (sanityRes.ok) {
        results.sanity = true;
        // Fire-and-forget: mark mailchimpSynced after Mailchimp call below
      } else {
        const errBody = await sanityRes.text();
        console.error('[Sanity] Write failed:', sanityRes.status, errBody);
      }
    } catch (err) {
      console.error('[Sanity] Fetch error:', err.message);
    }
  } else {
    console.warn('[Sanity] No write token — subscriber not saved to CMS.');
  }

  /* ── 2. Sync to Mailchimp ───────────────────────────────────── */
  const mcKey    = process.env.MAILCHIMP_API_KEY;
  const mcListId = process.env.MAILCHIMP_LIST_ID;

  if (mcKey && mcListId) {
    const dc = mcKey.split('-').pop(); // server prefix, e.g. "us14"
    try {
      const mcRes = await fetch(
        `https://${dc}.api.mailchimp.com/3.0/lists/${mcListId}/members`,
        {
          method: 'POST',
          headers: {
            'Authorization': `apikey ${mcKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email_address: email,
            status:        'subscribed',
            merge_fields: {
              FNAME: firstName,
              PHONE: phone || '',
            },
            tags: ['Website Signup'],
          }),
        }
      );

      if (mcRes.ok) {
        results.mailchimp = true;
      } else {
        const mcData = await mcRes.json();
        // "Member Exists" is fine — they're already on the list
        if (mcData.title === 'Member Exists') {
          results.mailchimp = true;
        } else {
          results.mailchimpError = mcData.detail || mcData.title || 'Unknown error';
          console.error('[Mailchimp] API error:', results.mailchimpError);
        }
      }
    } catch (err) {
      results.mailchimpError = err.message;
      console.error('[Mailchimp] Fetch error:', err.message);
    }
  } else {
    console.warn('[Mailchimp] API key or list ID not configured — skipping sync.');
    results.mailchimpError = 'Not configured';
  }

  /* ── Respond ────────────────────────────────────────────────── */
  // Always return success as long as Sanity saved (or no write token set yet)
  // Never expose internal errors to the visitor
  if (results.sanity || !writeToken) {
    return res.status(200).json({
      success: true,
      mailchimp: results.mailchimp,
    });
  }

  // If Sanity failed entirely, let the client know so they can retry
  return res.status(500).json({
    error: 'Something went wrong. Please try again.',
  });
}
