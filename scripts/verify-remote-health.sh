#!/usr/bin/env bash
# Confirm /health responds and uptime increases (detects crash/restart loops).
set -euo pipefail

HEALTH_URL="${1:?HEALTH_URL required}"
INITIAL_WAIT="${2:-20}"
INTERVAL_WAIT="${3:-15}"
MIN_UPTIME_GROWTH="${4:-10}"

echo "Waiting ${INITIAL_WAIT}s for app to settle after deploy..."
sleep "$INITIAL_WAIT"

fetch_health() {
  curl -sf "$HEALTH_URL"
}

BODY=""
for attempt in 1 2 3 4 5 6; do
  if BODY=$(fetch_health 2>/dev/null); then
    break
  fi
  echo "Health attempt ${attempt} failed, retrying in 10s..."
  sleep 10
done

if [[ -z "$BODY" ]]; then
  echo "::error::Health check failed: no response from ${HEALTH_URL}"
  echo "Check cPanel Node.js stderr logs. Common causes: missing node_modules (run NPM Install), migration failure, app paused."
  exit 1
fi

read_uptime() {
  node -e "
    let data = '';
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => {
      const body = JSON.parse(data);
      if (body.status !== 'healthy') {
        console.error('Unexpected health status:', body.status);
        process.exit(2);
      }
      process.stdout.write(String(body.uptime));
    });
  "
}

U1=$(echo "$BODY" | read_uptime)
echo "First uptime: ${U1}s"

sleep "$INTERVAL_WAIT"

BODY2=$(fetch_health) || {
  echo "::error::Health check failed on second request"
  exit 1
}

U2=$(echo "$BODY2" | read_uptime)
echo "Second uptime: ${U2}s"

node -e "
const u1 = parseFloat(process.argv[1]);
const u2 = parseFloat(process.argv[2]);
const minGrowth = parseFloat(process.argv[3]);
const growth = u2 - u1;
if (!Number.isFinite(u1) || !Number.isFinite(u2) || growth < minGrowth) {
  console.error('::error::Uptime did not grow enough (possible crash loop).', u1, '->', u2, 'growth', growth);
  process.exit(1);
}
console.log('✅ Health stable — uptime grew', u1, '->', u2, '(+' + growth.toFixed(1) + 's)');
" "$U1" "$U2" "$MIN_UPTIME_GROWTH"

echo "$BODY2"
