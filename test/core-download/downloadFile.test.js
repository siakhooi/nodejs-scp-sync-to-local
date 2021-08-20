const cd0 = require('../../lib/core-download')

test('core-download/downloadFile/+', () => {
  const fileWorkingObject = {
    client: {
      downloadFile: jest.fn().mockResolvedValue()
    },
    localFile: './test.txt',
    remoteFile: './test.txt'
  }

  cd0.downloadFile(fileWorkingObject)
    .then(() => {
      expect(fileWorkingObject.client.downloadFile).toBeCalled()
    })
})
