import * as zip from '@zip.js/zip.js';

export const extractFile = async (item, dirPicker) => {
  if (item.filename.includes('/') || item.directory) {
    return false;
  }
  const fileData = await item.getData(new zip.BlobWriter());
  const fileHandle = await dirPicker.getFileHandle(item.filename, {
    create: true,
  });
  const writable = await fileHandle.createWritable();
  const content = await fileData.arrayBuffer();

  await writable.write(content);
  await writable.close();
};

export const getEntries = async (event) => {
  const zipReader = new zip.ZipReader(
    new zip.BlobReader(new Blob([event.target.result])),
  );

  const entries = await zipReader.getEntries();

  return entries.filter((item) => {
    if (item.directory) {
      return false;
    }
    if (item.filename.includes('/')) {
      return false;
    }
    return true;
  });
};

export const tick = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));
