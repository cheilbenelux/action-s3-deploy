const path = require('path')

type File = {
  path: string
  type: 'css' | 'js'
}

export const formatKey = (
  projectName: string,
  serverPath: string,
  file: File,
  branch: string,
): string => {
  // eg: 'src/serif-locator/latest/js/app.js`
  const newPath = branch === 'master' ? serverPath : `${serverPath}/${branch}`

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
