'use server';

import { revalidatePath } from 'next/cache';
import { decode } from 'html-entities';

import {
  type DbGetLinksResponse,
  type DbPinnedQuery,
  type FetchedUrlData,
  type NewLinkData,
  type NewPinnedQueryData,
  type UpdateLinkData,
  type UpdatePinnedQueryData
} from '@/types/index';
import { LINKS_PER_PAGE } from '@/config/public';
import * as queries from '@/lib/prisma/queries';
import * as parsing from '@/utils/parsing';
import * as images from '@/utils/images';

/* =============================================================
Links
============================================================= */

export const getLinks = async (searchQuery: string, page = 1):
  Promise<DbGetLinksResponse> => {
  return await queries.getLinks(searchQuery, page, LINKS_PER_PAGE);
};


// export const getLinksAll = async (page = 1):
//   Promise<DbGetLinksResponse> => {
//   return await queries.getAllLinks(page, LINKS_PER_PAGE);
// };

// export const getLinksBySearch = async (searchQuery: string, page = 1):
//   Promise<DbGetLinksResponse> => {
//   return await queries.getLinksBySearch(searchQuery, page, LINKS_PER_PAGE);
// };

// export const getLinkById = async (id: number):
//   Promise<DbGetLinksResponse> => {
//   const link = await queries.getLinkById(id);
  
//   return {
//     links: link ? [link] : [],
//     totalCount: 1
//   };
// };

export const createLink = async (data: NewLinkData) => {
  await images.createImageForLink(data);
  const link = await queries.createLink(data);
  revalidatePath('/');
  return link;
};

export const updateLink = async (data: UpdateLinkData) => {
  await queries.updateLink(data);
  revalidatePath('/');
};

export const deleteLink = async (id: number) => {
  await queries.deleteLink(id);
  revalidatePath('/');
};

export const fetchLinkDataByUrl = async (url: string): Promise<FetchedUrlData> => {
  const data = {
    title: '',
    description: '',
    faviconUrls: [] as string[],
  };

  // Incorrect URL
  if (!/^https?:\/\/.+/.test(url)) { 
    return data;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Google-InspectionTool/1.0)'
      }
    });

    const text = await response.text();

    if (text && text.length !== 0) {
      data.title = decode(parsing.getTitleFromHtmlSource(text));
      data.description = decode(parsing.getDescriptionFromHtmlSource(text));
      data.faviconUrls = parsing.getIconUrlsFromHtmlSource(text, url);
    }
  } catch (error) {
    /* Do nothing */
  }

  return data;
};

/* =============================================================
Pinned Queries
============================================================= */

export const createPinnedQuery = async (data: NewPinnedQueryData) => {
  const pinnedQuery = await queries.createPinnedQuery(data);
  revalidatePath('/');
  return pinnedQuery;
};

export const getPinnedQueriesAll = async () => {
  return await queries.getAllPinnedQueries();
};

export const updatePinnedQuery = async (data: UpdatePinnedQueryData) => {
  await queries.updatePinnedQuery(data);
  revalidatePath('/');
};

export const deletePinnedQuery = async (id: number) => {
  await queries.deletePinnedQuery(id);
  revalidatePath('/');
};

