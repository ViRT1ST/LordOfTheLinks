'use server';

import { revalidatePath } from 'next/cache';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

import type {
  DbGetLinksQuery,
  FetchedUrlData,
  NewLinkData,
  UpdateLinkData
} from '@/types/index';
import * as queries from '@/lib/prisma/queries';
import * as parsing from '@/utils/parsing';
import * as images from '@/utils/images';

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

export const fetchLinkDataByUrl = async (url: string): Promise<FetchedUrlData> => {
  const data = {
    title: '',
    description: '',
    faviconUrl: '',
  };

  // Incorrect URL
  if (!/^https?:\/\/.+/.test(url)) { 
    return data;
  }

  try {
    // const puppeteerOptions = {
    //   headless: true,
    //   args: [
    //     '--fast-start',
    //     '--disable-extensions',
    //     '--no-sandbox',
    //     '--window-position=0,-10000'
    //   ],
    //   ignoreHTTPSErrors: true,
    //   defaultViewport: null
    // }

    // const browser = await puppeteer.launch(puppeteerOptions);
    // const page = await browser.newPage();
    // await page.goto(url);

    // const text = await page.content();
    // await browser.close();

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      return data;
    }

    const text = await response.text();

    if (text.length !== 0) {
      data.title = parsing.getTitleFromHtmlSource(text);
      data.description = parsing.getDescriptionFromHtmlSource(text);
      data.faviconUrl = parsing.getIconUrlFromHtmlSource(text, url);
    }

    console.log(data)

  } catch (error) {
    /* Do nothing */
  }

  return data;
};

