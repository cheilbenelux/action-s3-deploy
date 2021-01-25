const path = require('path')

interface Inputs {
  projectName: string
  serverPath?: string
  file: {
    path: string
    type: 'css' | 'js'
  }
  branch: string
}

export const formatKey = (inputs: Inputs) => {
  const { projectName, serverPath, file, branch } = inputs
  // Optionally, projects can have different paths on our server
  const serverLocation = serverPath ? serverPath : `latest/`

  // eg: 'src/serif-locator/latest/js/app.js`
  const newPath =
    branch === ('master' || 'main')
      ? serverLocation
      : `${serverLocation}/${branch}`

  const fullPath: string =
    `src/` +
    projectName +
    `/` +
    newPath +
    '/' +
    file.type +
    '/' +
    path.basename(file.path).replace(/([^:]\/)\/+/g, '$1')
  console.log('key made:', fullPath)
  // remove accidental double /'s
  return fullPath
}
