const cf0 = require('../../lib/core-filters')
const md0 = require('../mock-data/remotefilelist')

const dummyFunction = (localPath, remotePathObject) => { return remotePathObject.name === 'Mock_File_1.zip' }

test('filterFiles/customFilter/true', () => {
  const workingObject = {
    validatedOption: { customFilter: dummyFunction },
    fileFilters: [dummyFunction],
    remoteFileList: md0.mockRemoteFileList,
    filteredFileList: []
  }

  return expect(cf0.filterFiles(workingObject))
    .resolves
    .toMatchObject({
      filteredFileList: [
        { name: 'Mock_File_1.zip' }
      ]
    })
})
