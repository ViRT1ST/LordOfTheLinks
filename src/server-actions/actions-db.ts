'use server';

import { revalidatePath } from 'next/cache';

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
  await icons.createImageForLink(data); // move
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

/* =============================================================
Pinned Queries
============================================================= */

export const getPinnedQueries = async () => {
  return await queries.getAllPinnedQueries();
};

export const createPinnedQuery = async (data: NewPinnedQueryData) => {
  const pinnedQuery = await queries.createPinnedQuery(data);
  revalidatePath('/');
  return pinnedQuery;
};

export const updatePinnedQuery = async (data: UpdatePinnedQueryData) => {
  const pinnedQuery = await queries.updatePinnedQuery(data);
  revalidatePath('/');
  return pinnedQuery;
};

export const deletePinnedQuery = async (id: number) => {
  await queries.deletePinnedQuery(id);
  revalidatePath('/');
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

