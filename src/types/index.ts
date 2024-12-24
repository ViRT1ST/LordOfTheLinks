import { z } from 'zod';

/* =============================================================
Variants
============================================================= */
// rename SortingOrderVariants > SortingLinksVariants
// rename OrderByVariants > SortingLinksVariantsForPrismaOptions

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
  isTagOnlySearch: boolean;
  info: string | null;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DbSettings = {
  id: number;
  theme: ThemeVariants;
  background: string;
  linksPerPage: number;
  sortLinksBy: SortingOrderVariants;
  sortLinksByPriorityFirst: boolean;
  hideVerticalScrollbar: boolean;
}

/* =============================================================
Design system
============================================================= */

export type DropdownItem = {
  label: string;
  invokeOnClick: () => void;
};

export type SelectItem = {
  label: string;
  value: string;
};

export type DropdownItemsDivider = 'divider';

/* =============================================================
Links related types and validation schemas
============================================================= */

const invalidPriorityMsg = 'Priority must be a number between 0 and 100';

export const LinkFormSchema = z.object({
  url: z.string().trim().url({ message: 'URL is invalid' }),
  title: z.string().trim().min(2, { message: 'Title must be at least 2 characters' }),
  info: z.string(),
  tags: z.string(),
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
  query: z.string().trim().min(1, { message: 'Query must be at least 1 character' }),
  info: z.string(),
  isTagOnlySearch: z.coerce.boolean(),
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
});

export type NewPinnedQueryData = {
  label: string;
  query: string;
  info: string | null;
  isTagOnlySearch: boolean;
  priority: number;
}

export type UpdatePinnedQueryData = NewPinnedQueryData &{
  id: number;
}

/* =============================================================
Settings related types and validation schemas
============================================================= */

const invalidLinksPerPageMsg = 'Links per page must be a number between 1 and 1000';

export const SettingsFormSchema = z.object({
  theme: z.string(),
  background: z.string(),
  linksPerPage: z
    .string()
    .trim()
    // Checking if it's a number
    .refine((val) => !isNaN(Number(val)), { message: invalidLinksPerPageMsg })
    // Transforming it to number
    .transform((val) => Number(val))
    // Checking if it's between 1 and 1000
    .refine((val) => val >= 1 && val <= 1000, { message: invalidLinksPerPageMsg }),
  // sortLinksBy: z.string(),
  sortLinksByPriorityFirst: z.coerce.boolean(),
  hideVerticalScrollbar: z.coerce.boolean(),
});

export type UpdateSettingsData = {
  theme?: string;
  background?: string;
  linksPerPage?: number;
  // sortLinksBy?: string;
  sortLinksByPriorityFirst?: boolean;
  hideVerticalScrollbar?: boolean;
}






