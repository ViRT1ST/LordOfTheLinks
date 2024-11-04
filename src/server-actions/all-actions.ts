'use server';

import { revalidatePath } from 'next/cache';

import type { DbLinkWithTags, NewLinkData, UpdateLinkData } from '@/types/index';
import * as queries from '@/lib/prisma/queries';

export const getLinksAll = async (): Promise<DbLinkWithTags[]> => {
  return await queries.getAllLinks();
};

export const getLinksBySearch = async (searchQuery: string): Promise<DbLinkWithTags[]> => {
  return await queries.getLinksBySearch(searchQuery);
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