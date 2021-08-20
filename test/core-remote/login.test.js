const cr0 = require('../../lib/core-remote')

test('core-remote/login/+', () => {
  const workingObject = {
    validatedOption: {
      host: '192.168.0.106',
      port: 22,
      username: 'testuser',
      password: 'testpassword'
    },
    scpLoginOption: {},
    scpClient: {}
  }

  expect(cr0.login(workingObject))
    .resolves
    .toHaveProperty('scpClient.result', 'Mock Connection: Success')
})

test('core-remote/login/-', () => {
  const workingObject = {
    validatedOption: {
      host: 'xyxasdkhasldkf',
      port: 22,
      username: 'testuser',
      password: 'testpassword'
    },
    scpLoginOption: {},
    scpClient: {}
  }
  expect(cr0.login(workingObject))
    .rejects
    .toThrow('Mock Connection: Fail')
})
