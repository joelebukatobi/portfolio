#!/usr/bin/env bash
# Verify node_modules exists on the server after FTP deploy (never uploaded by CI).
set -euo pipefail

: "${FTP_HOST:?FTP_HOST required}"
: "${FTP_USER:?FTP_USER required}"
: "${FTP_PASS:?FTP_PASS required}"
: "${FTP_DIR:?FTP_DIR required}"

FTP_PROTOCOL="${FTP_PROTOCOL:-ftp}"

DIR="${FTP_DIR%/}"
case "$DIR" in
  /*) ;;
  *) DIR="/$DIR" ;;
esac

URL="${FTP_PROTOCOL}://${FTP_HOST}${DIR}/node_modules/fastify/package.json"

CURL_OPTS=( -sf --user "${FTP_USER}:${FTP_PASS}" -o /dev/null --ftp-pasv )
if [[ "$FTP_PROTOCOL" == "ftps" ]]; then
  CURL_OPTS+=( --ssl-reqd )
fi

if curl "${CURL_OPTS[@]}" "$URL"; then
  echo "✅ Remote node_modules verified (fastify present at ${DIR})"
else
  echo "::error::node_modules missing on server at ${DIR}. Run NPM Install in cPanel Node.js App, then re-run deploy or restart the app."
  exit 1
fi
