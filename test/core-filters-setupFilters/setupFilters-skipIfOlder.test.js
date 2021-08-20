const cf0 = require('../../lib/core-filters')

test('core-filters/setupFilters/skipIfOlder/true', () => {
  const workingObject = {
    validatedOption: { skipIfOlder: true },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [cf0.skipIfOlder] })
})

test('core-filters/setupFilters/skipIfOlder/false', () => {
  const workingObject = {
    validatedOption: { skipIfOlder: false },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves.not
    .toMatchObject({ fileFilters: [cf0.skipIfOlder] })
})
