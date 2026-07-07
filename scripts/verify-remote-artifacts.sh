#!/usr/bin/env bash
# Verify critical deploy artifacts exist on the server via FTP/FTPS.
set -euo pipefail

: "${FTP_HOST:?FTP_HOST required}"
: "${FTP_USER:?FTP_USER required}"
: "${FTP_PASS:?FTP_PASS required}"
: "${FTP_DIR:?FTP_DIR required}"

FTP_PROTOCOL="${FTP_PROTOCOL:-ftp}"
EXPECTED_SHA="${EXPECTED_SHA:-}"

DIR="${FTP_DIR%/}"
case "$DIR" in
  /*) ;;
  *) DIR="/$DIR" ;;
esac

CURL_OPTS=( --user "${FTP_USER}:${FTP_PASS}" --ftp-pasv )
if [[ "$FTP_PROTOCOL" == "ftps" ]]; then
  CURL_OPTS+=( --ssl-reqd )
fi

ftp_probe() {
  local remote_path="$1"
  local url="${FTP_PROTOCOL}://${FTP_HOST}${DIR}/${remote_path}"
  curl -sf "${CURL_OPTS[@]}" -o /dev/null "$url"
}

ftp_download() {
  local remote_path="$1"
  local dest="$2"
  local url="${FTP_PROTOCOL}://${FTP_HOST}${DIR}/${remote_path}"
  curl -sf "${CURL_OPTS[@]}" -o "$dest" "$url"
}

REQUIRED_FILES=(
  app.js
  dist/css/app.css
  dist/asset-version.txt
)

REQUIRED_PACKAGES=(
  fastify
  mysql2
  drizzle-orm
  zod
)

echo "Verifying remote deploy artifacts at ${DIR}..."

for file in "${REQUIRED_FILES[@]}"; do
  if ftp_probe "$file"; then
    echo "✅ ${file}"
  else
    echo "::error::Missing remote file: ${DIR}/${file}"
    exit 1
  fi
done

for pkg in "${REQUIRED_PACKAGES[@]}"; do
  if ftp_probe "node_modules/${pkg}/package.json"; then
    echo "✅ node_modules/${pkg}"
  else
    echo "::error::Missing remote dependency: ${pkg}. Run NPM Install in cPanel Node.js App."
    exit 1
  fi
done

if [[ -n "$EXPECTED_SHA" ]]; then
  TMP_FILE="$(mktemp)"
  ftp_download "dist/asset-version.txt" "$TMP_FILE"
  REMOTE_SHA="$(tr -d '[:space:]' < "$TMP_FILE")"
  rm -f "$TMP_FILE"

  if [[ "$REMOTE_SHA" != "$EXPECTED_SHA" ]]; then
    echo "::error::Remote asset-version.txt (${REMOTE_SHA}) does not match deploy SHA (${EXPECTED_SHA})"
    exit 1
  fi
  echo "✅ asset-version.txt matches deploy SHA"
fi

echo "✅ Remote deploy artifacts verified"
