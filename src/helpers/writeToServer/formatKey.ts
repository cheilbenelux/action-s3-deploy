const path = require('path')

type File = {
  path: string
  type: 'css' | 'js'
}

export const formatKey = (
  projectName: string,
  serverPath: string,
  file: File,
  staging: boolean,
): string => {
  console.log('making a key')
  // eg: 'src/serif-locator/latest/js/app.js`
  const newPath = staging ? `${serverPath}/staging` : serverPath

  const fullPath: string =
    `src/` +
    projectName +
    `/` +
    newPath +
    '/' +
    file.type +
    '/' +
    path.basename(file.path)
  console.log('key made:', fullPath.replace(/([^:]\/)\/+/g, '$1'))
  // remove accidental double /'s
  return fullPath.replace(/([^:]\/)\/+/g, '$1')
}
