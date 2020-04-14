"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
exports.formatKey = (projectName, serverPath, file, branch) => {
    // eg: 'src/serif-locator/latest/js/app.js`
    const newPath = branch === 'master' ? serverPath : `${serverPath}/${branch}`;
    const fullPath = `src/` +
        projectName +
        `/` +
        newPath +
        '/' +
        file.type +
        '/' +
        path.basename(file.path);
    console.log('key made:', fullPath.replace(/([^:]\/)\/+/g, '$1'));
    // remove accidental double /'s
    return fullPath.replace(/([^:]\/)\/+/g, '$1');
};
