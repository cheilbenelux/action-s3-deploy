module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(526);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 526:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // import github from '@actions/github'
// // import { writeToServer } from './helpers/writeToServer'
const fs_1 = __importDefault(__webpack_require__(747));
// Get project package.json
const projectDir = process.env.GITHUB_WORKSPACE;
const projectPackageData = fs_1.default.readFileSync(`${projectDir}/package.json`);
const projectJson = JSON.parse(projectPackageData.toString());
const packageInfo = projectJson;
// Get project specific settings
const { deploySettings: { bucket, serverPath: path, buildFiles }, name: projectName, } = packageInfo;
// const { accessKeyId, secretAccessKey } = process.env
const run = async () => {
    console.log(projectJson);
    // core.debug(projectJson)
};
// try {
//   run()
//   //   //   writeToServer()
//   //   //   // `who-to-greet` input defined in action metadata file
//   //   //   // const nameToGreet = core.getInput('who-to-greet')
//   //   //   // console.log(`Hello ${nameToGreet}!`)
//   //   //   // const time = new Date().toTimeString()
//   //   //   // core.setOutput('time', time)
//   //   //   // // Get the JSON webhook payload for the event that triggered the workflow
//   //   //   // const payload = JSON.stringify(github.context.payload, undefined, 2)
//   //   //   // console.log(`The event payload: ${payload}`)
// } catch (error) {
//   // core.setFailed(error.message)
// }


/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ })

/******/ });