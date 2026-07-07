#!/usr/bin/env bash
# Verify critical deploy artifacts are live over HTTP (FTP cannot read node_modules on cPanel).
set -euo pipefail

BASE_URL="${1:?BASE_URL required (e.g. https://dev.example.com)}"
EXPECTED_SHA="${2:?EXPECTED_SHA required (deploy git SHA)}"

BASE_URL="${BASE_URL%/}"

echo "Verifying deployed artifacts at ${BASE_URL}..."

ASSET_VERSION="$(curl -sf "${BASE_URL}/dist/asset-version.txt" | tr -d '[:space:]')"
if [[ -z "$ASSET_VERSION" ]]; then
  echo "::error::Could not read /dist/asset-version.txt"
  exit 1
fi

if [[ "$ASSET_VERSION" != "$EXPECTED_SHA" ]]; then
  echo "::error::asset-version.txt (${ASSET_VERSION}) does not match deploy SHA (${EXPECTED_SHA})"
  exit 1
fi
echo "✅ dist/asset-version.txt matches deploy SHA"

if curl -sf -o /dev/null "${BASE_URL}/dist/css/app.css"; then
  echo "✅ dist/css/app.css is served"
else
  echo "::error::dist/css/app.css is not reachable"
  exit 1
fi

if curl -sf -o /dev/null "${BASE_URL}/dist/css/admin.css"; then
  echo "✅ dist/css/admin.css is served"
else
  echo "::error::dist/css/admin.css is not reachable"
  exit 1
fi

echo "✅ Deployed artifacts verified over HTTP"
