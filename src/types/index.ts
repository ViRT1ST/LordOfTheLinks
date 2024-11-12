/* =============================================================
DB schema types
============================================================= */

import { z } from 'zod';

export type DbLink = {
  id: number;
  url: string;
  title: string;
  info: string;
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

export type DbGetLinksQuery = {
  links: DbLinkWithTags[],
  totalCount: number
}

/* =============================================================
Other
============================================================= */

export type fetchedUrlData = {
  title: string;
  description: string;
};

export type NewLinkData = {
  url: string;
  title: string;
  info: string;
  tags: string;
};

export type UpdateLinkData = {
  id: number;
  url: string;
  title: string;
  info: string;
  tags: string;
}

export type TagId = {
  id: number;
}

export const LinkFormSchema = z.object({
  url: z.string().min(2, { message: 'URL must be at least 2 characters' }),
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  info: z.string(),
  tags: z.string(),
});

