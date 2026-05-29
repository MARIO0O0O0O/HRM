#!/usr/bin/env bash
# =============================================================================
# set-vercel-env.sh
# Pushes all required env vars to Vercel (production + preview + development)
# Usage: bash scripts/set-vercel-env.sh
# =============================================================================
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
log()  { echo -e "${CYAN}[env]${NC} $1"; }
ok()   { echo -e "  ${GREEN}✓${NC} $1"; }
warn() { echo -e "  ${YELLOW}⚠${NC}  $1"; }
err()  { echo -e "  ${RED}✗${NC} $1"; }

# Push a var to all three environments
push_var() {
  local name="$1" value="$2"
  local envs=("production" "preview" "development")
  for env in "${envs[@]}"; do
    if npx vercel env add "$name" "$env" --value "$value" --yes --force 2>/dev/null; then
      ok "[$env] $name"
    else
      err "[$env] $name — check CLI auth"
    fi
  done
}

read_secret() {
  local prompt="$1"
  echo -n "  ${YELLOW}?${NC} ${prompt}: "
  local val
  read -r -s val; echo ""
  echo "$val"
}

echo ""
echo -e "${CYAN}══════════════════════════════════════════${NC}"
echo -e "${CYAN}  CalHR AI — Vercel Environment Setup${NC}"
echo -e "${CYAN}══════════════════════════════════════════${NC}"
echo ""

# ── SUPABASE ──────────────────────────────────────────────────────────────────
echo -e "${CYAN}── Supabase ─────────────────────────────────────────${NC}"
echo "  https://supabase.com/dashboard/project/zteebziywhoglccgdxxn/settings/api"
echo ""

# URL is already set — skip if confirmed
log "NEXT_PUBLIC_SUPABASE_URL (already set to https://zteebziywhoglccgdxxn.supabase.co)"
echo -n "  Press ENTER to keep existing, or paste new value: "
read -r SUPABASE_URL
if [[ -n "$SUPABASE_URL" ]]; then
  push_var "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL"
else
  ok "Kept existing NEXT_PUBLIC_SUPABASE_URL"
fi
echo ""

log "NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "  Find this at Settings → API → 'anon / public' (long JWT starting with eyJ...)"
ANON_KEY=$(read_secret "Paste anon key")
if [[ -n "$ANON_KEY" ]]; then
  push_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$ANON_KEY"
else
  warn "Skipped NEXT_PUBLIC_SUPABASE_ANON_KEY"
fi
echo ""

log "SUPABASE_SERVICE_ROLE_KEY  ⚠ KEEP SECRET — never expose client-side"
echo "  Find this at Settings → API → 'service_role'"
echo ""
echo -e "  ${YELLOW}SECURE OPTION:${NC} Instead of typing here, you can set this directly at:"
echo "  https://vercel.com/marios-projects-abca1e48/hrcomply-ai/settings/environment-variables"
echo ""
SERVICE_KEY=$(read_secret "Paste service_role key (input hidden)")
if [[ -n "$SERVICE_KEY" ]]; then
  push_var "SUPABASE_SERVICE_ROLE_KEY" "$SERVICE_KEY"
else
  warn "Skipped SUPABASE_SERVICE_ROLE_KEY — set it manually in Vercel dashboard"
fi
echo ""

# ── STRIPE (FUTURE) ───────────────────────────────────────────────────────────
echo -e "${CYAN}── Stripe (plumbed — activate later) ───────────────${NC}"
echo "  https://dashboard.stripe.com/apikeys"
echo ""

log "NEXT_PUBLIC_STRIPE_ENABLED — set false until keys are ready"
push_var "NEXT_PUBLIC_STRIPE_ENABLED" "false"
echo ""

log "STRIPE_SECRET_KEY  (optional — press ENTER to skip)"
STRIPE_SK=$(read_secret "Paste secret key (sk_test_... or sk_live_...) — or ENTER to skip")
if [[ -n "$STRIPE_SK" ]]; then
  push_var "STRIPE_SECRET_KEY" "$STRIPE_SK"
else
  warn "Skipped STRIPE_SECRET_KEY — add later and flip NEXT_PUBLIC_STRIPE_ENABLED=true"
fi
echo ""

log "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  (optional — press ENTER to skip)"
echo -n "  Paste publishable key (pk_...) — or ENTER to skip: "
read -r STRIPE_PK
if [[ -n "$STRIPE_PK" ]]; then
  push_var "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "$STRIPE_PK"
else
  warn "Skipped NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
fi
echo ""

log "STRIPE_WEBHOOK_SECRET  (optional — configure after Stripe is set up)"
STRIPE_WH=$(read_secret "Paste webhook secret (whsec_...) — or ENTER to skip")
if [[ -n "$STRIPE_WH" ]]; then
  push_var "STRIPE_WEBHOOK_SECRET" "$STRIPE_WH"
else
  warn "Skipped STRIPE_WEBHOOK_SECRET"
fi
echo ""

# ── SITE URL ──────────────────────────────────────────────────────────────────
echo -e "${CYAN}── Site URL ─────────────────────────────────────────${NC}"
log "NEXT_PUBLIC_SITE_URL"
echo -n "  Paste deployment URL (e.g. https://hrcomply-ai.vercel.app): "
read -r SITE_URL
if [[ -n "$SITE_URL" ]]; then
  push_var "NEXT_PUBLIC_SITE_URL" "$SITE_URL"
else
  warn "Skipped NEXT_PUBLIC_SITE_URL"
fi
echo ""

# ── SUMMARY ───────────────────────────────────────────────────────────────────
echo -e "${CYAN}══════════════════════════════════════════${NC}"
log "Current Vercel env vars:"
echo ""
npx vercel env ls 2>&1
echo ""
echo -e "${GREEN}Done!${NC} Deploy with: pnpm run deploy"
echo ""
