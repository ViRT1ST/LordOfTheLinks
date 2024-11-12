'use server';

import { revalidatePath } from 'next/cache';

import type {
  DbGetLinksQuery,
  fetchedUrlData,
  NewLinkData,
  UpdateLinkData
} from '@/types/index';
import * as queries from '@/lib/prisma/queries';

export const getLinksAll = async (
  page = 1,
  resultsPerPage = 9
): Promise<DbGetLinksQuery> => {
  return await queries.getAllLinks(page, resultsPerPage);
};

export const getLinksBySearch = async (
  searchQuery: string,
  page = 1,
  resultsPerPage = 9
): Promise<DbGetLinksQuery> => {
  return await queries.getLinksBySearch(searchQuery, page, resultsPerPage);
};

export const createLink = async (data: NewLinkData) => {
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

export const fetchLinkDataByUrl = async (url: string): Promise<fetchedUrlData> => {
  const data = {
    title: '',
    description: '',
  }

  // Incorrect URL
  if (!/^https?:\/\/.+/.test(url)) { 
    return data;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return data;
    }

    const text = await response.text();

    // Parsing title
    data.title = text.match(/<title>(.*?)<\/title>/i)?.[1]?.trim() ?? '';

    // Parsing description from description or og:description
    data.description =
      text.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i)?.[1]?.trim() ||
      text.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i)?.[1]?.trim() ||
      '';

  } catch (error) {
    /* Do nothing */
  }

  return data;
};

