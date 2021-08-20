const cf0 = require('../../lib/core-filters')

test('core-filters/setupFilters/skipIfSameSize/true', () => {
  const workingObject = {
    validatedOption: { skipIfSameSize: true },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [cf0.skipIfSameSize] })
})

test('core-filters/setupFilters/skipIfSameSize/false', () => {
  const workingObject = {
    validatedOption: { skipIfSameSize: false },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves.not
    .toMatchObject({ fileFilters: [cf0.skipIfSameSize] })
})
