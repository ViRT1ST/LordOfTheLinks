'use server';

import {
  type NewLinkData,
  type UpdateLinkData,
  type NewPinnedQueryData,
  type UpdatePinnedQueryData,
  type UpdateSettingsData
} from '@/types/index';
import * as queries from '@/lib/prisma/queries';
import * as icons from '@/utils/icons';

/* =============================================================
Links
============================================================= */

export const getLinks = async (searchQuery: string | null, page: number) => {
  return await queries.getLinks(searchQuery, page);
};

export const createLink = async (data: NewLinkData) => {
  const link = await queries.createLink(data);
  await icons.createImageForLink(data);
  return link;
};

export const updateLink = async (data: UpdateLinkData) => {
  const link = await queries.updateLink(data);
  return link;
};

export const deleteLink = async (id: number) => {
  const link = await queries.deleteLink(id);
  return link;
};

/* =============================================================
Pinned Queries
============================================================= */

export const getPinnedQueries = async () => {
  return await queries.getAllPinnedQueries();
};

export const createPinnedQuery = async (data: NewPinnedQueryData) => {
  const pinnedQuery = await queries.createPinnedQuery(data);
  return pinnedQuery;
};

export const updatePinnedQuery = async (data: UpdatePinnedQueryData) => {
  const pinnedQuery = await queries.updatePinnedQuery(data);
  return pinnedQuery;
};

export const deletePinnedQuery = async (id: number) => {
  const pinnedQuery = await queries.deletePinnedQuery(id);
  return pinnedQuery;
};

/* =============================================================
Settings
============================================================= */

export const getSettings = async () => {
  return await queries.getSettings();
};

export const updateSettings = async (settings: UpdateSettingsData) => {
  return await queries.updateSettings(settings);
};

