const prompt = require('prompt')
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
