"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cherryPickFiles = exports.getAllFiles = void 0;
const fs = require('file-system');
// gets all the buildfiles
exports.getAllFiles = (type, buildFolder) => {
    const _buildFolder = buildFolder || 'dist';
    try {
        return fs
            .readdirSync(`${_buildFolder}/${type}/`)
            .map((fileName) => ({
            path: `${_buildFolder}/${type}/${fileName}`,
            type,
        }));
    }
    catch (err) {
        return [];
    }
};
// Used when specific files are listed in the package.json of the project
exports.cherryPickFiles = (fileNames, buildFolder) => {
    const _buildFolder = buildFolder || 'dist';
    return fileNames.map((fileName) => ({
        path: `${_buildFolder}/${fileName}`,
        type: fileName.split('.')[1],
    }));
};
