const u = require('./core-util')
const conf = require('../index.conf')
const cou = require('./core-output')

exports.verifyHost = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.host)) {
      if (workingObject.validatedOption.prompt) {
        workingObject.validatedOption.host = null // set to null, askHost will prompt
        resolve(workingObject)
      } else {
        workingObject.validatedOption.host = conf.DEFAULT_HOSTNAME
        if (!workingObject.validatedOption.quiet) { cou.warn('Warning: host is undefined, defaulting to %s.', conf.DEFAULT_HOSTNAME) }
        resolve(workingObject)
      }
    } else {
      workingObject.validatedOption.host = workingObject.userOption.host
      resolve(workingObject)
    }
  })
}
exports.verifyUser = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.username)) {
      if (workingObject.validatedOption.prompt) {
        workingObject.validatedOption.username = null // set to null, askUsername will prompt
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: username is undefined.'))
      }
    } else {
      workingObject.validatedOption.username = workingObject.userOption.username
      resolve(workingObject)
    }
  })
}
exports.verifyPassword = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.password)) {
      if (workingObject.validatedOption.prompt) {
        workingObject.validatedOption.password = null // set to null, askPassword will prompt
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: password is undefined.'))
      }
    } else {
      workingObject.validatedOption.password = workingObject.userOption.password
      resolve(workingObject)
    }
  })
}
exports.verifySkipIfExists = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.skipIfExists)) {
      workingObject.validatedOption.skipIfExists = conf.DEFAULT_SKIPIFEXISTS
      if (!workingObject.validatedOption.quiet) {
        cou.warn('Warning: skipIfExists is undefined, defaulting to %s.', workingObject.validatedOption.skipIfExists)
      }
      resolve(workingObject)
    } else if (typeof (workingObject.userOption.skipIfExists) !== 'boolean') {
      if (u.isBoolean(workingObject.userOption.skipIfExists)) {
        workingObject.validatedOption.skipIfExists = u.isTrue(workingObject.userOption.skipIfExists)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: skipIfExists is not a boolean value [%s].', workingObject.userOption.skipIfExists))
      }
    } else {
      workingObject.validatedOption.skipIfExists = workingObject.userOption.skipIfExists
      resolve(workingObject)
    }
  })
}
exports.verifySkipIfNotExists = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.skipIfNotExists)) {
      workingObject.validatedOption.skipIfNotExists = conf.DEFAULT_SKIPIFNOTEXISTS
      if (!workingObject.validatedOption.quiet) {
        cou.warn('Warning: skipIfNotExists is undefined, defaulting to %s.', workingObject.validatedOption.skipIfNotExists)
      }
      resolve(workingObject)
    } else if (typeof (workingObject.userOption.skipIfNotExists) !== 'boolean') {
      if (u.isBoolean(workingObject.userOption.skipIfNotExists)) {
        workingObject.validatedOption.skipIfNotExists = u.isTrue(workingObject.userOption.skipIfNotExists)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: skipIfNotExists is not a boolean value [%s].', workingObject.userOption.skipIfNotExists))
      }
    } else {
      workingObject.validatedOption.skipIfNotExists = workingObject.userOption.skipIfNotExists
      resolve(workingObject)
    }
  })
}
exports.verifySkipIfNewer = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.skipIfNewer)) {
      workingObject.validatedOption.skipIfNewer = conf.DEFAULT_SKIPIFNEWER
      if (!workingObject.validatedOption.quiet) {
        cou.warn('Warning: skipIfNewer is undefined, defaulting to %s.', workingObject.validatedOption.skipIfNewer)
      }
      resolve(workingObject)
    } else if (typeof (workingObject.userOption.skipIfNewer) !== 'boolean') {
      if (u.isBoolean(workingObject.userOption.skipIfNewer)) {
        workingObject.validatedOption.skipIfNewer = u.isTrue(workingObject.userOption.skipIfNewer)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: skipIfNewer is not a boolean value [%s].', workingObject.userOption.skipIfNewer))
      }
    } else {
      workingObject.validatedOption.skipIfNewer = workingObject.userOption.skipIfNewer
      resolve(workingObject)
    }
  })
}
exports.verifySkipIfOlder = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.skipIfOlder)) {
      workingObject.validatedOption.skipIfOlder = conf.DEFAULT_SKIPIFOLDER
      if (!workingObject.validatedOption.quiet) {
        cou.warn('Warning: skipIfOlder is undefined, defaulting to %s.', workingObject.validatedOption.skipIfOlder)
      }
      resolve(workingObject)
    } else if (typeof (workingObject.userOption.skipIfOlder) !== 'boolean') {
      if (u.isBoolean(workingObject.userOption.skipIfOlder)) {
        workingObject.validatedOption.skipIfOlder = u.isTrue(workingObject.userOption.skipIfOlder)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: skipIfOlder is not a boolean value [%s].', workingObject.userOption.skipIfOlder))
      }
    } else {
      workingObject.validatedOption.skipIfOlder = workingObject.userOption.skipIfOlder
      resolve(workingObject)
    }
  })
}
exports.verifySkipIfSameAge = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.skipIfSameAge)) {
      workingObject.validatedOption.skipIfSameAge = conf.DEFAULT_SKIPIFSAMEAGE
      if (!workingObject.validatedOption.quiet) {
        cou.warn('Warning: skipIfSameAge is undefined, defaulting to %s.', workingObject.validatedOption.skipIfSameAge)
      }
      resolve(workingObject)
    } else if (typeof (workingObject.userOption.skipIfSameAge) !== 'boolean') {
      if (u.isBoolean(workingObject.userOption.skipIfSameAge)) {
        workingObject.validatedOption.skipIfSameAge = u.isTrue(workingObject.userOption.skipIfSameAge)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: skipIfSameAge is not a boolean value [%s].', workingObject.userOption.skipIfSameAge))
      }
    } else {
      workingObject.validatedOption.skipIfSameAge = workingObject.userOption.skipIfSameAge
      resolve(workingObject)
    }
  })
}
exports.verifySkipIfBigger = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.skipIfBigger)) {
      workingObject.validatedOption.skipIfBigger = conf.DEFAULT_SKIPIFBIGGER
      if (!workingObject.validatedOption.quiet) {
        cou.warn('Warning: skipIfBigger is undefined, defaulting to %s.', workingObject.validatedOption.skipIfBigger)
      }
      resolve(workingObject)
    } else if (typeof (workingObject.userOption.skipIfBigger) !== 'boolean') {
      if (u.isBoolean(workingObject.userOption.skipIfBigger)) {
        workingObject.validatedOption.skipIfBigger = u.isTrue(workingObject.userOption.skipIfBigger)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: skipIfBigger is not a boolean value [%s].', workingObject.userOption.skipIfBigger))
      }
    } else {
      workingObject.validatedOption.skipIfBigger = workingObject.userOption.skipIfBigger
      resolve(workingObject)
    }
  })
}
exports.verifySkipIfSmaller = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.skipIfSmaller)) {
      workingObject.validatedOption.skipIfSmaller = conf.DEFAULT_SKIPIFSMALLER
      if (!workingObject.validatedOption.quiet) {
        cou.warn('Warning: skipIfSmaller is undefined, defaulting to %s.', workingObject.validatedOption.skipIfSmaller)
      }
      resolve(workingObject)
    } else if (typeof (workingObject.userOption.skipIfSmaller) !== 'boolean') {
      if (u.isBoolean(workingObject.userOption.skipIfSmaller)) {
        workingObject.validatedOption.skipIfSmaller = u.isTrue(workingObject.userOption.skipIfSmaller)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: skipIfSmaller is not a boolean value [%s].', workingObject.userOption.skipIfSmaller))
      }
    } else {
      workingObject.validatedOption.skipIfSmaller = workingObject.userOption.skipIfSmaller
      resolve(workingObject)
    }
  })
}
exports.verifySkipIfSameSize = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.skipIfSameSize)) {
      workingObject.validatedOption.skipIfSameSize = conf.DEFAULT_SKIPIFSAMESIZE
      if (!workingObject.validatedOption.quiet) {
        cou.warn('Warning: skipIfSameSize is undefined, defaulting to %s.', workingObject.validatedOption.skipIfSameSize)
      }
      resolve(workingObject)
    } else if (typeof (workingObject.userOption.skipIfSameSize) !== 'boolean') {
      if (u.isBoolean(workingObject.userOption.skipIfSameSize)) {
        workingObject.validatedOption.skipIfSameSize = u.isTrue(workingObject.userOption.skipIfSameSize)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: skipIfSameSize is not a boolean value [%s].', workingObject.userOption.skipIfSameSize))
      }
    } else {
      workingObject.validatedOption.skipIfSameSize = workingObject.userOption.skipIfSameSize
      resolve(workingObject)
    }
  })
}
exports.verifyPort = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.port)) {
      workingObject.validatedOption.port = conf.DEFAULT_PORT
      if (!workingObject.validatedOption.quiet) {
        cou.info('Info: port is undefined, defaulting to %d.', workingObject.validatedOption.port)
      }
      resolve(workingObject)
    } else if (typeof workingObject.userOption.port === 'number') {
      if (Number.isInteger(workingObject.userOption.port)) {
        workingObject.validatedOption.port = Number(workingObject.userOption.port)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: port is not an integer number [%s].', workingObject.userOption.port))
      }
    } else if (typeof workingObject.userOption.port === 'string') {
      if (!Number.isNaN(Number.parseInt(workingObject.userOption.port))) {
        workingObject.validatedOption.port = Number(workingObject.userOption.port)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: port is not an integer number [%s].', workingObject.userOption.port))
      }
    } else {
      reject(cou.getError('Error: port is not an integer number [%s].', workingObject.userOption.port))
    }
  })
}
exports.verifyRemotePath = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.remotePath)) {
      if (workingObject.validatedOption.prompt) {
        workingObject.validatedOption.remotePath = null // set to null, askRemotePath will prompt
        resolve(workingObject)
      } else {
        workingObject.validatedOption.remotePath = conf.DEFAULT_REMOTEPATH
        if (!workingObject.validatedOption.quiet) {
          cou.warn('Warning: remotePath is undefined, defaulting to current directory. [%s]', workingObject.validatedOption.remotePath)
        }
        resolve(workingObject)
      }
    } else {
      workingObject.validatedOption.remotePath = workingObject.userOption.remotePath
      resolve(workingObject)
    }
  })
}
exports.verifyLocalPath = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.localPath)) {
      if (workingObject.validatedOption.prompt) {
        workingObject.validatedOption.localPath = null // set to null, askLocalPath will prompt
        resolve(workingObject)
      } else {
        workingObject.validatedOption.localPath = conf.DEFAULT_LOCALPATH
        if (!workingObject.validatedOption.quiet) {
          cou.warn('Warning: localPath is undefined, defaulting to current directory. [%s]', workingObject.validatedOption.localPath)
        }
        resolve(workingObject)
      }
    } else {
      workingObject.validatedOption.localPath = workingObject.userOption.localPath
      resolve(workingObject)
    }
  })
}
exports.verifyAutoCreateLocalPath = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.autoCreateLocalPath)) {
      workingObject.validatedOption.autoCreateLocalPath = conf.DEFAULT_AUTOCREATELOCALPATH
      resolve(workingObject)
    } else if (typeof (workingObject.userOption.autoCreateLocalPath) !== 'boolean') {
      if (u.isBoolean(workingObject.userOption.autoCreateLocalPath)) {
        workingObject.validatedOption.autoCreateLocalPath = u.isTrue(workingObject.userOption.autoCreateLocalPath)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: autoCreateLocalPath is not a boolean value [%s].', workingObject.userOption.autoCreateLocalPath))
      }
    } else {
      workingObject.validatedOption.autoCreateLocalPath = workingObject.userOption.autoCreateLocalPath
      resolve(workingObject)
    }
  })
}
exports.verifyKeepTimestamp = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.keepTimestamp)) {
      workingObject.validatedOption.keepTimestamp = conf.DEFAULT_KEEPTIMESTAMP
      resolve(workingObject)
    } else if (typeof (workingObject.userOption.keepTimestamp) !== 'boolean') {
      if (u.isBoolean(workingObject.userOption.keepTimestamp)) {
        workingObject.validatedOption.keepTimestamp = u.isTrue(workingObject.userOption.keepTimestamp)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: keepTimestamp is not a boolean value [%s].', workingObject.userOption.keepTimestamp))
      }
    } else {
      workingObject.validatedOption.keepTimestamp = workingObject.userOption.keepTimestamp
      resolve(workingObject)
    }
  })
}
exports.verifyCustomFilter = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.customFilter)) {
      workingObject.validatedOption.customFilter = conf.DEFAULT_CUSTOMFILTER
      resolve(workingObject)
    } else if (workingObject.userOption.customFilter instanceof Function) {
      workingObject.validatedOption.customFilter = workingObject.userOption.customFilter
      resolve(workingObject)
    } else {
      reject(cou.getError('Error: customFilter is not a function [%s].', workingObject.userOption.customFilter))
    }
  })
}
exports.verifyPostProcessing = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.postProcessing)) {
      workingObject.validatedOption.postProcessing = conf.DEFAULT_POSTPROCESSING
      resolve(workingObject)
    } else if (workingObject.userOption.postProcessing instanceof Function) {
      workingObject.validatedOption.postProcessing = workingObject.userOption.postProcessing
      resolve(workingObject)
    } else {
      reject(cou.getError('Error: postProcessing is not a function [%s].', workingObject.userOption.postProcessing))
    }
  })
}
exports.verifyPostProcessingOptions = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (u.isBlank(workingObject.userOption.postProcessingOptions)) {
      workingObject.validatedOption.postProcessingOptions = conf.DEFAULT_POSTPROCESSINGOPTIONS
      resolve(workingObject)
    } else if (workingObject.userOption.postProcessingOptions &&
      typeof workingObject.userOption.postProcessingOptions === 'object' &&
      workingObject.userOption.postProcessingOptions.constructor === Object
    ) {
      workingObject.validatedOption.postProcessingOptions = workingObject.userOption.postProcessingOptions
      resolve(workingObject)
    } else {
      reject(cou.getError('Error: postProcessingOptions is not an object [%s].', JSON.stringify(workingObject.userOption.postProcessingOptions)))
    }
  })
}
