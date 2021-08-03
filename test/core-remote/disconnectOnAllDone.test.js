const scp = require('node-scp')
const cr0 = require('../../lib/core-remote')
const cou = require('../../lib/core-output')
const m = require('../mocklib')

const i = new m.MockOutput()
cou.info = i.fn()
const w = new m.MockOutput()
cou.warn = w.fn()

beforeEach(() => {
  i.clear()
  w.clear()
})

test('remote/disconnectOnAllDone/success', () => {
  const workingObject = {
    scpClient: scp.mockClient,
    validatedOption: { quiet: false },
    allDownloadPromises: [Promise.resolve(), Promise.resolve()]
  }

  const expectedInfo = ['All done, total downloads = 2.']

  cr0.disconnectOnAllDone(workingObject)
    .then(() => {
      expect(i.verify(expectedInfo)).resolves.toBe(true)
      expect(w.verifyFalse()).resolves.toBe(true)
    })
})

test('remote/disconnectOnAllDone/success/quiet', () => {
  const workingObject = {
    scpClient: scp.mockClient,
    validatedOption: { quiet: true },
    allDownloadPromises: [Promise.resolve(), Promise.resolve()]
  }

  cr0.disconnectOnAllDone(workingObject)
    .then(() => {
      expect(w.verifyFalse()).resolves.toBe(true)
      expect(i.verifyFalse()).resolves.toBe(true)
    })
})
test('remote/disconnectOnAllDone/no-download', () => {
  const workingObject = {
    scpClient: scp.mockClient,
    validatedOption: { quiet: false },
    allDownloadPromises: []
  }
  const expectedWarn = ['No file to download']

  cr0.disconnectOnAllDone(workingObject)
    .then(() => {
      expect(i.verifyFalse()).resolves.toBe(true)
      expect(w.verify(expectedWarn)).resolves.toBe(true)
    })
})

test('remote/disconnectOnAllDone/error', () => {
  const workingObject = {
    scpClient: scp.mockClient,
    validatedOption: { quiet: false },
    allDownloadPromises: [Promise.resolve(), Promise.reject(new Error('dummy error'))]
  }

  expect(cr0.disconnectOnAllDone(workingObject))
    .rejects
    .toThrow('dummy error')
})
