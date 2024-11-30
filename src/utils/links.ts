import { DbLinkWithTags } from '@/types';

export const buildHintForLinkItem = (link: DbLinkWithTags) => {
  const dateFormat: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  return `
    Title: ${link.title}
    URL: ${link.url}
    
    Information: ${link.info || 'N/A'}

    Created at: ${link.createdAt.toLocaleDateString('en-US', dateFormat)}
    Updated at: ${link.updatedAt.toLocaleDateString('en-US', dateFormat)}

    Tags: ${link.tags.length === 0 ? 'N/A' : link.tags.map((tag) => tag.value).join(', ')}
    Priority: ${link.priority}
    ID: ${link.id}
  `.replaceAll('    ', '').trim();
};
