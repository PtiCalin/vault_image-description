#!/usr/bin/env bash
set -e

# ---------------------------------------------------------------------------
# Setup script for the Vault Image Description project.
#
# This script creates a Python virtual environment, installs Python and Node
# dependencies, and compiles the TypeScript code.
#
# Dependencies:
#   - Python 3 with the `venv` module
#   - Node.js and npm
#
# Example (online):
#   ./setup.sh
#   > Creating virtual environment...
#   > Installing dependencies...
#   > Building TypeScript...
#
# Example (offline):
#   ./setup.sh --offline
#   > Creating virtual environment...
#   > Offline mode enabled. Skipping dependency installation.
#   > Building TypeScript...
# ---------------------------------------------------------------------------

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
  echo "Creating virtual environment at .venv..."
  python -m venv .venv
else
  echo "Using existing virtual environment at .venv..."
fi
echo "Activating virtual environment..."
source .venv/bin/activate

if [ "$OFFLINE" -eq 1 ]; then
  echo "Offline mode enabled. Skipping dependency installation."
  echo "Run again without --offline when you're online to fetch everything."
else
  echo "Installing Python dependencies..."
  pip install -r requirements.txt
  echo "Installing Node packages..."
  npm install
fi

echo "Compiling TypeScript..."
npm run tsc
