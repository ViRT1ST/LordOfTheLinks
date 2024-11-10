/* =============================================================
DB schema types
============================================================= */

import { z } from 'zod';

export type DbLink = {
  id: number;
  title: string;
  url: string;
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

/* =============================================================
Other
============================================================= */

export type NewLinkData = {
  title: string;
  url: string;
  tags: string;
};

export type UpdateLinkData = {
  id: number;
  title: string;
  url: string;
  tags: string;
}

export type TagId = {
  id: number;
}

export const LinkFormSchema = z.object({
  url: z.string().min(2, { message: 'URL must be at least 2 characters' }),
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  tags: z.string(),
});

