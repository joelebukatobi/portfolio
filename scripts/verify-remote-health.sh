#!/usr/bin/env bash
# Confirm /health responds, uptime increases, and deep checks pass.
set -euo pipefail

HEALTH_URL="${1:?HEALTH_URL required}"
INITIAL_WAIT="${2:-20}"
INTERVAL_WAIT="${3:-15}"
MIN_UPTIME_GROWTH="${4:-10}"

EXPECTED_ASSET_VERSION="${EXPECTED_ASSET_VERSION:-}"
EXPECTED_ENV="${EXPECTED_ENV:-}"

echo "Waiting ${INITIAL_WAIT}s for app to settle after deploy..."
sleep "$INITIAL_WAIT"

fetch_health() {
  curl -sS "$HEALTH_URL"
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

read_field() {
  local field="$1"
  node -e "
    let data = '';
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => {
      const body = JSON.parse(data);
      const value = body['${field}'];
      if (value === undefined || value === null || value === '') {
        process.exit(2);
      }
      process.stdout.write(String(value));
    });
  "
}

validate_checks() {
  node -e "
    let data = '';
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => {
      const body = JSON.parse(data);
      const expectedAsset = process.argv[1] || '';
      const expectedEnv = process.argv[2] || '';

      if (body.status !== 'healthy') {
        console.error('::error::Health status is not healthy:', body.status, body.checks || {});
        process.exit(1);
      }

      const checks = body.checks || {};
      for (const [name, value] of Object.entries(checks)) {
        if (value === 'error') {
          console.error('::error::Health check failed:', name);
          process.exit(1);
        }
      }

      if (expectedAsset && body.build?.assetVersion !== expectedAsset) {
        console.error('::error::assetVersion mismatch. expected', expectedAsset, 'got', body.build?.assetVersion);
        process.exit(1);
      }

      if (expectedEnv && body.environment !== expectedEnv) {
        console.error('::error::environment mismatch. expected', expectedEnv, 'got', body.environment);
        process.exit(1);
      }

      console.log('✅ Deep health checks passed');
    });
  " "$EXPECTED_ASSET_VERSION" "$EXPECTED_ENV"
}

U1=$(echo "$BODY" | read_field 'uptime')
echo "First uptime: ${U1}s"

sleep "$INTERVAL_WAIT"

BODY2=$(fetch_health) || {
  echo "::error::Health check failed on second request"
  exit 1
}

U2=$(echo "$BODY2" | read_field 'uptime')
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

echo "$BODY2" | validate_checks
