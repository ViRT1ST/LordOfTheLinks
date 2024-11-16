import 'server-only';

import type { Tag as TagRecord } from '@prisma/client';

import type { NewLinkData, UpdateLinkData, TagId } from '@/types/index';
import { tagStringToArray } from '@/utils/tags';
import prisma from '@/lib/prisma/connect';

/* =============================================================
Get all links
============================================================= */

export const getAllLinks = async (
  page: number,
  resultsPerPage: number
) => {
  const totalCount = await prisma.link.count();

  const links = await prisma.link.findMany({
    include: {
      tags: true,
    },
    take: resultsPerPage,
    skip: (page - 1) * resultsPerPage,
    // orderBy: [
    //   {
    //     priority: 'desc',
    //   },
    // ],
  });

  return {
    links,
    totalCount
  };
};

/* =============================================================
Get links that match all words in search query
============================================================= */

export const getLinksBySearch = async (
  searchQuery: string,
  page: number,
  resultsPerPage: number
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
        url: {
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

  const totalCount = await prisma.link.count({
    where: {
      AND: searchConditions,
    },
  });

  const links = await prisma.link.findMany({
    where: {
      AND: searchConditions,
    },
    include: {
      tags: true,
    },
    take: resultsPerPage,
    skip: (page - 1) * resultsPerPage,
    orderBy: [
      {
        priority: 'desc',
      },
    ],
  });

  return {
    links,
    totalCount
  };
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
  const { url, title, info, tags } = data;

  const tagsArray: string[] = tagStringToArray(tags || '');

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
      title,
      info: info || null,
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
Update link
============================================================= */

export const updateLink = async (data: UpdateLinkData) => {
  const { id, url, title, info, tags } = data;

  const tagsArray: string[] = tagStringToArray(tags || '');

  let tagIds: TagId[] = [];

  // creating or updating tags and getting their ids
  if (tagsArray.length > 0) {
    const tagRecords = await upsertTags(tagsArray);
    tagIds = tagRecords.map((tagRecord) => ({ id: tagRecord.id }));
  }

  // updating link
  const updatedLink = await prisma.link.update({
    where: { id },
    data: {
      url,
      title,
      info: info || null,
      tags: {
        // replacing tags connections
        set: tagIds, 
      },
    },
    include: {
      tags: true,
    },
  });

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