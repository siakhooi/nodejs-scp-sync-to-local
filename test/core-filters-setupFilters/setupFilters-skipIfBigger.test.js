const cf0 = require('../../lib/core-filters')

test('core-filters/setupFilters/skipIfBigger/true', () => {
  const workingObject = {
    validatedOption: { skipIfBigger: true },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [cf0.skipIfBigger] })
})

test('core-filters/setupFilters/skipIfBigger/false', () => {
  const workingObject = {
    validatedOption: { skipIfBigger: false },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves.not
    .toMatchObject({ fileFilters: [cf0.skipIfBigger] })
})
