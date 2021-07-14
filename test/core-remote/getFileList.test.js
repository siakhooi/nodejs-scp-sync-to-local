const scp = require('node-scp')
const cr0 = require('../../lib/core-remote')

test('remote/getFileList/success', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      quiet: false
    },
    scpClient: scp.mockClient,
    remoteFileList: []
  }
  const consoleOutput = []; const writeOutput = []
  global.process.stdout.write = jest.fn().mockImplementation((s) => { writeOutput.push(s) })
  global.console.info = jest.fn().mockImplementation((s) => { consoleOutput.push(s) })

  const msg1 = 'Downloading Remote File List...'
  const msg2 = 'done'

  cr0.getFileList(workingObject).then((workingObject) => {
    expect(workingObject)
      .toMatchObject({
        remoteFileList: [
          { name: 'Mock_File_1.zip' },
          { name: 'Mock_File_2.zip' }
        ]
      })
    expect(process.stdout.write).toBeCalled()
    expect(console.info).toBeCalled()
    expect(writeOutput).toContain(msg1)
    expect(consoleOutput).toContain(msg2)
  })
})

test('remote/getFileList/success/quiet', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      quiet: true
    },
    scpClient: scp.mockClient,
    remoteFileList: []
  }
  global.process.stdout.write = jest.fn()
  global.console.info = jest.fn()

  cr0.getFileList(workingObject).then((workingObject) => {
    expect(workingObject)
      .toMatchObject({
        remoteFileList: [
          { name: 'Mock_File_1.zip' },
          { name: 'Mock_File_2.zip' }
        ]
      })
    expect(process.stdout.write).not.toBeCalled()
    expect(console.info).not.toBeCalled()
  })
})

test('remote/getFileList/fail', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      quiet: false
    },
    scpClient: scp.mockClient,
    remoteFileList: []
  }

  const consoleOutput = []
  global.process.stdout.write = jest.fn().mockImplementation((s) => { consoleOutput.push(s) })
  const msg = 'Downloading Remote File List...'

  expect(cr0.getFileList(workingObject))
    .rejects
    .toThrow('Mock getList: Fail')
  expect(process.stdout.write).toBeCalled()
  expect(consoleOutput).toContain(msg)
})

test('remote/getFileList/fail/quiet', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      quiet: true
    },
    scpClient: scp.mockClient,
    remoteFileList: []
  }

  global.process.stdout.write = jest.fn()

  expect(cr0.getFileList(workingObject))
    .rejects
    .toThrow('Mock getList: Fail')
  expect(process.stdout.write).not.toBeCalled()
})
