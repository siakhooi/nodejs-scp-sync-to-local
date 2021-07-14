const util = require('util')
const scp = require('node-scp')
const cr0 = require('../../lib/core-remote')

test('remote/disconnectOnAllDone/success', () => {
  const workingObject = {
    scpClient: scp.mockClient,
    validatedOption: { quiet: false },
    allDownloadPromises: [Promise.resolve(), Promise.resolve()]
  }
  const actualInfo = []
  console.info = jest.fn().mockImplementation((s, n) => { actualInfo.push(util.format(s, n)) })
  console.warn = jest.fn()
  const expectedInfo = ['All done, total downloads = 2.']

  cr0.disconnectOnAllDone(workingObject)
    .then(() => {
      expect(console.info).toBeCalled()
      actualInfo.forEach((x) => expect(expectedInfo).toContainEqual(x))
      expectedInfo.forEach((x) => expect(actualInfo).toContainEqual(x))

      expect(console.warn).not.toBeCalled()
    })
})
test('remote/disconnectOnAllDone/success/quiet', () => {
  const workingObject = {
    scpClient: scp.mockClient,
    validatedOption: { quiet: true },
    allDownloadPromises: [Promise.resolve(), Promise.resolve()]
  }
  console.info = jest.fn()
  console.warn = jest.fn()

  cr0.disconnectOnAllDone(workingObject)
    .then(() => {
      expect(console.info).not.toBeCalled()
      expect(console.warn).not.toBeCalled()
    })
})
test('remote/disconnectOnAllDone/no-download', () => {
  const workingObject = {
    scpClient: scp.mockClient,
    validatedOption: { quiet: false },
    allDownloadPromises: []
  }
  const actualWarn = []
  console.warn = jest.fn().mockImplementation((s) => { actualWarn.push(s) })
  console.info = jest.fn()
  const expectedWarn = ['No file to download']

  cr0.disconnectOnAllDone(workingObject)
    .then(() => {
      expect(console.info).not.toBeCalled()

      expect(console.warn).toBeCalled()
      actualWarn.forEach((x) => expect(expectedWarn).toContainEqual(x))
      expectedWarn.forEach((x) => expect(actualWarn).toContainEqual(x))
    })
})
