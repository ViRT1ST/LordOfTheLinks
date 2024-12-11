import 'server-only';

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

import { type NewLinkData } from '@/types';
import { FAVICON_SIZE } from '@/config/public';
import { getDomain } from '@/utils/formatting';

const defaultBase64Icon = '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';

const getIconUrlsFrom3dPartyServices = (pageUrl: string) => {
  let iconsUrls: string[] = [];

  try {
    const pageUrlHost = new URL(pageUrl).host;
    
    iconsUrls = [
      `https://www.google.com/s2/favicons?domain_url=${pageUrlHost}&sz=96`,
      `https://api.faviconkit.com/${pageUrlHost}`,
      `https://logo.clearbit.com/${pageUrlHost}`,
    ];

  } catch (error) {
    /* Do nothing */
  }

  return iconsUrls;
};

export const createBase64Image = (buffer: Buffer | null) => {
  return buffer ? buffer.toString('base64') : null;
};

export const getGoodBase64IconFromUrl = async (url: string) => {
  let base64Icon: string | null = null;

  try {
    const imageResponse = await fetch(url);

    if (imageResponse.ok) {
      const iconArrayBuffer = await imageResponse.arrayBuffer();
      const iconBuffer = Buffer.from(iconArrayBuffer);

      const sourceSharpObj = sharp(iconBuffer);
      const sourceMetadata = await sourceSharpObj.metadata();

      const isGoodSvg =
        sourceMetadata.format === 'svg' &&
        sourceMetadata.width === sourceMetadata.height;
      const isGoodRaster =
        sourceMetadata.width === sourceMetadata.height &&
        sourceMetadata.width !== undefined &&
        sourceMetadata.width >= FAVICON_SIZE;

      if (isGoodSvg || isGoodRaster) {
        const pngBuffer = await sourceSharpObj
          .resize({ width: FAVICON_SIZE, height: FAVICON_SIZE })
          .toFormat('png')
          .toBuffer();

        base64Icon = createBase64Image(pngBuffer);
      }
    }
  } catch (error) {
    /* Do nothing */
  }

  return base64Icon;
};

export const checkFileExists = async (filePath: string) => {
  const fileExists = async (path: string): Promise<boolean> => {
    return fs.promises
      .access(path)
      .then(() => true)
      .catch(() => false);
  };

  return await fileExists(filePath);
};

export const saveBase64ImageOnDisk = async (base64Data: string | null, filePath: string) => {
  let isSaved = false;

  if (!base64Data) {
    return isSaved;
  }

  try {        
    await fs.promises.writeFile(filePath, base64Data, 'base64');
    isSaved = true;
  } catch (error) {
    /* Do nothing */
  }

  return isSaved;
};

export const copyFile = async (src: string, dest: string) => {
  try {
    await fs.promises.copyFile(src, dest);
  } catch (error) {
    /* Do nothing */
  }
};

export const createImageForLink = async (data: NewLinkData) => {
  const { url, faviconUrls } = data;

  // extract to config
  const publicIconsFolder = path.join(process.cwd(), 'public', 'images', 'site-icons');

  const fileName = getDomain(url) + '.png';
  const filePath = path.join(publicIconsFolder, fileName);
  const isFileExists = await checkFileExists(filePath);

  let iconIsSavedOnDisk = false;

  if (!isFileExists) {
    const allFaviconUrls = [
      ...faviconUrls,
      ...getIconUrlsFrom3dPartyServices(url)
    ];

    for (const faviconUrl of allFaviconUrls) {
      if (!iconIsSavedOnDisk) {
        console.log('Current favicon url fetching: ', faviconUrl);
        const goodBase64Icon  = await getGoodBase64IconFromUrl(faviconUrl);

        if (goodBase64Icon) {
          iconIsSavedOnDisk = await saveBase64ImageOnDisk(goodBase64Icon, filePath);
        }
      }
    }

    if (!iconIsSavedOnDisk) {
      await saveBase64ImageOnDisk(defaultBase64Icon, filePath);
    }
  }
};
