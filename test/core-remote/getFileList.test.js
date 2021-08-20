const scp = require('node-scp')
const cr0 = require('../../lib/core-remote')
const cou = require('../../lib/core-output')
const m = require('../mocklib')

test('core-remote/getFileList/+', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      quiet: false
    },
    scpClient: scp.mockClient,
    remoteFileList: []
  }
  const i = new m.MockOutput()
  cou.info = i.fn()

  const p = new m.MockOutput()
  cou.print = p.fn()

  const expectedPrint = ['Downloading Remote File List...']
  const expectedInfo = ['done']

  cr0.getFileList(workingObject)
    .then((workingObject) => {
      expect(workingObject)
        .toMatchObject({
          remoteFileList: [
            { name: 'Mock_File_1.zip' },
            { name: 'Mock_File_2.zip' }
          ]
        })
    }).then(() => {
      expect(i.verify(expectedInfo)).resolves.toBe(true)
      expect(p.verify(expectedPrint)).resolves.toBe(true)
    })
})

test('core-remote/getFileList/quiet', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      quiet: true
    },
    scpClient: scp.mockClient,
    remoteFileList: []
  }
  cou.print = jest.fn()
  cou.info = jest.fn()

  cr0.getFileList(workingObject).then((workingObject) => {
    expect(workingObject)
      .toMatchObject({
        remoteFileList: [
          { name: 'Mock_File_1.zip' },
          { name: 'Mock_File_2.zip' }
        ]
      })
    expect(cou.print).not.toBeCalled()
    expect(cou.info).not.toBeCalled()
  })
})

test('core-remote/getFileList/-', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      quiet: false
    },
    scpClient: scp.mockClient,
    remoteFileList: []
  }

  const p = new m.MockOutput()
  cou.print = p.fn()

  const expectedPrint = ['Downloading Remote File List...']

  expect(cr0.getFileList(workingObject))
    .rejects
    .toThrow('Mock getList: Fail')
  expect(p.verify(expectedPrint)).resolves.toBe(true)
})

test('core-remote/getFileList/quiet/-', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      quiet: true
    },
    scpClient: scp.mockClient,
    remoteFileList: []
  }

  cou.print = jest.fn()

  expect(cr0.getFileList(workingObject))
    .rejects
    .toThrow('Mock getList: Fail')
  expect(cou.print).not.toBeCalled()
})
