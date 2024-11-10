export const getDomainFromUrl = (url: string) => {
  return url.split('/')[2].replace('www.', '');
};