import * as core from '@actions/core'
// // import github from '@actions/github'
import { writeToServer } from './helpers/writeToServer'
import fs from 'fs'

// Get project package.json
const projectDir = process.env.GITHUB_WORKSPACE
const projectPackageData = fs.readFileSync(`${projectDir}/package.json`)
const projectJson = JSON.parse(projectPackageData.toString())
const packageInfo = projectJson

// Get project specific settings
const {
  deploySettings: { bucket, path, buildFiles },
  name: projectName,
} = packageInfo

// const { accessKeyId, secretAccessKey } = process.env

const run = async (): Promise<void> => {
  console.log('heyy')
  console.log(projectJson)
  console.log(process.env.GITHUB_REF)
  // core.debug(projectJson)
}

try {
  run()
  // writeToServer({bucket, path, buildFiles, projectName}, false)
  //   //   // `who-to-greet` input defined in action metadata file
  //   //   // const nameToGreet = core.getInput('who-to-greet')
  //   //   // console.log(`Hello ${nameToGreet}!`)
  //   //   // const time = new Date().toTimeString()
  //   //   // core.setOutput('time', time)
  //   //   // // Get the JSON webhook payload for the event that triggered the workflow
  //   //   // const payload = JSON.stringify(github.context.payload, undefined, 2)
  //   //   // console.log(`The event payload: ${payload}`)
} catch (error) {
  // core.setFailed(error.message)
}
