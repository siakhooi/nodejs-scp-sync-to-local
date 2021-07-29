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
