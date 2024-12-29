import 'server-only';

import { type Tag as TagRecord } from '@prisma/client';

import {
  type DbTagId,
  type DbGetLinksResponse,
  type DbSettings,
  type NewLinkData,
  type UpdateLinkData,
  type NewPinnedQueryData,
  type UpdatePinnedQueryData,
  type UpdateSettingsData,
} from '@/types/index';

import {
  getOrderByForLinksInPrisma,
  convertStringTagsToArray,
  getDomain
} from '@/utils/formatting';

import prisma from '@/lib/prisma/connect';

/* =============================================================
Utils
============================================================= */

const getVariablesForLinks = async () => {
  const settings = await getSettings();

  if (!settings) {
    return;
  }

  try {
    return {
      sortLinksBy: settings.sortLinksBy,
      linksPerPage: settings.linksPerPage,
      orderBy: getOrderByForLinksInPrisma(
        settings.sortLinksBy,
        settings.sortLinksByPriorityFirst
      )
    };

  } catch (error) {
    console.error(`Failed to get variables for links | ${error}`);
  }
};

const getPrority = async (priority: unknown, isLink: boolean) => {
  if (typeof priority !== 'number') {
    const settings = await getSettings();

    if (settings) {
      return isLink
        ? settings.defaultPriorityForPinned
        : settings.defaultPriorityForLinks;
    } else {
      return;
    }
  }

  return priority;
};

const getTagsFromLink = async (linkId: number) => {
  const link = await getLinkById(linkId);

  if (!link) {
    return [];
  } else {
    return link.tags.map((tag) => tag.value);
  }
};

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

