#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Tonio's Sanity Studio — One-time setup script
# Run this once from the studio/ directory to get everything working.
# ─────────────────────────────────────────────────────────────────────────────

set -e

BOLD="\033[1m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
CYAN="\033[0;36m"
RESET="\033[0m"

echo ""
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "${BOLD}  Tonio's Sanity Studio — Setup${RESET}"
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

# Step 1 — Install dependencies
echo -e "${CYAN}Step 1/3:${RESET} Installing dependencies..."
npm install
echo -e "${GREEN}✓ Dependencies installed.${RESET}"
echo ""

# Step 2 — Login
echo -e "${CYAN}Step 2/3:${RESET} Log in to Sanity"
echo ""
echo "  Run this command to log in with your Sanity account:"
echo ""
echo -e "  ${BOLD}npx sanity@latest login${RESET}"
echo ""
echo "  This will open a browser window. Log in with Google or email."
echo "  Come back here when it says 'Login successful'."
echo ""

# Step 3 — Init project
echo -e "${CYAN}Step 3/3:${RESET} Create or link your Sanity project"
echo ""
echo "  After logging in, run:"
echo ""
echo -e "  ${BOLD}npx sanity@latest init --env${RESET}"
echo ""
echo "  This will:"
echo "    • Let you create a new Sanity project (or use an existing one)"
echo "    • Set the dataset to 'production'"
echo "    • Write your Project ID to the .env.local file automatically"
echo ""

echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "${YELLOW}Where your Project ID goes:${RESET}"
echo ""
echo "  The Project ID is saved to TWO places:"
echo ""
echo "  1. studio/.env.local  ← the Studio reads it from here"
echo "     SANITY_STUDIO_PROJECT_ID=abc123xyz"
echo ""
echo "  2. ../sanity-client.js ← the website reads it from here"
echo "     Open that file and replace YOUR_PROJECT_ID_HERE"
echo "     with the same ID."
echo ""
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""
echo "  Once both files have the Project ID, run:"
echo ""
echo -e "  ${BOLD}npm run dev${RESET}   ← launches the CMS on localhost:3333"
echo ""
echo "  To deploy the Studio to Vercel so Tony can access it from anywhere:"
echo ""
echo -e "  ${BOLD}npm run deploy${RESET}   ← deploys to sanity.studio (Sanity's hosting)"
echo "    or push the studio/ folder to a Vercel project as a Next.js app."
echo ""
echo -e "${GREEN}Setup complete. Follow the steps above to finish.${RESET}"
echo ""
