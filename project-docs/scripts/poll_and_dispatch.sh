#!/data/data/com.termux/files/usr/bin/bash
# CalBizHR task poller/dispatcher for Termux.
#
# Checks project-docs/tasks/ for undispatched tasks (no matching report yet).
# Both Claude Code and Antigravity CLI have confirmed headless modes, so both
# get auto-dispatched -- no manual paste needed for either, as long as setup
# below is done first.
#
# IMPORTANT ASSUMPTION: this script assigns the next TWO undispatched task
# numbers to the two tools, on the assumption that Claude (the planning
# instance) has already confirmed those two specific tasks are file-disjoint
# and safe to run in parallel. It does NOT verify this itself -- it can't
# reason about task content. Only run this when Claude has explicitly said
# a given pair is safe. Running it blindly risks both tools colliding on the
# same files.
#
# Setup (run once):
#   pkg install termux-api git
#   (install the Termux:API companion app from F-Droid/Play Store)
#   Claude Code: already confirmed working via `claude` command
#   Antigravity CLI: confirm `agy` is on PATH (installer default:
#     ~/.local/bin/agy). Then pre-authorize the commands it needs, since
#     headless mode soft-denies shell commands by default (fails silently,
#     exits 0, does nothing -- easy to miss). Add to
#     ~/.gemini/antigravity-cli/settings.json:
#     { "permissions": { "allow": ["command(git)", "command(pnpm)", "command(node)"] } }
#   crontab -e   # add: */10 * * * * bash /path/to/this/script.sh
# Or run it directly in a loop if you don't have cron set up:
#   while true; do bash poll_and_dispatch.sh; sleep 600; done

set -euo pipefail

REPO_DIR="${REPO_DIR:-$HOME/HRM}"
BRANCH="phase-1-foundation"

cd "$REPO_DIR"
git fetch origin -q
git checkout -q "$BRANCH"
git pull -q origin "$BRANCH"

# Find up to 2 undispatched tasks, lowest-numbered first
UNDISPATCHED=()
for f in project-docs/tasks/[0-9]*.md; do
  num=$(basename "$f" | grep -oP '^\d+')
  report="project-docs/reports/${num}_REPORT.md"
  if [ ! -f "$report" ]; then
    UNDISPATCHED+=("$num")
  fi
  [ "${#UNDISPATCHED[@]}" -ge 2 ] && break
done

if [ "${#UNDISPATCHED[@]}" -eq 0 ]; then
  echo "No undispatched tasks found. Nothing to do."
  exit 0
fi

notify() {
  if command -v termux-notification >/dev/null 2>&1; then
    termux-notification --title "CalBizHR: Task $1" --content "$2" --id "poll-$1"
  fi
}

dispatch_prompt() {
  local num="$1" tool="$2"
  local task_file
  task_file=$(ls project-docs/tasks/${num}_*.md)
  local branch="agent/${tool}-${num}"
  echo "Pull the latest from the phase-1-foundation branch of this repo. Create a new branch called ${branch} off it. Read $(basename "$task_file") in project-docs/tasks/ completely and execute exactly what it specifies. Run its verification steps yourself. Write your report to project-docs/reports/${num}_REPORT.md. Commit everything to ${branch} and push that branch -- do NOT push to phase-1-foundation directly. If anything is ambiguous or requires a decision outside your authority, stop and note it in the report instead of guessing."
}

# First undispatched task -> Claude Code
NUM1="${UNDISPATCHED[0]}"
notify "$NUM1" "Auto-dispatching to Claude Code"
if command -v claude >/dev/null 2>&1; then
  claude -p "$(dispatch_prompt "$NUM1" "claude-code")" --allowedTools "Read,Edit,Bash,Write" --permission-mode acceptEdits \
    || echo "Claude Code headless dispatch failed for task ${NUM1} -- check manually."
else
  echo "claude CLI not found -- task ${NUM1} needs manual dispatch."
fi

# Second undispatched task (if any) -> Antigravity
if [ "${#UNDISPATCHED[@]}" -ge 2 ]; then
  NUM2="${UNDISPATCHED[1]}"
  notify "$NUM2" "Auto-dispatching to Antigravity"
  if command -v agy >/dev/null 2>&1; then
    agy -p "$(dispatch_prompt "$NUM2" "antigravity")" \
      || echo "Antigravity headless dispatch failed for task ${NUM2} -- check manually (also check settings.json permissions.allow if it exited 0 but did nothing)."
  else
    echo "agy CLI not found -- task ${NUM2} needs manual dispatch."
  fi
fi
