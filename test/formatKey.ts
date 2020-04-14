import { formatKey } from '../src/helpers/writeToServer/formatKey'
import { expect } from 'chai'
import 'mocha'

describe('Format key function', () => {
  // const inputs = {
  //   projectName: 'projectAwesome',
  //   serverPath: '',
  //   file: { path: 'dist/app.js', type: 'js' },
  //   branch: 'staging',
  // }

  it('should return a valid key', () => {
    const result = formatKey({
      projectName: 'projectAwesome',
      serverPath: '',
      file: { path: 'dist/app.js', type: 'js' },
      branch: 'staging',
    })
    expect(result).to.equal('src/projectAwesome/latest/staging/js/app.js')
  })
  it('should return a valid key', () => {
    const result = formatKey({
      projectName: 'projectAwesome',
      serverPath: '',
      file: { path: 'dist/app.js', type: 'js' },
      branch: 'master',
    })
    expect(result).to.equal('src/projectAwesome/latest/js/app.js')
  })
  it('should return a valid key', () => {
    const result = formatKey({
      projectName: 'projectAwesome',
      serverPath: '',
      file: { path: 'dist/app.js', type: 'js' },
      branch: 'demo',
    })
    expect(result).to.equal('src/projectAwesome/latest/demo/js/app.js')
  })
})
