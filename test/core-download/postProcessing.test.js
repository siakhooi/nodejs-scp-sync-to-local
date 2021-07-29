const cd0 = require('../../lib/core-download')
const cou = require('../../lib/core-output')
const m = require('../mocklib')

test('download/postProcessing/ok', () => {
  const echoHello = (l, r) => { cou.info('Hello %s %s', l, r.name) }

  const fileWorkingObject = {
    localFile: './test-data',
    postProcessing: echoHello,
    remoteFileObject: {
      name: 'Mock_File_1.zip'
    }
  }

  const expectedInfo = [
    'Hello ./test-data Mock_File_1.zip'
  ]

  const i = new m.MockOutput()
  cou.info = i.fn()

  cd0.postProcessing(fileWorkingObject)
    .then(() => {
      expect(i.verify(expectedInfo)).resolves.toBe(true)
    })
})

test('download/postProcessing/err', () => {
  const echoHello = (l, r) => { throw new Error('Error!') }

  const fileWorkingObject = {
    localFile: './test-data',
    postProcessing: echoHello,
    remoteFileObject: {
      name: 'Mock_File_1.zip'
    }
  }

  const i = new m.MockOutput()
  cou.info = i.fn()

  expect(cd0.postProcessing(fileWorkingObject)).rejects.toThrow('Error!')
  expect(i.verifyFalse()).resolves.toBe(true)
})
