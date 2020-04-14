"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
exports.formatKey = (projectName, serverPath, file, staging) => {
    console.log('making a key');
    // eg: 'src/serif-locator/latest/js/app.js`
    const newPath = staging ? `${serverPath}/staging` : serverPath;
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
