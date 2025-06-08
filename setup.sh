#!/usr/bin/env bash
set -e

# Determine offline mode from argument or environment variable
OFFLINE="${OFFLINE:-0}"
for arg in "$@"; do
  case "$arg" in
    --offline)
      OFFLINE=1
      ;;
  esac
done

# Create and activate Python virtual environment
if [ ! -d ".venv" ]; then
  python -m venv .venv
fi
source .venv/bin/activate

if [ "$OFFLINE" -eq 1 ]; then
  echo "Offline mode enabled. Skipping pip install and npm install."
  echo "Enable internet access or run without --offline when you're online to install dependencies."
else
  pip install -r requirements.txt
  npm install
fi

npm run tsc
