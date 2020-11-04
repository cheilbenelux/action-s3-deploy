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
}

// We want to be able to purge the cache of the CDN after an upload.
const purgeCache = (bucketId: string, DOTOKEN: String, projectName: String) => {
  fetch(`https://api.digitalocean.com/v2/cdn/endpoints/${bucketId}/cache`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DOTOKEN}`,
    },
    body: JSON.stringify({ files: [`src/${projectName}/`] }),
  })
}

export const writeToServer = async (
  projectOptions: ProjectOptions,
  branch: string,
) => {
  try {
    const { bucket, projectName, serverPath, buildFiles } = projectOptions
    const streamOptions = {
      partSize: 10 * 1024 * 1024, // 10 MB
      queueSize: 10,
    }

    const endpoint: any = new AWS.Endpoint(`ams3.digitaloceanspaces.com`)

    const { ACCESSKEYID, SECRETACCESSKEY, SEBNBUCKETID, DOTOKEN } = process.env

    const s3 = new AWS.S3({
      endpoint,
      accessKeyId: ACCESSKEYID,
      secretAccessKey: SECRETACCESSKEY,
    })

    if (!ACCESSKEYID || !SECRETACCESSKEY || !SEBNBUCKETID || !DOTOKEN) {
      throw new Error('missing settings')
    }

    // Are the build files declared in the project? Then cherry pick! if not, get all css and js files.
    const files = buildFiles
      ? cherryPickFiles(buildFiles)
      : [...getAllFiles('js'), ...getAllFiles('css')]

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

    // Purge
    const res = await purgeCache(SEBNBUCKETID, DOTOKEN, projectName)
    console.log('res', res)
  } catch (error) {
    console.log('oh no!', error)
    process.exit(1)
  }
}
