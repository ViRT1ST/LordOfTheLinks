import { z, ZodError } from 'zod';

/* =============================================================
Design system
============================================================= */

export type DropdownItem = {
  label: string;
  invokeOnClick: () => void;
};

export type DropdownItemsDivider = 'divider';

export type SelectItem = {
  label: string;
  value: string;
};

/* =============================================================
Common schemas
============================================================= */

const invalidPriorityMsg = 'Priority must be a number between 0 and 100';

const PrioritySchema = z.string()
  .refine((value) => {
    const asNumber = Number(value);
    const isValidNumber = !isNaN(asNumber) && asNumber >= 0 && asNumber <= 100;
    const isEmptyString = value === '';

    return isValidNumber || isEmptyString;
  }, { message: invalidPriorityMsg })

  .transform(value => {
    return value === '' ? null : Number(value);
  });

/* =============================================================
Sorting links variants
============================================================= */

export type SortingLinksVariants =
  'date-asc' | 'title-asc' | 'domain-asc' |
  'date-desc' | 'title-desc' | 'domain-desc';

export type SortingLinksVariantsForPrismaQuery =
  { priority: 'asc' | 'desc' } | { createdAt: 'asc' | 'desc' } |
  { title: 'asc' | 'desc' } | { domain: 'asc' | 'desc' };

/* =============================================================
Links related types and validation schemas
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
};

export type DbTag = {
  id: number;
  value: string;
};

export type DbTagId = Omit<DbTag, 'value'>;

export type DbLinkWithTags = DbLink & {
  tags: DbTag[];
};

export type DbGetLinksResponse = {
  links: DbLinkWithTags[];
  totalCount: number;
  linksPerPage: number;
  sortLinksBy: SortingLinksVariants;
};

const invalidLinkUrlMsg = 'URL is invalid';
const invalidLinkTitleMsg = 'Ttle must be from 1 to 300 characters length';

const LinkUrlchema = z.string().trim()
  .url({ message: invalidLinkUrlMsg });

const LinkTitleSchema = z.string().trim()
  .min(1, { message: invalidLinkTitleMsg })
  .max(300, { message: invalidLinkTitleMsg });

const LinkInfoSchema = z.string().trim();

const LinkTagsSchema = z.string().trim();

export const LinkFormSchema = z.object({
  url: LinkUrlchema,
  title: LinkTitleSchema,
  info: LinkInfoSchema,
  tags: LinkTagsSchema,
  priority: PrioritySchema
});

export type NewLinkData = z.infer<typeof LinkFormSchema> & {
  faviconUrls: string[];
};

export type UpdateLinkData = z.infer<typeof LinkFormSchema> & {
  id: number;
};

export type ParsedHtmlData = {
  title: string;
  description: string;
  faviconUrls: string[];
};

export type IconImageData = {
  buffer: Buffer | null;
  width: number;
  height: number;
};

/* =============================================================
Pinned queries related types and validation schemas
============================================================= */

export type DbPinnedQuery = {
  id: number;
  label: string;
  query: string;
  isTagOnlySearch: boolean;
  info: string | null;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
};

const invalidPinnedQueryLabelMsg = 'Label must be from 1 to 100 characters length';
const invalidPinnedQueryQueryMsg = 'Query must be from 1 to 100 characters length';

const PinnedQueryLabelSchema = z.string().trim()
  .min(1, { message: invalidPinnedQueryLabelMsg })
  .max(100, { message: invalidPinnedQueryLabelMsg });

const PinnedQueryQuerySchema = z.string().trim()
  .min(1, { message: invalidPinnedQueryQueryMsg })
  .max(100, { message: invalidPinnedQueryQueryMsg });

const PinnedQueryIsTagOnlySearch = z.coerce.boolean();

const PinnedQueryInfoSchema = z.string().trim();

export const PinnedQueryFormSchema = z.object({
  label: PinnedQueryLabelSchema,
  query: PinnedQueryQuerySchema,
  isTagOnlySearch: PinnedQueryIsTagOnlySearch,
  info: PinnedQueryInfoSchema,
  priority: PrioritySchema
});

export type NewPinnedQueryData = z.infer<typeof PinnedQueryFormSchema>;

export type UpdatePinnedQueryData = NewPinnedQueryData & {
  id: number;
};

/* =============================================================
Settings related types and validation schemas
============================================================= */

export type DbSettings = {
  id: number;
  theme: ThemeVariants;
  background: BackgroundVariants;
  linksPerPage: number;
  sortLinksBy: SortingLinksVariants;
  sortLinksByPriorityFirst: boolean;
  hideVerticalScrollbar: boolean;
  defaultPriorityForLinks: number;
  defaultPriorityForPinned: number;
};

const invalidThemeMsg = 'Theme variant is invalid';
const invalidBackgroundMsg = 'Background variant is invalid';
const invalidLinksPerPageMsg = 'Links per page must be a number between 1 and 1000';

const ThemeVariantsSchema = z.enum(['light', 'dark'], {
  errorMap: () => ({ message: invalidThemeMsg }),
});

const BackgroundVariantsSchema = z.enum(['flowers', 'none'], {
  errorMap: () => ({ message: invalidBackgroundMsg }),
});

const LinksPerPageSchema = z.coerce
  .number({ message: invalidLinksPerPageMsg })
  .min(1, { message: invalidLinksPerPageMsg })
  .max(1000, { message: invalidLinksPerPageMsg });

const SortLinksByPriorityFirstSchema = z.coerce.boolean();

const HideVerticalScrollbarSchema = z.coerce.boolean();

const DefaultPrioritySchema = z.coerce
  .number({ message: invalidPriorityMsg })
  .min(1, { message: invalidPriorityMsg })
  .max(1000, { message: invalidPriorityMsg });

export const SettingsFormSchema = z.object({
  theme: ThemeVariantsSchema,
  background: BackgroundVariantsSchema,
  linksPerPage: LinksPerPageSchema,
  sortLinksByPriorityFirst: SortLinksByPriorityFirstSchema,
  hideVerticalScrollbar: HideVerticalScrollbarSchema,
  defaultPriorityForLinks: DefaultPrioritySchema,
  defaultPriorityForPinned: DefaultPrioritySchema
});

export type UpdateSettingsData = z.infer<typeof SettingsFormSchema>;
export type ThemeVariants = z.infer<typeof ThemeVariantsSchema>;
export type BackgroundVariants = z.infer<typeof BackgroundVariantsSchema>;

