const crp = require('../../lib/core-report')
const md0 = require('../mock-data/remotefilelist')

const expectedReturnValue = {
  files: [{
    accessTime: 1623577546000,
    modifyTime: 1622867586000,
    name: 'Mock_File_1.zip',
    size: 2928
  },
  {
    accessTime: 1623577546000,
    modifyTime: 1622867586000,
    name: 'Mock_File_2.zip',
    size: 49453
  }],
  totalDownloaded: 2,
  validatedOption: {
    autoCreateLocalPath: true,
    customFilter: null,
    host: '1.0.0.0',
    keepTimestamp: false,
    localPath: './test-data1',
    password: 'testpassord',
    port: 22,
    quiet: false,
    remotePath: '/home/testuser/data',
    skipIfBigger: false,
    skipIfExists: false,
    skipIfNewer: false,
    skipIfNotExists: false,
    skipIfOlder: false,
    skipIfSameAge: false,
    skipIfSameSize: false,
    skipIfSmaller: false,
    username: 'testuser',
    verbose: false
  }
}
const workingObject = {
  validatedOption: {
    autoCreateLocalPath: true,
    customFilter: null,
    host: '1.0.0.0',
    keepTimestamp: false,
    localPath: './test-data1',
    password: 'testpassord',
    port: 22,
    quiet: false,
    remotePath: '/home/testuser/data',
    skipIfBigger: false,
    skipIfExists: false,
    skipIfNewer: false,
    skipIfNotExists: false,
    skipIfOlder: false,
    skipIfSameAge: false,
    skipIfSameSize: false,
    skipIfSmaller: false,
    username: 'testuser',
    verbose: false
  },
  filteredFileList: md0.mockRemoteFileList,
  totalDownloaded: 2

}
test('core-report/returnReport/+', () => {
  expect(crp.returnReport(workingObject))
    .resolves
    .toMatchObject(expectedReturnValue)
})
