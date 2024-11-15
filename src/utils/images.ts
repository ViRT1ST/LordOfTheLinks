import 'server-only';

import { parseICO } from 'icojs';
import sharp from 'sharp';
import fs from "fs";

export const getImageBufferByUrl = async (url: string) => {
  let imageBuffer: Buffer | null = null;

  try {
    const imageResponse = await fetch(url);

    if (imageResponse.ok) {
      const iconArrayBuffer = await imageResponse.arrayBuffer();
      const iconBuffer = Buffer.from(iconArrayBuffer);

      // Handling ico format
      if (url.endsWith('.ico')) {
        const pngImages = await parseICO(iconBuffer, 'image/png');

        if (pngImages.length > 0) {
          const biggestImage = pngImages.reduce((biggest, current) => {
            return current.width > biggest.width
              ? current
              : biggest;
          }, pngImages[0]);

          imageBuffer = Buffer.from(biggestImage.buffer);
        }

      // Handling non-ico formats
      } else {
        imageBuffer = Buffer.from(iconBuffer.buffer);
      }
    }
  } catch (error) {
    /* Do nothing */
  }

  return imageBuffer;
};

export const prepareIconBufferToSave = async (buffer: Buffer | null) => {
  let finalBuffer: Buffer | null = null;

  if (!buffer) {
    return finalBuffer;
  }

  // Get width and height
  const sizeToSave = 96;
  const metadata = await sharp(buffer).metadata();
  const { width = 0, height = 0 } = metadata;

  // We only need images that are at least 96x96
  if (width >= sizeToSave && height >= sizeToSave) {
    let croppedBuffer = buffer;

    // Check if the image is a square
    if (width && height && width !== height) {
      const size = Math.min(width, height); // Min side
      const left = Math.floor((width - size) / 2); // Cut left
      const top = Math.floor((height - size) / 2); // Cut top

      // Cut to the square
      croppedBuffer = await sharp(buffer)
        .extract({ left, top, width: size, height: size })
        .toBuffer();
    }

    finalBuffer = await sharp(croppedBuffer)
      .resize(sizeToSave, sizeToSave)
      .toFormat('png')
      .toBuffer();
  }

  return finalBuffer;
};

export const createBase64Image = (buffer: Buffer | null) => {
  return buffer ? buffer.toString('base64') : null;
};

export const checkFileExists = async (filePath: string) => {
  const fileExists = async (path: string): Promise<boolean> => {
    return fs.promises
      .access(path)
      .then(() => true)
      .catch(() => false);
  };

  return await fileExists(filePath)
};

export const saveFileOnDisk = async (base64Data: string | null, filePath: string) => {
  let isFileSaved = false;

  if (!base64Data) {
    return isFileSaved;
  }

  try {        
    await fs.promises.writeFile(filePath, base64Data, 'base64');
    isFileSaved = true;
  } catch (error) {
    /* Do nothing */
  }

  return isFileSaved;
}