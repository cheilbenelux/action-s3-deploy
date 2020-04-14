import fs from 'fs'
import AWS from 'aws-sdk'

import { getAllFiles, cherryPickFiles } from './getFiles'
import { formatKey } from './formatKey'

interface ProjectOptions {
  bucket: string
  projectName: string
  serverPath: string
  buildFiles: string[]
}

export const writeToServer = (
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

    const { ACCESSKEYID, SECRETACCESSKEY } = process.env

    const s3 = new AWS.S3({
      endpoint,
      accessKeyId: ACCESSKEYID,
      secretAccessKey: SECRETACCESSKEY,
    })

    // Are the build files declared in the project? Then cherry pick! if not, get all css and js files.
    const files = buildFiles
      ? cherryPickFiles(buildFiles)
      : [...getAllFiles('js'), ...getAllFiles('css')]

    files.forEach((file) => {
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
    })
  } catch (error) {
    console.log('oh no!', error)
    process.exit(1)
  }
}
