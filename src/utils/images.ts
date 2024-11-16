import 'server-only';

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

import { FAVICON_MIN_SIZE_FOR_SAVE, FAVICON_SIZE_TO_DISPLAY } from '@/config/public';
import { type NewLinkData } from '@/types';
import { defaultBase64Icon } from '@/utils/other';
import * as parsing from '@/utils/parsing';

export const createBase64Image = (buffer: Buffer | null) => {
  return buffer ? buffer.toString('base64') : null;
};

export const getGoodBase64IconFromUrl = async (url: string) => {
  let base64Icon: string | null = null;

  const iconSizeToSave = FAVICON_MIN_SIZE_FOR_SAVE;
  const iconSizeToResize = FAVICON_SIZE_TO_DISPLAY;

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
        sourceMetadata.width >= iconSizeToSave;

      if (isGoodSvg || isGoodRaster) {
        const pngBuffer = await sourceSharpObj
          .resize({ width: iconSizeToResize, height: iconSizeToResize })
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

  const fileName = parsing.getDomain(url) + '.png';
  const filePath = path.join(publicIconsFolder, fileName);
  const isFileExists = await checkFileExists(filePath);

  let iconIsSavedOnDisk = false;

  if (!isFileExists) {
    const allFaviconUrls = [
      ...faviconUrls,
      ...parsing.getIconUrlsFrom3dPartyServices(url)
    ];

    for (const faviconUrl of allFaviconUrls) {
      if (!iconIsSavedOnDisk) {

        // delete later
        console.log(faviconUrl);
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
