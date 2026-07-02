function getClientIp(request) {
  const forwarded = request.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return request.ip;
}

function maskIp(ip) {
  if (!ip) {
    return 'unknown';
  }

  const normalized = ip.replace(/^::ffff:/, '');

  if (normalized === '127.0.0.1' || normalized === '::1') {
    return '127.0.0.1 (local)';
  }

  if (/^\d+\.\d+\.\d+\.\d+$/.test(normalized)) {
    const [a, b] = normalized.split('.');
    return `${a}.${b}.x.x`;
  }

  const segments = normalized.split(':').filter(Boolean);
  if (segments.length > 0) {
    return `${segments.slice(0, 2).join(':')}::`;
  }

  return 'unknown';
}

function parseOs(userAgent) {
  if (/Windows NT 10/i.test(userAgent)) {
    return 'Windows 10+';
  }

  if (/Windows/i.test(userAgent)) {
    return 'Windows';
  }

  if (/Mac OS X|Macintosh/i.test(userAgent)) {
    return 'macOS';
  }

  if (/Android/i.test(userAgent)) {
    return 'Android';
  }

  if (/iPhone|iPad/i.test(userAgent)) {
    return 'iOS';
  }

  if (/Linux/i.test(userAgent)) {
    return 'Linux';
  }

  return 'Unknown';
}

function parseBrowser(userAgent) {
  if (/Edg\//i.test(userAgent)) {
    return 'Edge';
  }

  if (/Firefox\//i.test(userAgent)) {
    return 'Firefox';
  }

  if (/Chrome\//i.test(userAgent) && !/Edg\//i.test(userAgent)) {
    return 'Chrome';
  }

  if (/Safari\//i.test(userAgent) && !/Chrome\//i.test(userAgent)) {
    return 'Safari';
  }

  return 'Unknown';
}

function parseLocale(acceptLanguage) {
  if (!acceptLanguage) {
    return 'unknown';
  }

  return acceptLanguage.split(',')[0].trim() || 'unknown';
}

/**
 * @param {import('fastify').FastifyRequest} request
 */
export function buildNotFoundContext(request) {
  const userAgent = request.headers['user-agent'] || '';

  return {
    os: parseOs(userAgent),
    browser: parseBrowser(userAgent),
    ip: maskIp(getClientIp(request)),
    locale: parseLocale(request.headers['accept-language']),
  };
}
