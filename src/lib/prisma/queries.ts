import 'server-only';

import type { NewLinkInput, EditLinkInput, TagConnection } from '@/types/index';
import prisma from '@/lib/prisma/connect';

export const getAllLinks = async () => {
  return await prisma.link.findMany({});
};

export const getLinksBySearch = async (searchQuery: string) => {
  const searchLower = searchQuery.toLowerCase();

  return await prisma.link.findMany({
    where: {
      OR: [
        {
          tags: {
            some: {
              value: {
                contains: searchLower,
              },
            },
          },
        },
        {
          title: {
            contains: searchLower,
          },
        },
        {
          url: {
            contains: searchLower,
          },
        },
      ],
    },
    include: {
      tags: true,
    },
  });
};

export const addLink = async (linkData: NewLinkInput) => {
  const { title, url, tags } = linkData;

  // creating tags
  const tagConnections: TagConnection[] = await Promise.all(
    tags.map(async (tagName) => {
      const tag = await prisma.tag.upsert({
        where: { value: tagName },
        update: {},
        create: { value: tagName },
      });
      return { id: tag.id };
    })
  );

  // creating new link and connecting it with tags
  const newLink = await prisma.link.create({
    data: {
      title,
      url,
      tags: {
        connect: tagConnections,
      },
    },
    include: {
      tags: true,
    },
  });

  return newLink;
};


export const editLink = async (linkData: EditLinkInput) => {
  const { id, title, url, tags } = linkData;

  // if tags are provided, handle them
  let tagConnections: TagConnection[] = [];
  if (tags && tags.length > 0) {
    tagConnections = await Promise.all(
      tags.map(async (tagValue) => {
        const tag = await prisma.tag.upsert({
          where: { value: tagValue },
          update: {},
          create: { value: tagValue },
        });
        return { id: tag.id };
      })
    );
  }

  // updating link
  const updatedLink = await prisma.link.update({
    where: { id },
    data: {
      title,
      url,
      tags: {
        // replacing tags connections
        set: tagConnections, 
      },
    },
    include: {
      tags: true,
    },
  });

  return updatedLink;
};
