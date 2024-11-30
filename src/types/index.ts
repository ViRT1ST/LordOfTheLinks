/* =============================================================
DB schema types
============================================================= */

import { z } from 'zod';

export type DbLink = {
  id: number;
  url: string;
  domain: string;
  title: string;
  info: string | null;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DbTag = {
  id: number;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

export type DbLinkWithTags = DbLink & {
  tags: DbTag[]
}

export type DbGetLinksResponse = {
  links: DbLinkWithTags[],
  totalCount: number
}

export type DbPinnedQuery = {
  id: number;
  label: string;
  query: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

/* =============================================================
Other
============================================================= */

const invalidPriorityMsg = 'Priority must be a number between 0 and 100';

export const LinkFormSchema = z.object({
  url: z.string().trim().url({'message': 'Invalid URL'}),
  title: z.string().trim().min(2, { message: 'Title must be at least 2 characters' }),
  priority: z
    .string()
    .trim()
    // Replacing empty string with "10"
    .transform((val) => (val === '' ? '10' : val))
    // Checking if it's a number
    .refine((val) => !isNaN(Number(val)), { message: invalidPriorityMsg })
    // Transforming it to number
    .transform((val) => Number(val))
    // Checking if it's between 0 and 100
    .refine((val) => val >= 0 && val <= 100, { message: invalidPriorityMsg }),
  info: z.string(),
  tags: z.string(),
});

export const QueryFormSchema = z.object({
  label: z.string().trim().min(1, { message: 'Label must be at least 1 character' }),
  query: z.string().trim().min(2, { message: 'Query must be at least 2 characters' }),
});

export const PinnedFormSchema = z.object({
  label: z.string().trim().min(1, { message: 'Label must be at least 1 character' }),
  query: z.string().trim().min(2, { message: 'Query must be at least 2 characters' }),
});

export type FetchedUrlData = {
  title: string;
  description: string;
  faviconUrls: string[];
};

export type NewLinkData = {
  url: string;
  title: string;
  info: string | null;
  tags: string;
  priority: number;
  faviconUrls: string[];
};

// NewLinkData & id must be
export type UpdateLinkData = {
  id: number;
  url: string;
  title: string;
  info: string | null
  tags: string;
  priority: number;
  // faviconUrls //todo
}

export type TagId = {
  id: number;
}

export type IconImageData = {
  buffer: Buffer | null;
  width: number;
  height: number;
}

export type NewPinnedQueryData = {
  label: string;
  query: string;
}

export type UpdatePinnedQueryData = {
  id: number;
  label: string;
  query: string;
}