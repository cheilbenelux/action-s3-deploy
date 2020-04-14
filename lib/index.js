"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// // import github from '@actions/github'
const writeToServer_1 = require("./helpers/writeToServer");
const fs = __importStar(require("fs"));
// Get project package.json
const projectDir = process.env.GITHUB_WORKSPACE;
const projectPackageData = fs.readFileSync(`${projectDir}/package.json`);
const projectJson = JSON.parse(projectPackageData.toString());
const packageInfo = projectJson;
const staging = process.env.GITHUB_REF === 'refs/heads/staging';
// Get project specific settings
const { deploySettings: { bucket, path, buildFiles }, name: projectName, } = packageInfo;
// const { accessKeyId, secretAccessKey } = process.env
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('heyy');
    console.log(projectJson);
    console.log(process.env.GITHUB_REF);
    // core.debug(projectJson)
});
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
