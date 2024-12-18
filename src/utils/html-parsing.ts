export const getTitleFromHtmlSource = (pageHtml: string) => {
  return pageHtml.match(/<title>(.*?)<\/title>/is)?.[1]?.trim() ?? '';
};

export const getDescriptionFromHtmlSource = (pageHtml: string) => {
  let description = '';

  const regexes = [
    /<meta\s+name=["']description["']\s+content=["'](.*?)["']/i,
    /<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i
  ];
  
  regexes.forEach(regex => {
    if (description.length === 0) {
      description = pageHtml.match(regex)?.[1]?.trim() || '';
    }
  });

  return description;
};

const normalizeIconUrl = (iconUrl: string, pageUrl: string) => {
  let normalizedUrl = iconUrl;

  const pageUrlObj = new URL(pageUrl);

  if (normalizedUrl.startsWith('//')) {
    normalizedUrl = `${pageUrlObj.protocol}${normalizedUrl}`;
  }

  if (normalizedUrl.startsWith('/')) {
    normalizedUrl = `${pageUrlObj.protocol}//${pageUrlObj.host}${normalizedUrl}`;
  }

  if (normalizedUrl.includes('?')) {
    normalizedUrl = normalizedUrl.split('?')[0];
  }

  return normalizedUrl;
};

export const getIconUrlsFromHtmlSource = (pageHtml: string, pageUrl: string) => {
  let iconUrls = [];

  const regexes = [
    // Icons: SVG
    /<link[^>]*rel=["']icon["'][^>]*type=["']image\/svg\+xml["'][^>]*href=["']([^"']+)["']/i,
    /<link[^>]*rel=["']icon["'][^>]*href=["']([^"']+)["'][^>]*type=["']image\/svg\+xml["']/i,

    // Icons: Apple
    /<link[^>]*rel=["']apple-touch-icon["'][^>]*type=["']image\/png["'][^>]*sizes=["']256x256["'][^>]*href=["']([^"']+)["']/i,
    /<link[^>]*rel=["']apple-touch-icon["'][^>]*type=["']image\/png["'][^>]*sizes=["']228x228["'][^>]*href=["']([^"']+)["']/i,
    /<link[^>]*rel=["']apple-touch-icon["'][^>]*type=["']image\/png["'][^>]*sizes=["']192x192["'][^>]*href=["']([^"']+)["']/i,
    /<link[^>]*rel=["']apple-touch-icon["'][^>]*type=["']image\/png["'][^>]*sizes=["']180x180["'][^>]*href=["']([^"']+)["']/i,
    /<link[^>]*rel=["']apple-touch-icon["'][^>]*type=["']image\/png["'][^>]*sizes=["']152x152["'][^>]*href=["']([^"']+)["']/i,
    /<link[^>]*rel=["']apple-touch-icon["'][^>]*type=["']image\/png["'][^>]*sizes=["']128x128["'][^>]*href=["']([^"']+)["']/i,
    /<link[^>]*rel=["']apple-touch-icon["'][^>]*type=["']image\/png["'][^>]*sizes=["']120x120["'][^>]*href=["']([^"']+)["']/i,
    /<link[^>]*rel=["']apple-touch-icon["'][^>]*type=["']image\/png["'][^>]*sizes=["']96x96["'][^>]*href=["']([^"']+)["']/i,
    /<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i,
    /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']apple-touch-icon["']/i,

    // Icons: PNG larger than 96x96
    /<link[^>]*rel=["']icon["'][^>]*type=["']image\/png["'][^>]*sizes=["']228x228["'][^>]*href=["']([^"']+)["']/i,
    /<link[^>]*rel=["']icon["'][^>]*type=["']image\/png["'][^>]*sizes=["']192x192["'][^>]*href=["']([^"']+)["']/i,
    /<link[^>]*rel=["']icon["'][^>]*type=["']image\/png["'][^>]*sizes=["']128x128["'][^>]*href=["']([^"']+)["']/i,
    /<link[^>]*rel=["']icon["'][^>]*type=["']image\/png["'][^>]*sizes=["']96x96["'][^>]*href=["']([^"']+)["']/i,

    // Site images
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]*itemprop=["']image["'][^>]*content=["']([^"']+)["']/i,
  ];

  for (const regex of regexes) {
    const matches = pageHtml.match(regex);

    if (matches) {
      const finalUrl = normalizeIconUrl(matches[1], pageUrl);
      iconUrls.push(finalUrl);
    }
  }

  console.log('=========== PARSED ICONS URLS FROM HTML PAGE ===========');
  console.log(iconUrls);
  console.log('========================================================');

  return iconUrls;
};

