"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listToObject = (list) => {
    const object = {};
    list.forEach((folder) => {
        const files = {};
        folder.files.forEach((file) => {
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
const objectToList = (object) => {
    const list = [];
    Object.keys(object).forEach((key) => {
        const files = [];
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
const fileFinder = (object, source) => {
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
const folderFinder = (object, source) => {
    let sourceIndex = '';
    Object.keys(object).forEach((folderIndex) => {
        if (folderIndex === source) {
            sourceIndex = folderIndex;
        }
    });
    return sourceIndex;
};
const deleteFileSourceFolder = (object, sourceFolder, sourceFile) => {
    const deletedFileObject = object;
    delete deletedFileObject[sourceFolder].files[sourceFile];
    return deletedFileObject;
};
const copySourceFile = (object, sourceFolder, sourceFile) => {
    const tempFile = object[sourceFolder].files[sourceFile];
    return tempFile;
};
const moveSourceFileToDestination = (object, sourceFolder, sourceFile, destinationFolder) => {
    const tempFileObject = copySourceFile(object, sourceFolder, sourceFile);
    const deletedFileObject = deleteFileSourceFolder(object, sourceFolder, sourceFile);
    const deleteFileList = objectToList(deletedFileObject);
    const movedFileList = [];
    deleteFileList.forEach((folder) => {
        if (folder.id === destinationFolder) {
            folder.files.push(tempFileObject);
        }
        movedFileList.push(folder);
    });
    return movedFileList;
};
function move(list, source, destination) {
    const object = listToObject(list);
    if (folderFinder(object, destination) === '')
        throw new Error('You cannot specify a file as the destination');
    if (fileFinder(object, source) === '')
        throw new Error('You cannot move a folder');
    const sourceFolder = fileFinder(object, source);
    const movedFileList = moveSourceFileToDestination(object, sourceFolder, source, destination);
    return movedFileList;
}
exports.default = move;
//# sourceMappingURL=move.js.map