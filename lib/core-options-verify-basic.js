const u = require('./core-util')
const conf = require('../index.conf')
const cou = require('./core-output')

exports.verifyVerbose = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (workingObject.userOption.verbose === undefined ||
      workingObject.userOption.verbose === null ||
      workingObject.userOption.verbose === '') {
      workingObject.validatedOption.verbose = conf.DEFAULT_VERBOSE
      resolve(workingObject)
    } else if (typeof (workingObject.userOption.verbose) !== 'boolean') {
      if (u.isBoolean(workingObject.userOption.verbose)) {
        workingObject.validatedOption.verbose = u.isTrue(workingObject.userOption.verbose)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: verbose is not a boolean value [%s].', workingObject.userOption.verbose))
      }
    } else {
      workingObject.validatedOption.verbose = workingObject.userOption.verbose
      resolve(workingObject)
    }
  })
}
exports.verifyQuiet = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (workingObject.userOption.quiet === undefined ||
      workingObject.userOption.quiet === null ||
      workingObject.userOption.quiet === '') {
      workingObject.validatedOption.quiet = conf.DEFAULT_QUIET
      resolve(workingObject)
    } else if (typeof (workingObject.userOption.quiet) !== 'boolean') {
      if (u.isBoolean(workingObject.userOption.quiet)) {
        workingObject.validatedOption.quiet = u.isTrue(workingObject.userOption.quiet)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: quiet is not a boolean value [%s].', workingObject.userOption.quiet))
      }
    } else {
      workingObject.validatedOption.quiet = workingObject.userOption.quiet
      resolve(workingObject)
    }
  })
}
exports.verifyPrompt = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (workingObject.userOption.prompt === undefined ||
      workingObject.userOption.prompt === null ||
      workingObject.userOption.prompt === '') {
      workingObject.validatedOption.prompt = conf.DEFAULT_PROMPT
      resolve(workingObject)
    } else if (typeof (workingObject.userOption.prompt) !== 'boolean') {
      if (u.isBoolean(workingObject.userOption.prompt)) {
        workingObject.validatedOption.prompt = u.isTrue(workingObject.userOption.prompt)
        resolve(workingObject)
      } else {
        reject(cou.getError('Error: prompt is not a boolean value [%s].', workingObject.userOption.prompt))
      }
    } else {
      workingObject.validatedOption.prompt = workingObject.userOption.prompt
      resolve(workingObject)
    }
  })
}
