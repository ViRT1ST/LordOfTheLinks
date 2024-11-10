export const tagStringToArray = (tagString: string) => {
  return tagString.split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '');
};