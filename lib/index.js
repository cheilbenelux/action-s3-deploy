"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // import github from '@actions/github'
const writeToServer_1 = require("./helpers/writeToServer");
const fs_1 = __importDefault(require("fs"));
// Get project package.json
const projectDir = process.env.GITHUB_WORKSPACE;
const projectPackageData = fs_1.default.readFileSync(`${projectDir}/package.json`);
const projectJson = JSON.parse(projectPackageData.toString());
const packageInfo = projectJson;
const staging = process.env.GITHUB_REF === 'refs/heads/staging';
// Get project specific settings
const { deploySettings: { bucket, path, buildFiles }, name: projectName, } = packageInfo;
// const { accessKeyId, secretAccessKey } = process.env
const run = async () => {
    console.log('heyy');
    console.log(projectJson);
    console.log(process.env.GITHUB_REF);
    // core.debug(projectJson)
};
try {
    // run()
    writeToServer_1.writeToServer({ bucket, path, buildFiles, projectName }, staging);
    //   //   // `who-to-greet` input defined in action metadata file
    //   //   // const nameToGreet = core.getInput('who-to-greet')
    //   //   // console.log(`Hello ${nameToGreet}!`)
    //   //   // const time = new Date().toTimeString()
    //   //   // core.setOutput('time', time)
    //   //   // // Get the JSON webhook payload for the event that triggered the workflow
    //   //   // const payload = JSON.stringify(github.context.payload, undefined, 2)
    //   //   // console.log(`The event payload: ${payload}`)
}
catch (error) {
    // core.setFailed(error.message)
}
