import 'server-only';

import type { Tag as TagRecord } from '@prisma/client';

import type { NewLinkData, UpdateLinkData, TagId } from '@/types/index';
import prisma from '@/lib/prisma/connect';

/* =============================================================
Get all links
============================================================= */

export const getAllLinks = async () => {
  return await prisma.link.findMany({
    include: {
      tags: true,
    },
  });
};

/* =============================================================
Get links that match all words in search query
============================================================= */

export const getLinksBySearch = async (searchQuery: string) => {
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

  return await prisma.link.findMany({
    where: {
      // Every word should be found in one of the fields
      AND: searchConditions,
    },
    include: {
      tags: true,
    },
  });
};

/* =============================================================
Create or update tag and return it record
============================================================= */

const upsertTag = async (value: string): Promise<TagRecord> => {
  const lowerValue = value.toLowerCase();

  return await prisma.tag.upsert({
    where: {
      value: lowerValue
    },
    create: {
      value: lowerValue
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
  const { title, url, tags } = data;

  let tagIds: TagId[] = [];

  // creating or updating tags and getting their ids
  if (tags && tags.length > 0) {
    const tagRecords = await upsertTags(tags);
    tagIds = tagRecords.map((tagRecord) => ({ id: tagRecord.id }));
  }

  // creating new link and connecting it with tags
  const newLink = await prisma.link.create({
    data: {
      title,
      url,
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
  const { id, title, url, tags } = data;

  let tagIds: TagId[] = [];

  // creating or updating tags and getting their ids
  if (tags && tags.length > 0) {
    const tagRecords = await upsertTags(tags);
    tagIds = tagRecords.map((tagRecord) => ({ id: tagRecord.id }));
  }

  // updating link
  const updatedLink = await prisma.link.update({
    where: { id },
    data: {
      title,
      url,
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