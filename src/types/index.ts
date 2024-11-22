/* =============================================================
DB schema types
============================================================= */

import { z } from 'zod';

export type DbLink = {
  id: number;
  url: string;
  title: string;
  info: string | null;
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

export const LinkFormSchema = z.object({
  url: z.string().min(2, { message: 'URL must be at least 2 characters' }),
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  info: z.string(),
  tags: z.string(),
});

export const QueryFormSchema = z.object({
  label: z.string().min(2, { message: 'Label must be at least 2 characters' }),
  query: z.string().min(2, { message: 'Query must be at least 2 characters' }),
});

export const PinnedFormSchema = z.object({
  label: z.string().min(2, { message: 'Label must be at least 2 characters' }),
  query: z.string().min(2, { message: 'Query must be at least 2 characters' }),
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
  faviconUrls: string[];
};

export type UpdateLinkData = {
  id: number;
  url: string;
  title: string;
  info: string | null
  tags: string;
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