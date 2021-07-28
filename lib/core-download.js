const cuf = require('./core-util-fs')
const cou = require('./core-output')
const path = require('path')

exports.init = function (workingObject, remoteFileObject, n) {
  const option = workingObject.validatedOption
  return new Promise((resolve, reject) => {
    const fileWorkingObject = {
      client: workingObject.scpClient,
      fileNum: n,
      remoteFileObject: remoteFileObject,
      fileName: remoteFileObject.name,
      fileSize: remoteFileObject.size,
      quiet: option.quiet,
      keepTimestamp: option.keepTimestamp,
      accessTime: remoteFileObject.accessTime,
      modifyTime: remoteFileObject.modifyTime,
      localPath: option.localPath,
      remotePath: option.remotePath,
      localFile: path.normalize(option.localPath + path.sep + remoteFileObject.name),
      remoteFile: option.remotePath + path.posix.sep + remoteFileObject.name
    }

    resolve(fileWorkingObject)
  })
}
exports.outputBegin = function (fileWorkingObject) {
  return new Promise((resolve, reject) => {
    if (!fileWorkingObject.quiet) {
      const msg = '%s downloading %s'
      cou.info(msg, fileWorkingObject.fileNum, fileWorkingObject.remoteFile)
    }
    resolve(fileWorkingObject)
  })
}

exports.downloadFile = function (fileWorkingObject) {
  return new Promise((resolve, reject) => {
    return fileWorkingObject
      .client
      .downloadFile(fileWorkingObject.remoteFile, fileWorkingObject.localFile)
      .then(() => {
        resolve(fileWorkingObject)
      })
  })
}

exports.keepTimestamp = function (fileWorkingObject) {
  return new Promise((resolve, reject) => {
    if (fileWorkingObject.keepTimestamp) {
      cuf.updateTimes(fileWorkingObject.localFile, fileWorkingObject.accessTime, fileWorkingObject.modifyTime)
    }
    resolve(fileWorkingObject)
  })
}
exports.outputComplete = function (fileWorkingObject) {
  return new Promise((resolve, reject) => {
    if (!fileWorkingObject.quiet) {
      const msg = '%s downloaded %s %s %s'

      cou.info(msg,
        fileWorkingObject.fileNum,
        fileWorkingObject.remoteFile,
        fileWorkingObject.localFile,
        fileWorkingObject.fileSize
      )
    }
    resolve(fileWorkingObject)
  })
}
