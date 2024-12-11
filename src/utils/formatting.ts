import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { 
  type DbLinkWithTags,
  type SortingOrderVariants,
  type OrderByVariants
} from '@/types';

import { useStore } from '@/store/useStore';
import { getSettings } from '@/server-actions';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cnJoin(...classes: string[]) {
  return classes.join(' ').replace(/\s+/g, ' ').trim();
};

export const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace('www.', '').toLowerCase();
    
  } catch (error) {
    return url;
  }
};

export function convertErrorZodResultToMsgArray(result: any) {
  let errorMessages: string[] = [];

  const errors = result.error.flatten().fieldErrors;
  for (const [fieldName, fieldErrors] of Object.entries(errors) as any) {
    if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
      errorMessages = [...errorMessages, ...fieldErrors];
    }
  }

  return errorMessages;
}

export const createTooltipTextForLink = (link: DbLinkWithTags): string => {
  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const tags = link.tags.length ? link.tags.map((tag) => tag.value).join(', ') : 'N/A';

  return [
    `Title: ${link.title}\n`,
    `URL: ${link.url}\n\n`,
    `Information: ${link.info || 'N/A'}\n\n`,
    `Created at: ${formatDate(link.createdAt)}`,
    `Updated at: ${formatDate(link.updatedAt)}\n\n`,
    `Tags: ${tags}\n`,
    `Priority: ${link.priority}\n`,
    `ID: ${link.id}`
  ].join('');
};

export const getSortingMenuDropdownLabel = (order: SortingOrderVariants | null) => {
  return typeof order === 'string'
    ? `SORTED BY ${order.replace('-', ' ').toUpperCase()}`
    : null;
};

export const getOrderByForLinksInPrisma = (
  order: SortingOrderVariants | null,
  sortLinksByPriorityFirst: boolean
) => {
  const orderBy: OrderByVariants[] = [];

  if (sortLinksByPriorityFirst) {
    orderBy.push({ priority: 'desc' });
  }

  const sortingOptions = {
    'date-asc': { createdAt: 'asc' },
    'title-asc': { title: 'asc' },
    'domain-asc': { domain: 'asc' },
    'date-desc': { createdAt: 'desc' },
    'title-desc': { title: 'desc' },
    'domain-desc': { domain: 'desc' },
  };

  if (order && order in sortingOptions) {
    orderBy.push(sortingOptions[order] as OrderByVariants);
  }

  return orderBy;
};

export const convertStringTagsToArray = (tags: string) => {
  return tags.split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '');
};

export const getUpdatedSearchParams = (
  searchParams: Readonly<URLSearchParams>, key: string, value: string
) => {
  const paramsWithoutKeyToUpdate = searchParams
    .toString()
    .split('&')
    .filter(param => !param.startsWith(key));

  return [...paramsWithoutKeyToUpdate, `${key}=${value}`].join('&');
};

// export const getSortingMenuDropdownLabel = () => {
//   let currentSorting = useStore.getState().currentSettings?.sortLinksBy || null;

//   return typeof currentSorting === 'string'
//     ? `SORTED BY ${currentSorting.replace('-', ' ').toUpperCase()}`
//     : null;
// };