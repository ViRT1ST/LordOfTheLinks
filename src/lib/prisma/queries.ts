import 'server-only';

import { type Tag as TagRecord } from '@prisma/client';

import {
  type NewLinkData,
  type UpdateLinkData,
  type TagId,
  type NewPinnedQueryData,
  type UpdatePinnedQueryData,
  type DbGetLinksResponse,
  type DbSettings,
  type UpdateSettingsData
} from '@/types/index';

import {
  getOrderByForLinksInPrisma,
  convertStringTagsToArray,
  getDomain
} from '@/utils/formatting';

import prisma from '@/lib/prisma/connect';

/* =============================================================
Links utils
============================================================= */

const getVariablesForLinks = async () => {
  const {
    sortLinksBy,
    sortLinksByPriorityFirst,
    linksPerPage
  } = await getSettings();

  const orderBy = getOrderByForLinksInPrisma(
    sortLinksBy, sortLinksByPriorityFirst
  );

  return {
    sortLinksBy,
    linksPerPage,
    orderBy
  };
};

/* =============================================================
Get all links
============================================================= */

export const getAllLinks = async (page: number) => {
  const { linksPerPage, orderBy } = await getVariablesForLinks();

  const links = await prisma.link.findMany({
    include: {
      tags: true,
    },
    take: linksPerPage,
    skip: (page - 1) * linksPerPage,
    orderBy: orderBy,
  });

  const totalCount = await prisma.link.count();

  return {
    links,
    totalCount
  };
};

/* =============================================================
Get links by search text
============================================================= */

export const getLinksBySearch = async (
  searchQuery: string,
  page: number,
) => {
  const searchTerms = searchQuery.toLowerCase().split(' ');

  // Creating condition for each search term
  const searchConditions = searchTerms.map(term => ({
    OR: [
      {
        title: {
          contains: term,
        },
      },
      {
        domain: {
          contains: term,
        },
      },
      {
        tags: {
          some: {
            value: {
              contains: term,
            },
          },
        },
      },
    ],
  }));

  const { linksPerPage, orderBy } = await getVariablesForLinks();

  const links = await prisma.link.findMany({
    where: {
      AND: searchConditions,
    },
    include: {
      tags: true,
    },
    take: linksPerPage,
    skip: (page - 1) * linksPerPage,
    orderBy: orderBy
  });

  const totalCount = await prisma.link.count({
    where: {
      AND: searchConditions,
    },
  });

  return {
    links,
    totalCount
  };
};

/* =============================================================
Get links by tag
============================================================= */

export const getLinksByTag = async (tag: string, page: number) => {
  const { linksPerPage, orderBy } = await getVariablesForLinks();

  const searchConditions = {
    tags: {
      some: {
        value: tag,
      },
    },
  };

  const links = await prisma.link.findMany({
    where: searchConditions,
    include: {
      tags: true,
    },
    take: linksPerPage,
    skip: (page - 1) * linksPerPage,
    orderBy: orderBy
  });

  const totalCount = await prisma.link.count({
    where: searchConditions
  });

  return {
    links,
    totalCount 
  };
};

/* =============================================================
Get link by id
============================================================= */

export const getLinkById = async (id: number) => {
  return await prisma.link.findUnique({
    where: { id },
    include: {
      tags: true,
    },
  });
};

/* =============================================================
Get links
============================================================= */

export const getLinks = async (searchQuery: string | null, page: number) => {
  const { linksPerPage, sortLinksBy } = await getVariablesForLinks();

  const response: DbGetLinksResponse = {
    links: [],
    totalCount: 0,
    linksPerPage,
    sortLinksBy
  };

  const isSearchById =  searchQuery && searchQuery.match(/^id:\d+$/);
  const isSearchByTag = searchQuery && searchQuery.match(/^tag:\w+$/);
  const isSearchByText = searchQuery && !isSearchById;

  if (isSearchById) {
    const id = parseInt(searchQuery.replace('id:', ''), 10);
    const link = await getLinkById(id);

    if (link) {
      response.links = [link];
      response.totalCount = 1;
    }

  } else if (isSearchByTag) {
    const tag = searchQuery.replace('tag:', '');
    const { links, totalCount } = await getLinksByTag(tag, page);

    response.links = links;
    response.totalCount = totalCount;

  } else if (isSearchByText) {
    const { links, totalCount } = await getLinksBySearch(searchQuery, page);

    response.links = links;
    response.totalCount = totalCount;

  } else {
    const { links, totalCount } = await getAllLinks(page);

    response.links = links;
    response.totalCount = totalCount;
  }

  return response;
};

/* =============================================================
Create or update tag and return it record
============================================================= */

const upsertTag = async (tag: string): Promise<TagRecord> => {
  const value = tag.toLowerCase().trim();

  return await prisma.tag.upsert({
    where: {
      value
    },
    create: {
      value
    },
    update: {},
  });
};

