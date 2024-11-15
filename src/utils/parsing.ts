export const getTitleFromHtmlSource = (htmlSource: string) => {
  return htmlSource.match(/<title>(.*?)<\/title>/i)?.[1]?.trim() ?? '';
};

export const getDescriptionFromHtmlSource = (htmlSource: string) => {
  let description = '';

  const regexes = [
      /<meta\s+name=["']description["']\s+content=["'](.*?)["']/i,
      /<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i
  ];
  
  regexes.forEach(regex => {
      if (description.length === 0) {
        description = htmlSource.match(regex)?.[1]?.trim() || '';
      }
  });

  return description;
};

export const getIconUrlFromHtmlSource = (htmlSource: string, url: string) => {
  let iconUrl = '';

  const appleIconUrlMatch = htmlSource.match(
    /<link\s+(?:rel=["'](?:apple-touch-icon)["'].*?href=["'](.*?)["'])/i
  );

  const ogImageUrlMatch = htmlSource.match(
    /<meta\s+(?:property=["'](?:og:image)["'].*?content=["'](.*?)["'])/i
  );

  const classicIconUrlMatch = htmlSource.match(
    /<link\s+(?:rel=["'](?:icon|shortcut icon)["'].*?href=["'](.*?)["'])/i
  );

  if (appleIconUrlMatch?.[1]) {
    iconUrl = appleIconUrlMatch?.[1];
  }

  if (!iconUrl && ogImageUrlMatch?.[1]) {
    iconUrl = ogImageUrlMatch?.[1];
  }
  
  if (!iconUrl && classicIconUrlMatch?.[1]) {
    iconUrl = classicIconUrlMatch?.[1];
  }
  
  if (!iconUrl) {
    iconUrl = `${new URL(url).origin}/favicon.ico`;
  }

  if (iconUrl && iconUrl.startsWith('//')) {
    iconUrl = `${new URL(url).protocol}${iconUrl}`;
  }

  return iconUrl;
};
