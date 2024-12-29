'use server';

import { revalidatePath } from 'next/cache';
import { decode } from 'html-entities';

import { type ParsedHtmlData } from '@/types/index';
import * as htmlParsing from '@/utils/html-parsing';

export const fetchLinkDataByUrl = async (url: string): Promise<ParsedHtmlData> => {
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
        'User-Agent': 'Mozilla/5.0 (compatible; Google-InspectionTool/1.0)',
      },
    });

    const text = await response.text();

    if (typeof text === 'string' && text.length !== 0) {
      data.title = decode(htmlParsing.getTitleFromHtmlSource(text));
      data.description = decode(htmlParsing.getDescriptionFromHtmlSource(text));
      data.faviconUrls = htmlParsing.getIconUrlsFromHtmlSource(text, url);
    }
  } catch (error) {
    /* Do nothing */
  }

  return data;
};

export const revalidateRootPath = () => {
  revalidatePath('/');
};