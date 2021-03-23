import fs from 'fs'
import AWS from 'aws-sdk'
import fetch from 'node-fetch'

import { getAllFiles, cherryPickFiles } from './getFiles'
import { formatKey } from './formatKey'
import { String } from 'aws-sdk/clients/batch'

interface ProjectOptions {
  bucket: string
  projectName: string
  serverPath: string
  buildFiles: string[]
  buildFolder: string
}

// We want to be able to purge the cache of the CDN after an upload.
const purgeCache = async (DOTOKEN: String, projectName: String) => {
  const res = await fetch(
    `https://api.digitalocean.com/v2/cdn/endpoints/6cdf2c12-e1f6-4373-8069-9cccc6e64175/cache`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DOTOKEN}`,
      },
      body: JSON.stringify({ files: [`src/${projectName}/`] }),
    },
  )
  console.log(res)
}

export const writeToServer = async (
  projectOptions: ProjectOptions,
  branch: string,
) => {
  try {
    // Purge
    const {
      bucket,
      projectName,
      serverPath,
      buildFiles,
      buildFolder,
    } = projectOptions

    const streamOptions = {
      partSize: 10 * 1024 * 1024, // 10 MB
      queueSize: 10,
    }
    const endpoint: any = new AWS.Endpoint(`ams3.digitaloceanspaces.com`)
    const { ACCESSKEYID, SECRETACCESSKEY } = process.env
    const s3 = new AWS.S3({
      endpoint,
      accessKeyId: ACCESSKEYID,
      secretAccessKey: SECRETACCESSKEY,
    })

    if (!ACCESSKEYID || !SECRETACCESSKEY) {
      throw new Error('missing auth key')
    }

    // Are the build files declared in the project? Then cherry pick! if not, get all css and js files.
    const files = buildFiles
      ? cherryPickFiles(buildFiles, buildFolder)
      : [...getAllFiles('js', buildFolder), ...getAllFiles('css', buildFolder)]

    await Promise.all(
      files.map((file) => {
        const ContentType =
          file.type === 'css' ? 'text/css' : 'application/javascript'
        const params = {
          Bucket: bucket,
          Key: formatKey({ projectName, serverPath, file, branch }),
          Body: fs.createReadStream(file.path),
          ACL: 'public-read',
          ContentType,
        }

        s3.upload(params, streamOptions, (err, data) => {
          if (err) {
            console.log('Error', err)
            process.exit(1)
          }
          if (data) {
            console.log('Upload Success', data.Location)
          }
        })
      }),
    )
    // purgeCache(DOTOKEN, projectName)
  } catch (error) {
    console.log('oh no!', error)
    process.exit(1)
  }
}
