const cf0 = require('../../lib/core-filters')

test('setupFilters/skipIfNotExists/true', () => {
  const workingObject = {
    validatedOption: { skipIfNotExists: true },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [cf0.skipIfNotExists] })
})
test('setupFilters/skipIfNotExists/false', () => {
  const workingObject = {
    validatedOption: { skipIfNotExists: false },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .not.toMatchObject({ fileFilters: [cf0.skipIfNotExists] })
})
