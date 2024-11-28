import { DbLinkWithTags } from '@/types';

export const buildHintForLinkItem = (link: DbLinkWithTags) => {
  const title = link.title;

  const info = `Information: ${link.info || 'N/A'}`;

  const dateFormat: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const createdAt = `Created at: ${link.createdAt.toLocaleDateString('en-US', dateFormat)}`;
  const updatedAt = `Updated at: ${link.updatedAt.toLocaleDateString('en-US', dateFormat)}`;

  const tags = `Tags: ${
    link.tags.length === 0 ? 'N/A' : link.tags.map((tag) => tag.value).join(', ')
  }`;

  return `${title}\n\n${info}\n\n${createdAt}\n${updatedAt}\n\n${tags}`;
};