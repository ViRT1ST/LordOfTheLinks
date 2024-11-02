'use server';

import type { dbLinkWithTags, NewLinkData, UpdateLinkData } from '@/types/index';
import * as queries from '@/lib/prisma/queries';

export const getLinksAll = async (): Promise<dbLinkWithTags[]> => {
  return await queries.getAllLinks();
};

export const getLinksBySearch = async (searchQuery: string): Promise<dbLinkWithTags[]> => {
  return await queries.getLinksBySearch(searchQuery);
};

export const createLink = async (data: NewLinkData) => {
  await queries.createLink(data);
};

export const updateLink = async (data: UpdateLinkData) => {
  await queries.updateLink(data);
};