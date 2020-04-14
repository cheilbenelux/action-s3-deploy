"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
exports.formatKey = (projectName, serverPath, file, branch) => {
    // Optionally, projects can have different paths on our server
    let serverLocation = serverPath ? serverPath : `latest/`;
    // eg: 'src/serif-locator/latest/js/app.js`
    const newPath = branch === 'master' ? serverLocation : `${serverLocation}/${branch}`;
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
