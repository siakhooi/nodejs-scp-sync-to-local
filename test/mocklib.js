const util = require('util')

class MockOutput {
  constructor() {
    this.actualOutput = []
    this.fn1 = jest.fn().mockImplementation((...s) => { this.actualOutput.push(util.format(...s)) })
  }

  clear() {
    this.actualOutput = []
    this.fn1.mockClear()
  }

  fn() {
    return this.fn1
  }

  verify(expectedOutput) {
    return new Promise((resolve, reject) => {
      expect(this.fn1).toBeCalled()
      expectedOutput.forEach((x) => expect(this.actualOutput).toContainEqual(x))
      this.actualOutput.forEach((x) => expect(expectedOutput).toContainEqual(x))
      resolve(true)
    })
  }

  verifyFalse() {
    return new Promise((resolve, reject) => {
      expect(this.fn1).not.toBeCalled()
      resolve(true)
    })
  }
}

exports.MockOutput = MockOutput
