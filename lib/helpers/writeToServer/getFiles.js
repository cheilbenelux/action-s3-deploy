"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cherryPickFiles = exports.getAllFiles = void 0;
const fs = require('file-system');
// gets all the buildfiles
exports.getAllFiles = (type) => {
    try {
        return fs
            .readdirSync(`dist/${type}/`)
            .map((fileName) => ({ path: `dist/${type}/${fileName}`, type }));
    }
    catch (err) {
        return [];
    }
};
// Used when specific files are listed in the package.json of the project
exports.cherryPickFiles = (fileNames) => {
    return fileNames.map((fileName) => ({
        path: `dist/${fileName}`,
        type: fileName.split('.')[1],
    }));
};
