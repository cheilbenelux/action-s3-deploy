"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const getFiles_1 = require("./getFiles");
const formatKey_1 = require("./formatKey");
console.log('writing to server');
// Get from secrets
// const { ACCESSKEYID, secretAccessKey } = require('./settings')
exports.writeToServer = (projectOptions, branch) => {
    console.log('1');
    try {
        const { bucket, projectName, path, buildFiles } = projectOptions;
        const streamOptions = {
            partSize: 10 * 1024 * 1024,
            queueSize: 10,
        };
        console.log('2 in the try');
        const endpoint = new aws_sdk_1.default.Endpoint(`ams3.digitaloceanspaces.com`);
        const { ACCESSKEYID, SECRETACCESSKEY } = process.env;
        const s3 = new aws_sdk_1.default.S3({
            endpoint,
            accessKeyId: ACCESSKEYID,
            secretAccessKey: SECRETACCESSKEY,
        });
        // Are the build files declared in the project? Then cherry pick! if not, get all css and js files.
        const files = buildFiles
            ? getFiles_1.cherryPickFiles(buildFiles)
            : [...getFiles_1.getAllFiles('js'), ...getFiles_1.getAllFiles('css')];
        files.forEach((file) => {
            const ContentType = file.type === 'css' ? 'text/css' : 'application/javascript';
            const params = {
                Bucket: bucket,
                Key: formatKey_1.formatKey(projectName, path, file, branch),
                Body: fs_1.default.createReadStream(file.path),
                ACL: 'public-read',
                ContentType,
            };
            s3.upload(params, streamOptions, (err, data) => {
                if (err) {
                    console.log('Error', err);
                    process.exit(1);
                }
                if (data) {
                    console.log('Upload Success', data.Location);
                }
            });
        });
    }
    catch (error) {
        console.log('oh no!', error);
        process.exit(1);
    }
};
