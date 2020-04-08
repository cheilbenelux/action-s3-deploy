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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const fs_1 = __importDefault(require("fs"));
// Get project package.json
const projectDir = '/github';
const projectPackageData = fs_1.default.readFileSync(`${projectDir}/package.json`);
const projectJson = JSON.parse(projectPackageData.toString());
const packageInfo = projectJson;
// Get project specific settings
const { deploySettings: { bucket, serverPath: path, buildFiles }, name: projectName, } = packageInfo;
const { accessKeyId, secretAccessKey } = process.env;
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    core_1.default.debug(JSON.stringify(process.env));
    core_1.default.debug(packageInfo);
});
// try {
//   writeToServer()
//   // `who-to-greet` input defined in action metadata file
//   // const nameToGreet = core.getInput('who-to-greet')
//   // console.log(`Hello ${nameToGreet}!`)
//   // const time = new Date().toTimeString()
//   // core.setOutput('time', time)
//   // // Get the JSON webhook payload for the event that triggered the workflow
//   // const payload = JSON.stringify(github.context.payload, undefined, 2)
//   // console.log(`The event payload: ${payload}`)
// } catch (error) {
//   core.setFailed(error.message)
// }
