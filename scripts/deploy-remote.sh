#!/usr/bin/env bash
# Rendered at deploy time (tmp/deploy-remote.run.sh). Do not run directly.
echo "deploy-remote: starting"

set -uo pipefail

DEPLOY_DIR="@DEPLOY_DIR@"
FTP_DIR="@FTP_DIR@"

load_node_path() {
  if command -v node >/dev/null 2>&1; then
    return 0
  fi

  if [ -f "$HOME/.bashrc" ]; then
    # shellcheck disable=SC1090
    . "$HOME/.bashrc" >/dev/null 2>&1 || true
  fi

  if command -v node >/dev/null 2>&1; then
    return 0
  fi

  for node_bin in "$HOME"/nodevenv/*/bin/node; do
    if [ -x "$node_bin" ]; then
      export PATH="$(dirname "$node_bin"):$PATH"
      return 0
    fi
  done

  return 1
}

echo "Step: load node"
if ! load_node_path; then
  echo "::error::node not found in PATH (check cPanel Node.js app / bashrc)"
  exit 1
fi

echo "- Node version: $(node --version)"
echo "- Node path: $(command -v node)"

if ! cd "$DEPLOY_DIR"; then
  echo "::error::Cannot cd to DEPLOY_PATH: $DEPLOY_DIR"
  exit 1
fi

echo "Step: deploy diagnostics"
echo "Deploy diagnostics:"
echo "- SSH deploy directory: $(pwd)"
echo "- FTP upload directory: $FTP_DIR"
echo "- directory listing:"
ls -la

if [ ! -f package.json ] || [ ! -f package-lock.json ]; then
  echo "::error::package.json or package-lock.json is missing in the deploy directory."
  echo "DEPLOY_PATH must match the folder FTPS uploads to (Node app root on cPanel)."
  exit 1
fi

LOCK_HASH_FILE=".package-lock.sha256"
CURRENT_LOCK_HASH="$(sha256sum package-lock.json | awk '{print $1}')"
PREVIOUS_LOCK_HASH=""

if [ -f "$LOCK_HASH_FILE" ]; then
  PREVIOUS_LOCK_HASH="$(cat "$LOCK_HASH_FILE")"
fi

if [ ! -d node_modules ] || [ "$CURRENT_LOCK_HASH" != "$PREVIOUS_LOCK_HASH" ]; then
  echo "Step: npm ci (production dependencies)"
  echo "Installing production dependencies"
  npm ci --omit=dev --no-audit --no-fund
  printf '%s\n' "$CURRENT_LOCK_HASH" > "$LOCK_HASH_FILE"
else
  echo "Step: skip npm ci (lockfile unchanged)"
  echo "Skipping dependency install (lockfile unchanged)"
fi

echo "Step: db:test"
npm run db:test

echo "Step: db:migrate"
npm run db:migrate
echo "Database migrations: OK"

echo "Step: verify migrations"
node scripts/verify-migrations.js

echo "Step: restart signal"
echo "Deployment complete. Run 'node scripts/cli.js setup-token' to generate setup URL."

mkdir -p tmp
date > tmp/restart.txt
echo "Restart signal written to tmp/restart.txt"
