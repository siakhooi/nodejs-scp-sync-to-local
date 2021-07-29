const scp = require('node-scp')
const cd0 = require('./core-download')
const cou = require('./core-output')

exports.login = function (workingObject) {
  return new Promise((resolve, reject) => {
    const validatedOption = workingObject.validatedOption
    const scpLoginOption = workingObject.scpLoginOption

    scpLoginOption.host = validatedOption.host
    scpLoginOption.port = validatedOption.port
    scpLoginOption.username = validatedOption.username
    scpLoginOption.password = validatedOption.password

    return scp(scpLoginOption)
      .then((client) => {
        workingObject.scpClient = client
        resolve(workingObject)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
exports.getFileList = function (workingObject) {
  return new Promise((resolve, reject) => {
    const option = workingObject.validatedOption
    const client = workingObject.scpClient

    if (!option.quiet) cou.print('Downloading Remote File List...')
    return client.list(option.remotePath)
      .then((remoteFileList) => {
        if (!option.quiet) cou.info('done')
        workingObject.remoteFileList = remoteFileList
        resolve(workingObject)
      })
      .catch((err) => reject(err))
  })
}
exports.downloadFiles = function (workingObject) {
  return new Promise((resolve, reject) => {
    workingObject.allDownloadPromises = workingObject.filteredFileList
      .map((f1, n) => {
        return cd0.init(workingObject, f1, n + 1)
          .then(cd0.outputBegin)
          .then(cd0.downloadFile)
          .then(cd0.keepTimestamp)
          .then(cd0.outputComplete)
      })

    resolve(workingObject)
  })
}
exports.disconnectOnAllDone = function (workingObject) {
  return new Promise((resolve, reject) => {
    const d = workingObject.allDownloadPromises
    const client = workingObject.scpClient
    const option = workingObject.validatedOption

    if (d.length > 0) {
      Promise.all(d).then((r) => {
        if (!option.quiet) cou.info('All done, total downloads = %d.', d.length)
        client.close()
        resolve(workingObject)
      }).catch((e) => {
        client.close()
        reject(e)
      })
    } else {
      cou.warn('No file to download')
      client.close()
      resolve(workingObject)
    }
  })
}
