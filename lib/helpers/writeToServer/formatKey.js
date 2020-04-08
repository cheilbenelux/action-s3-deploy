"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
exports.formatKey = (projectName, serverPath, file, staging) => {
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
    // remove accidental double /'s
    return fullPath.replace(/([^:]\/)\/+/g, '$1');
};
