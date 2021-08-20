const util = require('util')
const cov = require('../../lib/core-options-verify')
const cou = require('../../lib/core-output')
const m = require('../mocklib')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_PORT = 22
const expectedInfo = [util.format('Info: port is undefined, defaulting to %d.', DEFAULT_PORT)]

test.each(dt.IntegerDataSet)('core-options-verify/verifyPort/IntegerDataSet', (value) => {
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

test.each(dt.BlankValueDataSet)('core-options-verify/verifyPort/BlankValueDataSet', (value) => {
  const workingObject = {
    userOption: { port: value },
    validatedOption: {}
  }

  const i = new m.MockOutput()
  cou.info = i.fn()

  expect(cov.verifyPort(workingObject))
    .resolves
    .toMatchObject({
      userOption: { port: value },
      validatedOption: { port: DEFAULT_PORT }
    })
  expect(i.verify(expectedInfo)).resolves.toBe(true)
})
test('core-options-verify/verifyPort/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  const i = new m.MockOutput()
  cou.info = i.fn()
  expect(cov.verifyPort(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { port: DEFAULT_PORT }
    })
  expect(i.verify(expectedInfo)).resolves.toBe(true)
})

test.each(dt.NotIntegerDataSet)('core-options-verify/verifyPort/NotIntegerDataSet', (value) => {
  const workingObject = {
    userOption: { port: value },
    validatedOption: {}
  }

  const msg = util.format('Error: port is not an integer number [%s].', workingObject.userOption.port)
  expect(cov.verifyPort(workingObject))
    .rejects
    .toThrow(msg)
})

test.each(dt.BlankValueDataSet)('core-options-verify/verifyPort/BlankValueDataSet/quiet', (value) => {
  const workingObject = {
    userOption: { port: value },
    validatedOption: { quiet: true }
  }

  cou.info = jest.fn()
  expect(cov.verifyPort(workingObject))
    .resolves
    .toMatchObject({
      userOption: { port: value },
      validatedOption: {
        port: DEFAULT_PORT,
        quiet: true
      }
    })
  expect(cou.info).not.toBeCalled()
})
test('core-options-verify/verifyPort/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }

  cou.info = jest.fn()
  expect(cov.verifyPort(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        port: DEFAULT_PORT,
        quiet: true
      }
    })
  expect(cou.info).not.toBeCalled()
})
