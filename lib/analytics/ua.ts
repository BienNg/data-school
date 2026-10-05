// Tiny user-agent classifier — enough for dashboard segments, no dependency.
const BOT_RE =
  /bot|crawl|spider|slurp|facebookexternalhit|embedly|quora link preview|whatsapp|telegrambot|preview|headless|lighthouse|pagespeed|gtmetrix|pingdom|uptime|monitor|curl|wget|python-requests|axios|node-fetch|go-http-client|java\//i;

export function isBot(ua: string): boolean {
  return !ua || BOT_RE.test(ua);
}

export function classifyUA(ua: string): { device: string; browser: string; os: string } {
  const device = /ipad|tablet|(android(?!.*mobile))/i.test(ua)
    ? 'tablet'
    : /mobi|iphone|ipod|android/i.test(ua)
      ? 'mobile'
      : 'desktop';

  const browser = /edg\//i.test(ua)
    ? 'Edge'
    : /samsungbrowser/i.test(ua)
      ? 'Samsung Internet'
      : /opr\/|opera/i.test(ua)
        ? 'Opera'
        : /firefox|fxios/i.test(ua)
          ? 'Firefox'
          : /chrome|crios/i.test(ua)
            ? 'Chrome'
            : /safari/i.test(ua)
              ? 'Safari'
              : 'Andere';

  const os = /iphone|ipad|ipod/i.test(ua)
    ? 'iOS'
    : /android/i.test(ua)
      ? 'Android'
      : /windows/i.test(ua)
        ? 'Windows'
        : /mac os x|macintosh/i.test(ua)
          ? 'macOS'
          : /linux|cros/i.test(ua)
            ? 'Linux'
            : 'Andere';

  return { device, browser, os };
}
