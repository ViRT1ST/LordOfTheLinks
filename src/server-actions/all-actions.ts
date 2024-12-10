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
  type UpdatePinnedQueryData,
  type SortingOrderVariants
} from '@/types/index';
import * as htmlParsing from '@/utils/html-parsing';
import * as queries from '@/lib/prisma/queries';
import * as icons from '@/utils/icons';

/* =============================================================
Links
============================================================= */

export const getLinks = async (
  searchQuery: string | null,
  sort: SortingOrderVariants | null,
  page: number,
  resultsPerPage: number
): Promise<DbGetLinksResponse> => {
  return await queries.getLinks(searchQuery, sort, page, resultsPerPage);
};

export const createLink = async (data: NewLinkData) => {
  await icons.createImageForLink(data);
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
      data.title = decode(htmlParsing.getTitleFromHtmlSource(text));
      data.description = decode(htmlParsing.getDescriptionFromHtmlSource(text));
      data.faviconUrls = htmlParsing.getIconUrlsFromHtmlSource(text, url);
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

export const getSettings = async () => {
  return await queries.getSettings();
};

export const setSortingInSettings = async (sorting: SortingOrderVariants) => {
  await queries.updateSettingsValue('sortLinksBy', sorting);
};

