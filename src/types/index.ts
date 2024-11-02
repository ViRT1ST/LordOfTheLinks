/* =============================================================
DB schema types
============================================================= */

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

export type dbLinkWithTags = DbLink & {
  tags: DbTag[]
}

/* =============================================================
Other
============================================================= */

export type NewLinkData = {
  title: string;
  url: string;
  tags?: string[];
};

export type UpdateLinkData = {
  id: number;
  title: string;
  url: string;
  tags?: string[];
}

export type TagId = {
  id: number;
}

