"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatKey = void 0;
const path = require('path');
exports.formatKey = (inputs) => {
    const { projectName, serverPath, file, branch } = inputs;
    // Optionally, projects can have different paths on our server
    const serverLocation = serverPath ? serverPath : `latest`;
    // eg: 'src/serif-locator/latest/js/app.js`
    const newPath = branch === ('master' || 'main')
        ? serverLocation
        : `${serverLocation}/${branch}`;
    const fullPath = `src/` +
        projectName +
        `/` +
        newPath +
        '/' +
        file.type +
        '/' +
        path.basename(file.path).replace(/([^:]\/)\/+/g, '$1');
    console.log('key made:', fullPath);
    // remove accidental double /'s
    return fullPath;
};
