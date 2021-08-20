const cf0 = require('../../lib/core-filters')

test('core-filters/setupFilters/skipIfNewer/true', () => {
  const workingObject = {
    validatedOption: { skipIfNewer: true },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [cf0.skipIfNewer] })
})

test('core-filters/setupFilters/skipIfNewer/false', () => {
  const workingObject = {
    validatedOption: { skipIfNewer: false },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves.not
    .toMatchObject({ fileFilters: [cf0.skipIfNewer] })
})
