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
