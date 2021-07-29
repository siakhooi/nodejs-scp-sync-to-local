const u = require('./core-util')
const conf = require('../index.conf')
const cou = require('./core-output')

exports.verifyHost = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (workingObject.userOption.host === '' ||
      workingObject.userOption.host === null ||
      workingObject.userOption.host === undefined) {
      workingObject.validatedOption.host = conf.DEFAULT_HOSTNAME
      if (!workingObject.validatedOption.quiet) {
        cou.warn('Warning: host is undefined, defaulting to %s.', conf.DEFAULT_HOSTNAME)
      }
      resolve(workingObject)
    } else {
      workingObject.validatedOption.host = workingObject.userOption.host
      resolve(workingObject)
    }
  })
}
exports.verifyUser = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (workingObject.userOption.username === '' ||
      workingObject.userOption.username === null ||
      workingObject.userOption.username === undefined) {
      reject(cou.getError('Error: username is undefined.'))
    } else {
      workingObject.validatedOption.username = workingObject.userOption.username
      resolve(workingObject)
    }
  })
}
exports.verifyPassword = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (workingObject.userOption.password === '' ||
      workingObject.userOption.password === null ||
      workingObject.userOption.password === undefined) {
      reject(cou.getError('Error: password is undefined.'))
    } else {
      workingObject.validatedOption.password = workingObject.userOption.password
      resolve(workingObject)
    }
  })
}
exports.verifySkipIfExists = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (workingObject.userOption.skipIfExists === undefined ||
      workingObject.userOption.skipIfExists === null ||
      workingObject.userOption.skipIfExists === '') {
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
    if (workingObject.userOption.skipIfNotExists === undefined ||
      workingObject.userOption.skipIfNotExists === null ||
      workingObject.userOption.skipIfNotExists === '') {
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
    if (workingObject.userOption.skipIfNewer === undefined ||
      workingObject.userOption.skipIfNewer === null ||
      workingObject.userOption.skipIfNewer === '') {
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
    if (workingObject.userOption.skipIfOlder === undefined ||
      workingObject.userOption.skipIfOlder === null ||
      workingObject.userOption.skipIfOlder === '') {
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
    if (workingObject.userOption.skipIfSameAge === undefined ||
      workingObject.userOption.skipIfSameAge === null ||
      workingObject.userOption.skipIfSameAge === '') {
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
    if (workingObject.userOption.skipIfBigger === undefined ||
      workingObject.userOption.skipIfBigger === null ||
      workingObject.userOption.skipIfBigger === '') {
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
    if (workingObject.userOption.skipIfSmaller === undefined ||
      workingObject.userOption.skipIfSmaller === null ||
      workingObject.userOption.skipIfSmaller === '') {
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
    if (workingObject.userOption.skipIfSameSize === undefined ||
      workingObject.userOption.skipIfSameSize === null ||
      workingObject.userOption.skipIfSameSize === '') {
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
    if (workingObject.userOption.port === '' ||
      workingObject.userOption.port === null ||
      workingObject.userOption.port === undefined) {
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
    if (workingObject.userOption.remotePath === '' ||
      workingObject.userOption.remotePath === null ||
      workingObject.userOption.remotePath === undefined) {
      workingObject.validatedOption.remotePath = conf.DEFAULT_REMOTEPATH
      if (!workingObject.validatedOption.quiet) {
        cou.warn('Warning: remotePath is undefined, defaulting to current directory. [%s]', workingObject.validatedOption.remotePath)
      }
      resolve(workingObject)
    } else {
      workingObject.validatedOption.remotePath = workingObject.userOption.remotePath
      resolve(workingObject)
    }
  })
}
exports.verifyLocalPath = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (workingObject.userOption.localPath === '' ||
      workingObject.userOption.localPath === null ||
      workingObject.userOption.localPath === undefined) {
      workingObject.validatedOption.localPath = conf.DEFAULT_LOCALPATH
      if (!workingObject.validatedOption.quiet) {
        cou.warn('Warning: localPath is undefined, defaulting to current directory. [%s]', workingObject.validatedOption.localPath)
      }
      resolve(workingObject)
    } else {
      workingObject.validatedOption.localPath = workingObject.userOption.localPath
      resolve(workingObject)
    }
  })
}
exports.verifyAutoCreateLocalPath = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (workingObject.userOption.autoCreateLocalPath === undefined ||
      workingObject.userOption.autoCreateLocalPath === null ||
      workingObject.userOption.autoCreateLocalPath === '') {
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
exports.verifyCustomFilter = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (workingObject.userOption.customFilter === '' ||
      workingObject.userOption.customFilter === null ||
      workingObject.userOption.customFilter === undefined) {
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

exports.verifyKeepTimestamp = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (workingObject.userOption.keepTimestamp === undefined ||
      workingObject.userOption.keepTimestamp === null ||
      workingObject.userOption.keepTimestamp === '') {
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
