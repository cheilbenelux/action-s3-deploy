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

  // remove accidental double /'s
  return fullPath.replace(/([^:]\/)\/+/g, '$1')
}
