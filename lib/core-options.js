const conf = require('../index.conf')
const cov = require('./core-options-verify')
const covb = require('./core-options-verify-basic')
const coc = require('./core-options-crosscheck')

exports.init = function (option) {
  return new Promise((resolve, reject) => {
    const workingObject = {}
    workingObject.userOption = option
    workingObject.validatedOption = {}
    workingObject.scpLoginOption = {}
    workingObject.fileFilters = []
    workingObject.scpClient = null
    workingObject.remoteFileList = []
    workingObject.filteredFileList = []
    workingObject.allDownloadPromises = []

    resolve(workingObject)
  })
}
exports.printProgramName = function (workingObject) {
  return new Promise((resolve, reject) => {
    const option = workingObject.validatedOption
    if (option.verbose && !option.quiet) {
      console.log('%s %s', conf.PROGRAM_NAME, conf.PROGRAM_VERSION)
      console.log('')
    }
    resolve(workingObject)
  })
}
exports.print = function (workingObject) {
  return new Promise((resolve, reject) => {
    const option = workingObject.validatedOption
    if (option.verbose && !option.quiet) {
      console.log('[Parameters]')
      console.log('               host: %s', option.host)
      console.log('               port: %d', option.port)
      console.log('           username: %s', option.username)
      console.log('           password: %s', conf.PASSWORD_MASK)
      console.log('         remotePath: %s', option.remotePath)
      console.log('          localPath: %s', option.localPath)
      console.log('       skipIfExists: %s', option.skipIfExists)
      console.log('    skipIfNotExists: %s', option.skipIfNotExists)
      console.log('        skipIfNewer: %s', option.skipIfNewer)
      console.log('        skipIfOlder: %s', option.skipIfOlder)
      console.log('      skipIfSameAge: %s', option.skipIfSameAge)
      console.log('       skipIfBigger: %s', option.skipIfBigger)
      console.log('      skipIfSmaller: %s', option.skipIfSmaller)
      console.log('     skipIfSameSize: %s', option.skipIfSameSize)
      console.log('autoCreateLocalPath: %s', option.autoCreateLocalPath)
      console.log('       customFilter: %s', (option.customFilter === null ? 'No' : 'Yes'))
      console.log('      keepTimestamp: %s', option.keepTimestamp)
      console.log('            verbose: %s', option.verbose)
      console.log('              quiet: %s', option.quiet)
    }
    resolve(workingObject)
  })
}
exports.verifyBasic = function (workingObject) {
  return covb.verifyQuiet(workingObject)
    .then(covb.verifyVerbose)
}
exports.verify = function (workingObject) {
  return cov.verifyHost(workingObject)
    .then(cov.verifyUser)
    .then(cov.verifyPassword)
    .then(cov.verifySkipIfExists)
    .then(cov.verifySkipIfNotExists)
    .then(cov.verifySkipIfNewer)
    .then(cov.verifySkipIfOlder)
    .then(cov.verifySkipIfSameAge)
    .then(cov.verifySkipIfBigger)
    .then(cov.verifySkipIfSmaller)
    .then(cov.verifySkipIfSameSize)
    .then(cov.verifyPort)
    .then(cov.verifyRemotePath)
    .then(cov.verifyLocalPath)
    .then(cov.verifyAutoCreateLocalPath)
    .then(cov.verifyCustomFilter)
    .then(cov.verifyKeepTimestamp)
}

exports.crossVerify = function (workingObject) {
  return coc.checkExistsRule(workingObject)
    .then(coc.checkQuietAndVerbose)
}