/* =============================================================
Create or update tags and return it records
============================================================= */

const upsertTags = async (tags: string[]): Promise<TagRecord[]>  => {
  return await Promise.all(
    tags.map(async (tag) => {
      return upsertTag(tag);
    })
  );
};

/* =============================================================
Create new link
============================================================= */

export const createLink = async (data: NewLinkData) => {
  const { url, title, info, tags, priority } = data;

  const tagsArray: string[] = convertStringTagsToArray(tags || '');

  let tagIds: TagId[] = [];

  // creating or updating tags and getting their ids
  if (tagsArray.length > 0) {
    const tagRecords = await upsertTags(tagsArray);
    tagIds = tagRecords.map((tagRecord) => ({ id: tagRecord.id }));
  }

  // creating new link and connecting it with tags
  const newLink = await prisma.link.create({
    data: {
      url,
      domain: getDomain(url),
      title,
      info: info || null,
      priority,
      tags: {
        connect: tagIds,
      },
    },
    include: {
      tags: true,
    },
  });

  return newLink;
};

/* =============================================================
Delete non existing tags
============================================================= */

const deleteNonExistingTags = async (tags: string[]) => {
  for (const tag of tags) {
    // count how many links have this tag
    const count = await prisma.link.count({
      where: {
        tags: {
          some: {
            value: tag,
          },
        },
      },
    });

    // if there are no links with this tag, delete it
    if (count === 0) {
      await prisma.tag.delete({
        where: {
          value: tag,
        },
      });
    }
  }
};

/* =============================================================
Get tags strings from link
============================================================= */

const getTagsFromLink = async (linkId: number) => {
  const link = await getLinkById(linkId);
  return link?.tags.map((tag) => tag.value) || [];
};

/* =============================================================
Update link
============================================================= */

export const updateLink = async (data: UpdateLinkData) => {
  const { id, url, title, info, tags, priority } = data;

  const newTagsArray: string[] = convertStringTagsToArray(tags || '');
  const existingTagsArray = await getTagsFromLink(id);
  const deletedTagsArray = existingTagsArray.filter((tag) => !newTagsArray?.includes(tag));

  let tagIds: TagId[] = [];

  // creating or updating tags and getting their ids
  if (newTagsArray.length > 0) {
    const tagRecords = await upsertTags(newTagsArray);
    tagIds = tagRecords.map((tagRecord) => ({ id: tagRecord.id }));
  }

  // updating link
  const updatedLink = await prisma.link.update({
    where: { id },
    data: {
      url,
      domain: getDomain(url),
      title,
      info: info || null,
      priority,
      tags: {
        // replacing tags connections
        set: tagIds, 
      },
    },
    include: {
      tags: true,
    },
  });

  await deleteNonExistingTags(deletedTagsArray);

  return updatedLink;
};

/* =============================================================
Delete link
============================================================= */

export const deleteLink = async (id: number) => {
  try {
    const deletedLink = await prisma.link.delete({
      where: { id },
    });

    return deletedLink;
    
  } catch (error) {
    console.error(`Failed to delete link with id ${id}:`, error);
  }
};

/* =============================================================
Create pinned query
============================================================= */

export const createPinnedQuery = async (data: NewPinnedQueryData) => {
  const { label, query } = data;

  const pinnedQuery = await prisma.pinned.create({
    data: {
      label,
      query,
      // priority: priority || undefined,
    },
  });

  return pinnedQuery;
};

/* =============================================================
Get all pinned queries
============================================================= */

export const getAllPinnedQueries = async () => {
  const totalCount = await prisma.pinned.count();

  const pinnedQueries = await prisma.pinned.findMany({
    orderBy: [
      {
        priority: 'desc',
      },
    ],
  });

  return {
    pinnedQueries: pinnedQueries,
    totalCount
  };
};

/* =============================================================
Update pinned query
============================================================= */

export const updatePinnedQuery = async (data: UpdatePinnedQueryData) => {
  const { id, label, query } = data;

  const pinnedQuery = await prisma.pinned.update({
    where: { id },
    data: {
      label,
      query,
      // priority later
    },
  });

  return pinnedQuery;
};

/* =============================================================
Delete pinned query
============================================================= */

export const deletePinnedQuery = async (id: number) => {
  try {
    const pinnedQuery = await prisma.pinned.delete({
      where: { id },
    });

    return pinnedQuery;
    
  } catch (error) {
    console.error(`Failed to delete pinned query with id ${id}:`, error);
  }
};

/* =============================================================
Get settings
============================================================= */

export const getSettings = async () => {
  const settings = await prisma.settings.findUnique({
    where: { id: 1 },
  });

  return settings as DbSettings;
};

/* =============================================================
Update settings
============================================================= */

export const updateSettings = async (settings: UpdateSettingsData) => {
  await prisma.settings.update({
    where: { id: 1 },
    data: settings
  });
};