const upsertOneTag = async (tag: string): Promise<TagRecord> => {
  // Create or update one tag and return it record

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

const upsertManyTags = async (tags: string[]): Promise<TagRecord[]>  => {
  // Create or update bunch of tags and return it records

  return await Promise.all(
    tags.map(async (tag) => {
      return upsertOneTag(tag);
    })
  );
};

/* =============================================================
Get all links
============================================================= */

const getAllLinks = async (page: number) => {
  const variables = await getVariablesForLinks();

  if (!variables) {
    return;
  }

  try {
    const links = await prisma.link.findMany({
      include: {
        tags: true,
      },
      take: variables.linksPerPage,
      skip: (page - 1) * variables.linksPerPage,
      orderBy: variables.orderBy,
    });
  
    const totalCount = await prisma.link.count();
  
    return {
      links,
      totalCount
    };

  } catch (error) {
    console.error(`Failed to get all links | ${error}`);
  }
};

/* =============================================================
Get links by search term
============================================================= */

const getLinksBySearch = async (searchTerm: string, page: number) => {
  const variables = await getVariablesForLinks();

  if (!variables) {
    return;
  }

  try {
    const searchTermWords = searchTerm.toLowerCase().split(' ');

    // Creating condition for each search term
    const searchConditions = searchTermWords.map(word => ({
      OR: [
        {
          title: {
            contains: word,
          },
        },
        {
          domain: {
            contains: word,
          },
        },
        {
          tags: {
            some: {
              value: {
                contains: word,
              },
            },
          },
        },
      ],
    }));
  
    const links = await prisma.link.findMany({
      where: {
        AND: searchConditions,
      },
      include: {
        tags: true,
      },
      take: variables.linksPerPage,
      skip: (page - 1) * variables.linksPerPage,
      orderBy: variables.orderBy
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

  } catch (error) {
    console.error(`Failed to get links by search term | ${error}`);
  }
};

/* =============================================================
Get links by tag
============================================================= */

const getLinksByTag = async (tag: string, page: number) => {
  const variables = await getVariablesForLinks();

  if (!variables) {
    return;
  }

  try {
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
      take: variables.linksPerPage,
      skip: (page - 1) * variables.linksPerPage,
      orderBy: variables.orderBy
    });
  
    const totalCount = await prisma.link.count({
      where: searchConditions
    });
  
    return {
      links,
      totalCount 
    };

  } catch (error) {
    console.error(`Failed to get links by tag | ${error}`);
  }
};

/* =============================================================
Get link by id
============================================================= */

const getLinkById = async (id: number) => {
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
  const variables = await getVariablesForLinks();

  if (!variables) {
    return;
  }

  try {
    const response: DbGetLinksResponse = {
      links: [],
      totalCount: 0,
      linksPerPage: variables.linksPerPage,
      sortLinksBy: variables.sortLinksBy
    };

    const isSearchById =  searchQuery && searchQuery.match(/^id:\d+$/);
    const isSearchByTag = searchQuery && searchQuery.match(/^tag:\w+$/);
    const isSearchByText = searchQuery && !isSearchById;

    if (isSearchById) {
      const id = parseInt(searchQuery.replace('id:', ''), 10);
      const link = await getLinkById(id);

      response.links = link === null ? [] : [link];
      response.totalCount = link === null ? 0 : 1;

    } else if (isSearchByTag) {
      const tag = searchQuery.replace('tag:', '');
      const { links, totalCount } = await getLinksByTag(tag, page) || {};

      if (links === undefined || totalCount === undefined) {
        return;
      } else {
        response.links = links;
        response.totalCount = totalCount;
      }
  
    } else if (isSearchByText) {
      const { links, totalCount } = await getLinksBySearch(searchQuery, page) || {};
  
      if (links === undefined || totalCount === undefined) {
        return;
      } else {
        response.links = links;
        response.totalCount = totalCount;
      }

    } else {
      const { links, totalCount } = await getAllLinks(page) || {};
  
      if (links === undefined || totalCount === undefined) {
        return;
      } else {
        response.links = links;
        response.totalCount = totalCount;
      }
    }
  
    return response;

  } catch (error) {
    console.error(`Failed to get links | ${error}`);
  }
};

/* =============================================================
Create new link
============================================================= */

export const createLink = async (data: NewLinkData) => {
  let { url, title, info, tags, priority } = data;

  const priorityToSave = await getPrority(priority, true);
  if (priorityToSave === undefined) {
    return;
  }

  try {
    const tagsArray: string[] = convertStringTagsToArray(tags);

    let tagIds: DbTagId[] = [];
  
    // creating or updating tags and getting their ids
    if (tagsArray.length > 0) {
      const tagRecords = await upsertManyTags(tagsArray);
      tagIds = tagRecords.map((tagRecord) => ({ id: tagRecord.id }));
    }
  
    // creating new link and connecting it with tags
    const newLink = await prisma.link.create({
      data: {
        url,
        domain: getDomain(url),
        title,
        info: info || null,
        priority: priorityToSave,
        tags: {
          connect: tagIds,
        },
      },
      include: {
        tags: true,
      },
    });
  
    return newLink;

  } catch (error) {
    console.error(`Failed to create link | ${error}`);
  }
};

/* =============================================================
Update link
============================================================= */

export const updateLink = async (data: UpdateLinkData) => {
  let { id, url, title, info, tags, priority } = data;

  const priorityToSave = await getPrority(priority, true);
  if (priorityToSave === undefined) {
    return;
  }

  try {
    const newTagsArray: string[] = convertStringTagsToArray(tags);
    const existingTagsArray = await getTagsFromLink(id);
    const deletedTagsArray = existingTagsArray.filter((tag) => !newTagsArray?.includes(tag));
    
    let tagIds: DbTagId[] = [];

    // creating or updating tags and getting their ids
    if (newTagsArray.length > 0) {
      const tagRecords = await upsertManyTags(newTagsArray);
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
        priority: priorityToSave,
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
    
  } catch (error) {
    console.error(`Failed to update link with id ${id} | ${error}`);
  }
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
    console.error(`Failed to delete link with id ${id} | ${error}`);
  }
};

/* =============================================================
Create pinned query
============================================================= */

export const createPinnedQuery = async (data: NewPinnedQueryData) => {
  let { label, query, info, isTagOnlySearch, priority } = data;

  const priorityToSave = await getPrority(priority, false);
  if (priorityToSave === undefined) {
    return;
  }

  try {
    const pinnedQuery = await prisma.pinned.create({
      data: {
        label,
        query,
        isTagOnlySearch,
        info: info || null,
        priority: priorityToSave,
      },
    });
  
    return pinnedQuery; 

  } catch (error) {
    console.error(`Failed to create pinned query | ${error}`);
  }
};

/* =============================================================
Get all pinned queries
============================================================= */

export const getAllPinnedQueries = async () => {
  try {
    const pinnedQueries = await prisma.pinned.findMany({
      orderBy: [
        {
          priority: 'desc',
        },
      ],
    });
  
    return pinnedQueries;

  } catch (error) {
    console.error(`Failed to get all pinned queries | ${error}`);
  }
};

/* =============================================================
Update pinned query
============================================================= */

export const updatePinnedQuery = async (data: UpdatePinnedQueryData) => {
  let { id, label, query, info, isTagOnlySearch, priority } = data;

  const priorityToSave = await getPrority(priority, false);
  if (priorityToSave === undefined) {
    return;
  }

  try {
    const pinnedQuery = await prisma.pinned.update({
      where: { id },
      data: {
        label,
        query,
        isTagOnlySearch,
        info: info || null,
        priority: priorityToSave,
      },
    });
  
    return pinnedQuery;

  } catch (error) {
    console.error(`Failed to update pinned query with id ${id} | ${error}`);
  }
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
    console.error(`Failed to delete pinned query with id ${id} | ${error}`);
  }
};

/* =============================================================
Get settings
============================================================= */

export const getSettings = async () => {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 1 },
    });
  
    return settings as DbSettings;

  } catch (error) {
    console.error(`Failed to find settings | ${error}`);
  }
};

/* =============================================================
Update settings
============================================================= */

export const updateSettings = async (settings: UpdateSettingsData) => {
  try {
    const updatedSettings = await prisma.settings.update({
      where: { id: 1 },
      data: settings
    });
  
    return updatedSettings as DbSettings;

  } catch (error) {
    console.error(`Failed to update settings | ${error}`);
  }
};