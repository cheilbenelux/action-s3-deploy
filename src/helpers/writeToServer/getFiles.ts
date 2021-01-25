const fs = require('file-system')

// gets all the buildfiles
export const getAllFiles = (type: 'css' | 'js', buildFolder?: string) => {
  const _buildFolder = buildFolder || 'dist'
  try {
    return fs
      .readdirSync(`${_buildFolder}/${type}/`)
      .map((fileName: string) => ({
        path: `${_buildFolder}/${type}/${fileName}`,
        type,
      }))
  } catch (err) {
    return []
  }
}

// Used when specific files are listed in the package.json of the project
export const cherryPickFiles = (fileNames: string[], buildFolder?: string) => {
  const _buildFolder = buildFolder || 'dist'

  return fileNames.map((fileName) => ({
    path: `${_buildFolder}/${fileName}`,
    type: fileName.split('.')[1],
  }))
}
