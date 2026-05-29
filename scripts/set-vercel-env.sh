#!/usr/bin/env bash
# =============================================================================
# set-vercel-env.sh
# Automates pushing all required env vars to Vercel (production + preview + dev)
# Usage: bash scripts/set-vercel-env.sh
# =============================================================================

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

# Colors
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'

log()  { echo -e "${CYAN}[env-setup]${NC} $1"; }
ok()   { echo -e "${GREEN}✓${NC} $1"; }
warn() { echo -e "${YELLOW}⚠${NC}  $1"; }
err()  { echo -e "${RED}✗${NC} $1"; }

ENVS=("production" "preview" "development")

push_var() {
  local name="$1"
  local value="$2"
  local success=0

  for env in "${ENVS[@]}"; do
    # Remove existing value silently (ignore errors if not set)
    echo "$value" | npx vercel env rm "$name" "$env" --yes 2>/dev/null || true
    # Add new value
    if echo "$value" | npx vercel env add "$name" "$env" 2>/dev/null; then
      ok "  [$env] $name set"
      success=1
    else
      err "  [$env] Failed to set $name"
    fi
  done
  return $((1 - success))
}

read_secret() {
  local prompt="$1"
  local varname="$2"
  local default="${3:-}"

  if [[ -n "$default" ]]; then
    echo -e "${YELLOW}?${NC} $prompt [leave blank to skip]: "
  else
    echo -e "${YELLOW}?${NC} $prompt: "
  fi
  read -r -s value
  echo ""   # newline after hidden input
  echo "$value"
}

echo ""
echo -e "${CYAN}══════════════════════════════════════════${NC}"
echo -e "${CYAN}  CalHR AI — Vercel Environment Setup${NC}"
echo -e "${CYAN}══════════════════════════════════════════${NC}"
echo ""
log "Project: marios-projects-abca1e48/hrcomply-ai"
log "Environments: production, preview, development"
echo ""

# ─── SUPABASE ─────────────────────────────────────────────────────────────────
echo -e "${CYAN}── Supabase ─────────────────────────────${NC}"
echo "  Dashboard → https://supabase.com/dashboard/project/zteebziywhoglccgdxxn/settings/api"
echo ""

log "NEXT_PUBLIC_SUPABASE_URL"
echo -n "  Paste value (starts with https://): "
read -r SUPABASE_URL
if [[ -n "$SUPABASE_URL" ]]; then
  push_var "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL"
else
  warn "Skipped NEXT_PUBLIC_SUPABASE_URL"
fi
echo ""

log "NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo -n "  Paste anon/public key: "
read -r -s SUPABASE_ANON_KEY; echo ""
if [[ -n "$SUPABASE_ANON_KEY" ]]; then
  push_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY"
else
  warn "Skipped NEXT_PUBLIC_SUPABASE_ANON_KEY"
fi
echo ""

log "SUPABASE_SERVICE_ROLE_KEY  (server-side only — keep secret)"
echo -n "  Paste service_role key: "
read -r -s SUPABASE_SERVICE_KEY; echo ""
if [[ -n "$SUPABASE_SERVICE_KEY" ]]; then
  push_var "SUPABASE_SERVICE_ROLE_KEY" "$SUPABASE_SERVICE_KEY"
else
  warn "Skipped SUPABASE_SERVICE_ROLE_KEY"
fi
echo ""

# ─── STRIPE ───────────────────────────────────────────────────────────────────
echo -e "${CYAN}── Stripe ───────────────────────────────${NC}"
echo "  Dashboard → https://dashboard.stripe.com/apikeys"
echo ""

log "STRIPE_SECRET_KEY  (starts with sk_)"
echo -n "  Paste secret key: "
read -r -s STRIPE_SECRET; echo ""
if [[ -n "$STRIPE_SECRET" ]]; then
  push_var "STRIPE_SECRET_KEY" "$STRIPE_SECRET"
else
  warn "Skipped STRIPE_SECRET_KEY"
fi
echo ""

log "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  (starts with pk_)"
echo -n "  Paste publishable key: "
read -r STRIPE_PK
if [[ -n "$STRIPE_PK" ]]; then
  push_var "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "$STRIPE_PK"
else
  warn "Skipped NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
fi
echo ""

# ─── SITE URL ─────────────────────────────────────────────────────────────────
echo -e "${CYAN}── Site URL ─────────────────────────────${NC}"
log "NEXT_PUBLIC_SITE_URL  (your Vercel deployment URL)"
echo -n "  Paste URL (e.g. https://hrcomply-ai.vercel.app): "
read -r SITE_URL
if [[ -n "$SITE_URL" ]]; then
  push_var "NEXT_PUBLIC_SITE_URL" "$SITE_URL"
else
  warn "Skipped NEXT_PUBLIC_SITE_URL — using default vercel.app domain"
fi
echo ""

# ─── SUMMARY ──────────────────────────────────────────────────────────────────
echo -e "${CYAN}══════════════════════════════════════════${NC}"
log "Done! Verifying vars in Vercel..."
echo ""
npx vercel env ls 2>&1
echo ""
echo -e "${GREEN}All done.${NC} You can now deploy with:"
echo ""
echo "  npx vercel build --prod && npx vercel deploy --prebuilt --prod"
echo ""
