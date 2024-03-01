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

export const generateUniqueName = (name, items) => {
  const fileArr = name.split('.');
  const fileExtension = fileArr.pop();
  const fileName = fileArr.join('.');
  const newName = `${fileName}_copy.${fileExtension || ''}`;
  const findItem = items.find((item) => item.filename === newName);
  if (findItem) {
    return generateUniqueName(newName, items);
  }
  return newName;
};

export const isZip = (name) => {
  const arr = name.split('.');
  const ext = arr.pop();
  return ext === 'zip';
};
