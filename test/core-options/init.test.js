const co0 = require('../../lib/core-options')

test('init', () => {
  const option = {
    host: 'localhost',
    username: 'testuser',
    password: 'testpassword'
  }
  return expect(co0.init(option))
    .resolves
    .toMatchObject({
      userOption: {
        host: 'localhost',
        username: 'testuser',
        password: 'testpassword'
      },
      validatedOption: {},
      scpLoginOption: {},
      fileFilters: [],
      scpClient: null,
      remoteFileList: [],
      filteredFileList: [],
      allDownloadPromises: []
    })
})
