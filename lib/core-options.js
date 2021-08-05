const conf = require('../index.conf')
const cov = require('./core-options-verify')
const covb = require('./core-options-verify-basic')
const coc = require('./core-options-crosscheck')
const cou = require('./core-output')
const cpr = require('./core-prompt')

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
    workingObject.totalDownloaded = 0

    resolve(workingObject)
  })
}
exports.printProgramName = function (workingObject) {
  return new Promise((resolve, reject) => {
    const option = workingObject.validatedOption
    if (option.verbose && !option.quiet) {
      cou.info('%s %s', conf.PROGRAM_NAME, conf.PROGRAM_VERSION)
      cou.info('')
    }
    resolve(workingObject)
  })
}
exports.print = function (workingObject) {
  return new Promise((resolve, reject) => {
    const option = workingObject.validatedOption
    if (option.verbose && !option.quiet) {
      cou.info('[Parameters]')
      cou.info('                 host: %s', option.host)
      cou.info('                 port: %d', option.port)
      cou.info('             username: %s', option.username)
      cou.info('             password: %s', conf.PASSWORD_MASK)
      cou.info('           remotePath: %s', option.remotePath)
      cou.info('            localPath: %s', option.localPath)
      cou.info('         skipIfExists: %s', option.skipIfExists)
      cou.info('      skipIfNotExists: %s', option.skipIfNotExists)
      cou.info('          skipIfNewer: %s', option.skipIfNewer)
      cou.info('          skipIfOlder: %s', option.skipIfOlder)
      cou.info('        skipIfSameAge: %s', option.skipIfSameAge)
      cou.info('         skipIfBigger: %s', option.skipIfBigger)
      cou.info('        skipIfSmaller: %s', option.skipIfSmaller)
      cou.info('       skipIfSameSize: %s', option.skipIfSameSize)
      cou.info('  autoCreateLocalPath: %s', option.autoCreateLocalPath)
      cou.info('         customFilter: %s', (option.customFilter === null ? 'No' : 'Yes'))
      cou.info('       postProcessing: %s', (option.postProcessing === null ? 'No' : 'Yes'))
      cou.info('postProcessingOptions: %s', JSON.stringify(option.postProcessingOptions))
      cou.info('        keepTimestamp: %s', option.keepTimestamp)
      cou.info('               prompt: %s', option.prompt)
      cou.info('              verbose: %s', option.verbose)
      cou.info('                quiet: %s', option.quiet)
    }
    resolve(workingObject)
  })
}
exports.verifyBasic = function (workingObject) {
  return covb.verifyQuiet(workingObject)
    .then(covb.verifyVerbose)
    .then(covb.verifyPrompt)
}
exports.verify = function (workingObject) {
  return cov.verifyHost(workingObject)
    .then(cov.verifyUser)
    .then(cpr.askUsername)
    .then(cov.verifyPassword)
    .then(cpr.askPassword)
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
    .then(cov.verifyKeepTimestamp)
    .then(cov.verifyCustomFilter)
    .then(cov.verifyPostProcessing)
    .then(cov.verifyPostProcessingOptions)
}

exports.crossVerify = function (workingObject) {
  return coc.checkExistsRule(workingObject)
    .then(coc.checkQuietAndVerbose)
    .then(coc.checkPortNumberRange)
}
