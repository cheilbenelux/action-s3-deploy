"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const writeToServer_1 = require("./helpers/writeToServer");
const fs = __importStar(require("fs"));
// Get project package.json
const projectDir = process.env.GITHUB_WORKSPACE;
const projectPackageData = fs.readFileSync(`${projectDir}/package.json`);
const projectJson = JSON.parse(projectPackageData.toString());
const packageInfo = projectJson;
const branch = process.env.GITHUB_REF
    ? process.env.GITHUB_REF.replace('refs/heads/', '')
    : '';
// Get project specific settings
const { deploySettings: { bucket, path: serverPath, buildFiles }, name: projectName, } = packageInfo;
try {
    writeToServer_1.writeToServer({ bucket, serverPath, buildFiles, projectName }, branch);
}
catch (error) {
    core.setFailed(error.message);
}
