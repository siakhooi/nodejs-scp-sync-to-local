const util = require('util')
const cov = require('../../lib/core-options-verify')

const DEFAULT_PORT = 22

test.each([23, '34'])('verifyPort', (value) => {
  const workingObject = {
    userOption: { port: value },
    validatedOption: {}
  }

  expect(cov.verifyPort(workingObject))
    .resolves
    .toMatchObject({
      userOption: { port: value },
      validatedOption: { port: Number(value) }
    })
})

test.each([null, ''])('verifyPort/blank', (value) => {
  const workingObject = {
    userOption: { port: value },
    validatedOption: {}
  }

  const consoleOutput = []
  global.console.info = jest.fn().mockImplementation((s) => { consoleOutput.push(s) })
  const msg = util.format('Info: port is undefined, defaulting to %d.', DEFAULT_PORT)
  expect(cov.verifyPort(workingObject))
    .resolves
    .toMatchObject({
      userOption: { port: value },
      validatedOption: { port: DEFAULT_PORT }
    })
  expect(console.info).toBeCalled()
  expect(consoleOutput).toContain(msg)
})
test('verifyPort/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  const consoleOutput = []
  global.console.info = jest.fn().mockImplementation((s) => { consoleOutput.push(s) })
  const msg = util.format('Info: port is undefined, defaulting to %d.', DEFAULT_PORT)
  expect(cov.verifyPort(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { port: DEFAULT_PORT }
    })
  expect(console.info).toBeCalled()
  expect(consoleOutput).toContain(msg)
})

test('verifyPort/not-number', () => {
  const workingObject = {
    userOption: { port: 'xxx' },
    validatedOption: {}
  }

  const msg = util.format('Error: port is not an integer number [%s].', workingObject.userOption.port)
  expect(cov.verifyPort(workingObject))
    .rejects
    .toThrow(msg)
})

test.each([null, ''])('verifyPort/blank/quiet', (value) => {
  const workingObject = {
    userOption: { port: value },
    validatedOption: { quiet: true }
  }

  global.console.info = jest.fn()
  expect(cov.verifyPort(workingObject))
    .resolves
    .toMatchObject({
      userOption: { port: value },
      validatedOption: {
        port: DEFAULT_PORT,
        quiet: true
      }
    })
  expect(console.info).not.toBeCalled()
})
test('verifyPort/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }

  global.console.info = jest.fn()
  expect(cov.verifyPort(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        port: DEFAULT_PORT,
        quiet: true
      }
    })
  expect(console.info).not.toBeCalled()
})
