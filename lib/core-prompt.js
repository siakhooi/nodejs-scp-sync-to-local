const prompt = require('prompt')
const conf = require('../index.conf')

const askQuestion = (question) => {
  prompt.message = ''
  prompt.start()
  return prompt.get(question)
}

exports.askUsername = function (workingObject) {
  const question = [{
    name: 'username',
    required: true,
    type: 'string',
    description: 'Enter username'
  }]
  return new Promise((resolve, reject) => {
    if (workingObject.validatedOption.username !== null) {
      resolve(workingObject)
    } else {
      return askQuestion(question)
        .then((result) => {
          workingObject.validatedOption.username = result.username
          resolve(workingObject)
        })
    }
  })
}
exports.askPassword = function (workingObject) {
  const question = [{
    name: 'password',
    required: true,
    type: 'string',
    description: 'Enter password',
    hidden: true,
    replace: ''
  }]
  return new Promise((resolve, reject) => {
    if (workingObject.validatedOption.password !== null) {
      resolve(workingObject)
    } else {
      return askQuestion(question)
        .then((result) => {
          workingObject.validatedOption.password = result.password
          resolve(workingObject)
        })
    }
  })
}
exports.askHost = function (workingObject) {
  const question = [{
    name: 'host',
    default: conf.DEFAULT_HOSTNAME,
    type: 'string',
    description: 'Enter hostname'
  }]
  return new Promise((resolve, reject) => {
    if (workingObject.validatedOption.host !== null) {
      resolve(workingObject)
    } else {
      return askQuestion(question)
        .then((result) => {
          workingObject.validatedOption.host = result.host
          resolve(workingObject)
        })
    }
  })
}

exports.askLocalPath = function (workingObject) {
  const question = [{
    name: 'localPath',
    default: conf.DEFAULT_LOCALPATH,
    type: 'string',
    description: 'Enter local path'
  }]
  return new Promise((resolve, reject) => {
    if (workingObject.validatedOption.localPath !== null) {
      resolve(workingObject)
    } else {
      return askQuestion(question)
        .then((result) => {
          workingObject.validatedOption.localPath = result.localPath
          resolve(workingObject)
        })
    }
  })
}
