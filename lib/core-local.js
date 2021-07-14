const util = require('util')
const cuf = require('./core-util-fs')

exports.verifyLocalPath = function (workingObject) {
  return new Promise((resolve, reject) => {
    const option = workingObject.validatedOption

    if (cuf.isPathExist(option.localPath)) {
      if (!cuf.isDirectory(option.localPath)) {
        reject(
          new Error(util.format('Error: localPath exists and is not a directory. [%s]', option.localPath))
        )
      } else {
        resolve(workingObject)
      }
    } else {
      if (option.autoCreateLocalPath) {
        if (!option.quiet) { console.warn(util.format('Warning: localPath not exists, auto create. [%s]', option.localPath)) }
        cuf.mkdir(option.localPath)
        resolve(workingObject)
      } else {
        reject(
          new Error(util.format('Error: localPath not exists and autoCreateLocalPath=false. [%s]', option.localPath))
        )
      }
    }
  })
}
