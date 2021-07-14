const cf0 = require('../../lib/core-filters')

test('setupFilters/skipIfSameAge/true', () => {
  const workingObject = {
    validatedOption: { skipIfSameAge: true },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [cf0.skipIfSameAge] })
})

test('setupFilters/skipIfSameAge/false', () => {
  const workingObject = {
    validatedOption: { skipIfSameAge: false },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves.not
    .toMatchObject({ fileFilters: [cf0.skipIfSameAge] })
})
