export const getDomainFromUrl = (url: string) => {
  return url
    .replace('https:', '')
    .replace('www.', '')
    .replace('//', '')
    .split('/')[0];
};