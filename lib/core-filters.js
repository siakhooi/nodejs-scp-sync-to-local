const cuf = require('./core-util-fs')
const path = require('path')

// return true to download: true if file not exist
exports.skipIfExists = function (localFile) {
  return !cuf.isPathExist(localFile)
}
// return true to download: true if file exist
exports.skipIfNotExists = function (localFile) {
  return cuf.isPathExist(localFile)
}
// return true to download: true if file not newer (older or not exist)
exports.skipIfNewer = function (localFile, remoteFile) {
  return !cuf.isNewer(localFile, remoteFile.modifyTime)
}
// return true to download: true if file not older (newer or not exist)
exports.skipIfOlder = function (localFile, remoteFile) {
  return !cuf.isOlder(localFile, remoteFile.modifyTime)
}
// return true to download: true if file not same size (older or newer or not exist)
exports.skipIfSameAge = function (localFile, remoteFile) {
  return !cuf.isSameAge(localFile, remoteFile.modifyTime)
}
// return true to download: true if file not bigger ( smaller or not exist)
exports.skipIfBigger = function (localFile, remoteFile) {
  return !cuf.isBigger(localFile, remoteFile.size)
}
// return true to download: true if file not smaller ( bigger or not exist)
exports.skipIfSmaller = function (localFile, remoteFile) {
  return !cuf.isSmaller(localFile, remoteFile.size)
}
// return true to download: true if file not same size ( smaller or bigger or not exist)
exports.skipIfSameSize = function (localFile, remoteFile) {
  return !cuf.isSameSize(localFile, remoteFile.size)
}

exports.setupFilters = function (workingObject) {
  return new Promise((resolve, reject) => {
    const option = workingObject.validatedOption
    const fileFilters = workingObject.fileFilters

    if (option.skipIfExists) fileFilters.push(exports.skipIfExists)
    if (option.skipIfNotExists) fileFilters.push(exports.skipIfNotExists)
    if (option.skipIfNewer) fileFilters.push(exports.skipIfNewer)
    if (option.skipIfOlder) fileFilters.push(exports.skipIfOlder)
    if (option.skipIfSameAge) fileFilters.push(exports.skipIfSameAge)
    if (option.skipIfBigger) fileFilters.push(exports.skipIfBigger)
    if (option.skipIfSmaller) fileFilters.push(exports.skipIfSmaller)
    if (option.skipIfSameSize) fileFilters.push(exports.skipIfSameSize)
    if (option.customFilter != null) fileFilters.push(option.customFilter)

    resolve(workingObject)
  })
}

exports.filterFiles = function (workingObject) {
  return new Promise((resolve, reject) => {
    const option = workingObject.validatedOption
    const remoteFileList = workingObject.remoteFileList

    workingObject.filteredFileList = remoteFileList.filter((remoteFile) => {
      if (workingObject.fileFilters.length === 0) return true

      const localFileName = path.normalize(option.localPath + path.sep + remoteFile.name)

      return workingObject.fileFilters.every((fn) => {
        return fn(localFileName, remoteFile)
      })
    })
    resolve(workingObject)
  })
}
