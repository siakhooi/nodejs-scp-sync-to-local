const cf0 = require('../../lib/core-filters')

test('core-filters/setupFilters/skipIfExists/true', () => {
  const workingObject = {
    validatedOption: { skipIfExists: true },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [cf0.skipIfExists] })
})
test('core-filters/setupFilters/skipIfExists/false', () => {
  const workingObject = {
    validatedOption: { skipIfExists: false },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves.not
    .toMatchObject({ fileFilters: [cf0.skipIfExists] })
})
