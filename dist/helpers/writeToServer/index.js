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
exports.writeToServer = void 0;
const fs_1 = __importDefault(require("fs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const getFiles_1 = require("./getFiles");
const formatKey_1 = require("./formatKey");
// We want to be able to purge the cache of the CDN after an upload.
const purgeCache = (DOTOKEN, projectName) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield node_fetch_1.default(`https://api.digitalocean.com/v2/cdn/endpoints/6cdf2c12-e1f6-4373-8069-9cccc6e64175/cache`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${DOTOKEN}`,
        },
        body: JSON.stringify({ files: [`src/${projectName}/`] }),
    });
    console.log(res);
});
exports.writeToServer = (projectOptions, branch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Purge
        const { bucket, projectName, serverPath, buildFiles, buildFolder, } = projectOptions;
        const streamOptions = {
            partSize: 10 * 1024 * 1024,
            queueSize: 10,
        };
        const endpoint = new aws_sdk_1.default.Endpoint(`ams3.digitaloceanspaces.com`);
        const { ACCESSKEYID, SECRETACCESSKEY, DOTOKEN } = process.env;
        const s3 = new aws_sdk_1.default.S3({
            endpoint,
            accessKeyId: ACCESSKEYID,
            secretAccessKey: SECRETACCESSKEY,
        });
        if (!ACCESSKEYID || !SECRETACCESSKEY) {
            throw new Error('missing auth key');
        }
        // Are the build files declared in the project? Then cherry pick! if not, get all css and js files.
        const files = buildFiles
            ? getFiles_1.cherryPickFiles(buildFiles, buildFolder)
            : [...getFiles_1.getAllFiles('js', buildFolder), ...getFiles_1.getAllFiles('css', buildFolder)];
        yield Promise.all(files.map((file) => {
            const ContentType = file.type === 'css' ? 'text/css' : 'application/javascript';
            const params = {
                Bucket: bucket,
                Key: formatKey_1.formatKey({ projectName, serverPath, file, branch }),
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
        }));
        if (DOTOKEN)
            purgeCache(DOTOKEN, projectName);
    }
    catch (error) {
        console.log('oh no!', error);
        process.exit(1);
    }
});
