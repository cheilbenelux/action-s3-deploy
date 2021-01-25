import * as core from '@actions/core'
import { writeToServer } from './helpers/writeToServer'
import * as fs from 'fs'

// Get project package.json
const projectDir = process.env.GITHUB_WORKSPACE
const projectPackageData = fs.readFileSync(`${projectDir}/package.json`)
const projectJson = JSON.parse(projectPackageData.toString())
const packageInfo = projectJson

const branch = process.env.GITHUB_REF
  ? process.env.GITHUB_REF.replace('refs/heads/', '')
  : ''

// Get project specific settings
const {
  deploySettings: { bucket, path: serverPath, buildFiles, buildFolder },
  name: projectName,
} = packageInfo

try {
  writeToServer(
    { bucket, serverPath, buildFiles, projectName, buildFolder },
    branch,
  )
} catch (error) {
  core.setFailed(error.message)
}
