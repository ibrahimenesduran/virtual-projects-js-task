// Please update this type as same as with the data shape.
type List = { id: string; name: string; files: { id: string; name: string }[] }[];
type ObjectList = {
  [key: string]: {
    id: string;
    name: string;
    files: { [key: string]: { id: string; name: string } };
  };
};

const listToObject = (list: List): ObjectList => {
  const object: ObjectList = {};
  list.forEach((folder: { id: string; name: string; files: { id: string; name: string }[] }) => {
    const files: { [key: string]: { id: string; name: string } } = {};
    folder.files.forEach((file: { id: string; name: string }) => {
      files[file.id] = {
        name: file.name,
        id: file.id,
      };
    });
    object[folder.id.toString()] = {
      name: folder.name,
      id: folder.id,
      files,
    };
  });
  return object;
};

const objectToList = (object: ObjectList): List => {
  const list: List = [];
  Object.keys(object).forEach((key) => {
    const files: { id: string; name: string }[] = [];
    Object.keys(object[key].files).forEach((index) => {
      files.push({ id: object[key].files[index].id, name: object[key].files[index].name });
    });
    list.push({
      id: object[key].id,
      name: object[key].name,
      files,
    });
  });
  return list;
};

const fileFinder = (object: ObjectList, source: string): string => {
  let sourceIndex = '';
  Object.keys(object).forEach((folderIndex) => {
    Object.keys(object[folderIndex].files).forEach((fileIndex) => {
      if (fileIndex === source) {
        sourceIndex = folderIndex;
      }
    });
  });

  return sourceIndex;
};

const folderFinder = (object: ObjectList, source: string): string => {
  let sourceIndex = '';
  Object.keys(object).forEach((folderIndex) => {
    if (folderIndex === source) {
      sourceIndex = folderIndex;
    }
  });
  return sourceIndex;
};

const deleteFileSourceFolder = (
  object: ObjectList,
  sourceFolder: string,
  sourceFile: string,
): ObjectList => {
  const deletedFileObject = object;
  delete deletedFileObject[sourceFolder].files[sourceFile];
  return deletedFileObject;
};

const copySourceFile = (
  object: ObjectList,
  sourceFolder: string,
  sourceFile: string,
): { id: string; name: string } => {
  const tempFile = object[sourceFolder].files[sourceFile];
  return tempFile;
};

const moveSourceFileToDestination = (
  object: ObjectList,
  sourceFolder: string,
  sourceFile: string,
  destinationFolder: string,
): List => {
  const tempFileObject = copySourceFile(object, sourceFolder, sourceFile);
  const deletedFileObject = deleteFileSourceFolder(object, sourceFolder, sourceFile);
  const deleteFileList = objectToList(deletedFileObject);
  const movedFileList: List = [];
  deleteFileList.forEach((folder) => {
    if (folder.id === destinationFolder) {
      folder.files.push(tempFileObject);
    }
    movedFileList.push(folder);
  });
  return movedFileList;
};

export default function move(list: List, source: string, destination: string): List {
  const object = listToObject(list);

  if (folderFinder(object, destination) === '')
    throw new Error('You cannot specify a file as the destination');
  if (fileFinder(object, source) === '') throw new Error('You cannot move a folder');

  const sourceFolder = fileFinder(object, source);
  const movedFileList = moveSourceFileToDestination(object, sourceFolder, source, destination);

  return movedFileList;
}
