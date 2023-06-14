const scp = require('../../index')
const cou = require('../../lib/core-output')

cou.info = jest.fn()
cou.warn = jest.fn()
cou.print = jest.fn()

test('scp/download/quiet/+', () => {
  const option = {
    host: '1.0.0.0',
    quiet: true,
    username: 'testuser',
    password: 'testpassord',
    remotePath: '/home/testuser/data',
    localPath: './test-data'
  }

  return scp.download(option)
    .then(() => {
      expect(cou.warn).not.toBeCalled()
      expect(cou.info).not.toBeCalled()
      expect(cou.print).not.toBeCalled()
    })
})

test('scp/download/quiet/port', () => {
  const option = {
    host: '1.0.0.0',
    port: 23,
    quiet: true,
    username: 'testuser',
    password: 'testpassord',
    remotePath: '/home/testuser/data',
    localPath: './test-data'
  }

  return scp.download(option).then(() => {
    expect(cou.warn).not.toBeCalled()
    expect(cou.info).not.toBeCalled()
    expect(cou.print).not.toBeCalled()
  })
})
