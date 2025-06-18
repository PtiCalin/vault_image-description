#!/usr/bin/env bash
set -e

# ---------------------------------------------------------------------------
# Setup script for the Vault Image Description project.
#
# This script prepares a Python virtual environment, installs both Python and
# Node dependencies, and compiles the TypeScript source. It can operate in an
# offline mode where dependency installation is skipped.
#
# Dependencies:
#   - Python 3 with the `venv` module
#   - Node.js and npm
#
# Example (online):
#   ./setup.sh
#   > Creating virtual environment at .venv...
#   > Installing Python dependencies...
#   > Installing Node packages...
#   > Compiling TypeScript to JavaScript...
#
# Example (offline):
#   ./setup.sh --offline
#   > Creating virtual environment at .venv...
#   > Offline mode detected. We'll skip installing dependencies for now.
#   > Compiling TypeScript to JavaScript...
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
  echo "Creating a fresh virtual environment at .venv to keep things tidy."
  python -m venv .venv
else
  echo "Using the existing virtual environment at .venv. No need to recreate it."
fi
echo "Activating the virtual environment for this session..."
source .venv/bin/activate

if [ "$OFFLINE" -eq 1 ]; then
  echo "Offline mode detected, so we'll skip installing dependencies for now."
  echo "Whenever you're back online, run the script again without --offline to grab the dependencies."
else
  echo "Installing Python dependencies. This may take a moment..."
  pip install -r requirements.txt
  echo "Now installing Node packages..."
  npm install
fi

echo "Compiling TypeScript to JavaScript. Almost there..."
npm run tsc
