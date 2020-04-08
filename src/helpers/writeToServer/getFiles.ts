const fs = require('file-system')

// gets all the buildfiles
export const getAllFiles = (type: 'css' | 'js') => {
  try {
    return fs
      .readdirSync(`dist/${type}/`)
      .map((fileName: string) => ({ path: `dist/${type}/${fileName}`, type }))
  } catch (err) {
    return []
  }
}

// Used when specific files are listed in the package.json of the project
export const cherryPickFiles = (fileNames: string[]) => {
  return fileNames.map((fileName) => ({
    path: `dist/${fileName}`,
    type: fileName.split('.')[1],
  }))
}
