import { z } from 'zod';

/* =============================================================
Variants
============================================================= */

export type ModalWindowVariants = 
  'link-create' | 'link-update' | 'link-delete' | 'links-sorting-menu' |
  'query-context-menu' | 'query-create' | 'query-update' | 'query-delete' |
  'settings';

export type SortingOrderVariants =
  'date-asc' | 'title-asc' | 'domain-asc' |
  'date-desc' | 'title-desc' | 'domain-desc';

export type ThemeVariants = 
  'light' | 'dark';

export type OrderByVariants =
  { priority: 'asc' | 'desc' } | { createdAt: 'asc' | 'desc' } |
  { title: 'asc' | 'desc' } | { domain: 'asc' | 'desc' };

/* =============================================================
Database types
============================================================= */

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
  tags: DbTag[];
}

export type DbGetLinksResponse = {
  links: DbLinkWithTags[];
  totalCount: number;
  linksPerPage: number;
  sortLinksBy: SortingOrderVariants;
}

export type DbPinnedQuery = {
  id: number;
  label: string;
  query: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DbSettings = {
  id: number;
  linksPerPage: number;
  sortLinksBy: SortingOrderVariants;
  sortLinksByPriorityFirst: boolean;
  theme: ThemeVariants;
  background: string;
}

/* =============================================================
Design system
============================================================= */

export type DropdownItem = {
  labelUnselected: string;
  labelSelected: string;
  invokeOnClick: () => Promise<void>;
};

export type DropdownItemsDivider = 'divider';

/* =============================================================
Links related types and validation schemas
============================================================= */

const invalidPriorityMsg = 'Priority must be a number between 0 and 100';

export const LinkFormSchema = z.object({
  url: z.string().trim().url({ message: 'Invalid URL' }),
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

export type NewLinkData = {
  url: string;
  title: string;
  info: string | null;
  tags: string;
  priority: number;
  faviconUrls: string[];
};

export type UpdateLinkData = Omit<NewLinkData, 'faviconUrls'> & {
  id: number;
}

export type TagId = {
  id: number;
}

export type ParsedHtmlData = {
  title: string;
  description: string;
  faviconUrls: string[];
};

export type IconImageData = {
  buffer: Buffer | null;
  width: number;
  height: number;
}

/* =============================================================
Pinned queries related types and validation schemas
============================================================= */

export const PinnedQueryFormSchema = z.object({
  label: z.string().trim().min(1, { message: 'Label must be at least 1 character' }),
  query: z.string().trim().min(2, { message: 'Query must be at least 2 characters' }),
});

export type NewPinnedQueryData = {
  label: string;
  query: string;
}

export type UpdatePinnedQueryData = {
  id: number;
  label: string;
  query: string;
}

/* =============================================================
Settings related types and validation schemas
============================================================= */

export type UpdateSettingsData = {
  linksPerPage?: number;
  sortLinksBy?: SortingOrderVariants;
  sortLinksByPriorityFirst?: boolean;
  theme?: ThemeVariants;
  background?: string;
}



