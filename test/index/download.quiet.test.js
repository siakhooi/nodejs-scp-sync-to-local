const scp = require('../../index')

beforeEach(() => jest.clearAllMocks())

test('scp/download/quiet/1', () => {
  console.info = jest.fn()
  console.warn = jest.fn()
  process.stdout.write = jest.fn()

  const option = {
    host: '1.0.0.0',
    quiet: true,
    username: 'testuser',
    password: 'testpassord',
    remotePath: '/home/testuser/data',
    localPath: '.\\test-data'
  }

  return scp.download(option)
    .then(() => {
      expect(console.warn).not.toBeCalled()
      expect(console.info).not.toBeCalled()
      expect(process.stdout.write).not.toBeCalled()
    })
})

test('scp/download/quiet/2', () => {
  console.info = jest.fn()
  console.warn = jest.fn()
  process.stdout.write = jest.fn()

  const option = {
    host: '1.0.0.0',
    port: 23,
    quiet: true,
    username: 'testuser',
    password: 'testpassord',
    remotePath: '/home/testuser/data',
    localPath: '.\\test-data'
  }

  return scp.download(option).then(() => {
    expect(console.warn).not.toBeCalled()
    expect(console.info).not.toBeCalled()
    expect(process.stdout.write).not.toBeCalled()
  })
})
