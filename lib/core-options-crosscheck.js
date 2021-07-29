const cou = require('./core-output')

exports.checkExistsRule = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (workingObject.validatedOption.skipIfExists &&
      workingObject.validatedOption.skipIfNotExists) {
      reject(cou.getError('Error: skipIfExists and skipIfNotExists are mutually exclusive.'))
    } else {
      resolve(workingObject)
    }
  })
}
exports.checkQuietAndVerbose = function (workingObject) {
  return new Promise((resolve, reject) => {
    if (workingObject.validatedOption.quiet &&
      workingObject.validatedOption.verbose) {
      const msg = 'Warn: Both quiet and verbose are set to true, verbose is ignored.'
      cou.warn(msg)
    }
    resolve(workingObject)
  })
}
