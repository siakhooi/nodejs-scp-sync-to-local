const scp = require('node-scp')

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

    if (!option.quiet) process.stdout.write('Downloading Remote File List...')
    return client.list(option.remotePath)
      .then((remoteFileList) => {
        if (!option.quiet) console.info('done')
        workingObject.remoteFileList = remoteFileList
        resolve(workingObject)
      })
      .catch((err) => reject(err))
  })
}
exports.downloadFiles = function (workingObject) {
  const option = workingObject.validatedOption
  const filteredFileList = workingObject.filteredFileList
  const client = workingObject.scpClient

  return new Promise((resolve, reject) => {
    const d = filteredFileList.map((f1, n) => {
      return new Promise((resolve, reject) => {
        const localfile = option.localPath + '/' + f1.name
        const remotefile = option.remotePath + '/' + f1.name
        const filesize = f1.size
        const filenum = n + 1

        if (!option.quiet) console.info(`${filenum} downloading ${remotefile}`)
        client.downloadFile(remotefile, localfile)
          .then(() => {
            if (!option.quiet) console.info(`${filenum} downloaded ${remotefile} ${localfile} ${filesize}`)
            resolve(f1.name)
          }).catch((e) => {
            console.error(e)
            reject(f1.name)
          })
      })
    })

    workingObject.allDownloadPromises = d
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
        if (!option.quiet) { console.info('All done, total downloads = %d.', d.length) }
        client.close()
        resolve()
      }).catch((e) => {
        client.close()
        reject(e)
      })
    } else {
      console.warn('No file to download')
      client.close()
      resolve()
    }
  })
}
