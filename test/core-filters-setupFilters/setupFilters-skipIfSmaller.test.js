const cf0 = require('../../lib/core-filters')

test('core-filters/setupFilters/skipIfSmaller/true', () => {
  const workingObject = {
    validatedOption: { skipIfSmaller: true },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [cf0.skipIfSmaller] })
})

test('core-filters/setupFilters/skipIfSmaller/false', () => {
  const workingObject = {
    validatedOption: { skipIfSmaller: false },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves.not
    .toMatchObject({ fileFilters: [cf0.skipIfSmaller] })
})
