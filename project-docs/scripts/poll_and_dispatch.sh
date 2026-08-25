#!/data/data/com.termux/files/usr/bin/bash
# CalBizHR task poller/dispatcher for Termux.
#
# Checks project-docs/tasks/ for the lowest-numbered task with no matching
# report and no branch already in progress. If found:
#   - Claude Code: auto-dispatched headlessly (claude -p), fully unattended
#   - Antigravity: NOT auto-dispatched (no confirmed headless CLI mode) --
#     fires a Termux notification instead so you know to paste manually
#
# Setup (run once):
#   pkg install termux-api git
#   (install the Termux:API companion app from F-Droid/Play Store)
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

# Find the lowest-numbered task with no matching report
NEXT_TASK=""
for f in project-docs/tasks/[0-9]*.md; do
  num=$(basename "$f" | grep -oP '^\d+')
  report="project-docs/reports/${num}_REPORT.md"
  if [ ! -f "$report" ]; then
    NEXT_TASK="$num"
    break
  fi
done

if [ -z "$NEXT_TASK" ]; then
  echo "No undispatched tasks found. Nothing to do."
  exit 0
fi

TASK_FILE="project-docs/tasks/${NEXT_TASK}_"*.md
SUMMARY="New task ${NEXT_TASK} available: $(basename $TASK_FILE)"

# Always notify, regardless of whether Claude Code auto-dispatch succeeds --
# this is the fallback that always works.
if command -v termux-notification >/dev/null 2>&1; then
  termux-notification --title "CalBizHR: Task ${NEXT_TASK}" --content "$SUMMARY" --id "poll-${NEXT_TASK}"
fi

# Attempt Claude Code headless auto-dispatch
if command -v claude >/dev/null 2>&1; then
  BRANCH_NAME="agent/claude-code-${NEXT_TASK}"
  DISPATCH_PROMPT="Pull the latest from the phase-1-foundation branch of this repo. Create a new branch called ${BRANCH_NAME} off it. Read $(basename $TASK_FILE) in project-docs/tasks/ completely and execute exactly what it specifies. Run its verification steps yourself. Write your report to project-docs/reports/${NEXT_TASK}_REPORT.md. Commit everything to ${BRANCH_NAME} and push that branch -- do NOT push to phase-1-foundation directly. If anything is ambiguous or requires a decision outside your authority, stop and note it in the report instead of guessing."

  echo "Auto-dispatching Task ${NEXT_TASK} to Claude Code (headless)..."
  claude -p "$DISPATCH_PROMPT" --allowedTools "Read,Edit,Bash,Write" --permission-mode acceptEdits || \
    echo "Claude Code headless dispatch failed -- check manually."
else
  echo "claude CLI not found -- Task ${NEXT_TASK} needs manual dispatch to both tools."
fi

echo "Antigravity: no confirmed headless mode -- dispatch Task ${NEXT_TASK} manually."
