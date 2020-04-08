"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('file-system');
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const getFiles_1 = require("./getFiles");
const formatKey_1 = require("./formatKey");
const endpoint = new aws_sdk_1.default.Endpoint(`ams3.digitaloceanspaces.com`);
// Get from secrets
// const { accessKeyId, secretAccessKey } = require('./settings')
const { accessKeyId, secretAccessKey } = process.env;
const s3 = new aws_sdk_1.default.S3({
    endpoint,
    accessKeyId,
    secretAccessKey,
});
exports.writeToServer = (projectOptions, staging) => {
    const { Bucket, projectName, serverPath, buildFiles } = projectOptions;
    const streamOptions = {
        partSize: 10 * 1024 * 1024,
        queueSize: 10,
    };
    // Are the build files declared in the project? Then cherry pick! if not, get all css and js files.
    const files = buildFiles
        ? getFiles_1.cherryPickFiles(buildFiles)
        : [...getFiles_1.getAllFiles('js'), ...getFiles_1.getAllFiles('css')];
    files.forEach((file) => {
        const ContentType = file.type === 'css' ? 'text/css' : 'application/javascript';
        const params = {
            Bucket,
            Key: formatKey_1.formatKey(projectName, serverPath, file, staging),
            Body: fs.createReadStream(file.path),
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
};
