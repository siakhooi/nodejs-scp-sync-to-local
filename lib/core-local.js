const util = require('util')
const cuf = require('./core-util-fs')
const cou = require('./core-output')

exports.verifyLocalPath = function (workingObject) {
  return new Promise((resolve, reject) => {
    const option = workingObject.validatedOption

    if (cuf.isPathExist(option.localPath)) {
      if (!cuf.isDirectory(option.localPath)) {
        reject(
          new Error(util.format('Error: localPath is exists but is not a directory. [%s]', option.localPath))
        )
      } else {
        resolve(workingObject)
      }
    } else {
      if (option.autoCreateLocalPath) {
        if (!option.quiet) cou.warn('Warning: localPath is not exists, auto create. [%s]', option.localPath)
        cuf.mkdir(option.localPath)
        resolve(workingObject)
      } else {
        reject(
          new Error(util.format('Error: localPath is not exists and autoCreateLocalPath is set to false. [%s]', option.localPath))
        )
      }
    }
  })
}
