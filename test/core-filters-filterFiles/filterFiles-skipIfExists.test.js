const cf0 = require('../../lib/core-filters')
const cuf = require('../../lib/core-util-fs')
const md0 = require('../mock-data/remotefilelist')

test('filterFiles/skipIfExists/true', () => {
  const workingObject = {
    validatedOption: { localPath: '.' },
    fileFilters: [cf0.skipIfExists],
    remoteFileList: md0.mockRemoteFileList,
    filteredFileList: []
  }
  jest.spyOn(cuf, 'isPathExist').mockReturnValue(true)

  return expect(cf0.filterFiles(workingObject))
    .resolves.not
    .toMatchObject({
      filteredFileList: [
        { name: 'Mock_File_1.zip' },
        { name: 'Mock_File_2.zip' }
      ]
    })
})

test('filterFiles/skipIfExists/false', () => {
  const workingObject = {
    validatedOption: { localPath: '.' },
    fileFilters: [cf0.skipIfExists],
    remoteFileList: md0.mockRemoteFileList,
    filteredFileList: []
  }
  jest.spyOn(cuf, 'isPathExist').mockReturnValue(false)

  return expect(cf0.filterFiles(workingObject))
    .resolves
    .toMatchObject({
      filteredFileList: [
        { name: 'Mock_File_1.zip' },
        { name: 'Mock_File_2.zip' }
      ]
    })
})
