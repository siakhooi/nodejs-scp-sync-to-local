const cf0 = require('../../lib/core-filters')

test('core-filters/setupFilters/mixed/SkipIfExists+SkipIfNewer', () => {
  const workingObject = {
    validatedOption: { skipIfExists: true, skipIfNewer: true },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [cf0.skipIfExists, cf0.skipIfNewer] })
})

test('core-filters/setupFilters/mixed/skipIfNotExists+skipIfOlder', () => {
  const workingObject = {
    validatedOption: { skipIfNotExists: true, skipIfOlder: true },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [cf0.skipIfNotExists, cf0.skipIfOlder] })
})

test('core-filters/setupFilters/mixed/skipIfBigger+skipIfSmaller', () => {
  const workingObject = {
    validatedOption: { skipIfBigger: true, skipIfSmaller: true },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [cf0.skipIfBigger, cf0.skipIfSmaller] })
})

test('core-filters/setupFilters/mixed/skipIfNewer+skipIfOlder', () => {
  const workingObject = {
    validatedOption: { skipIfNewer: true, skipIfOlder: true },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [cf0.skipIfNewer, cf0.skipIfOlder] })
})
test('core-filters/setupFilters/mixed/+skipIfNewer+skipIfOlder+skipIfSameAge', () => {
  const workingObject = {
    validatedOption: { skipIfNewer: true, skipIfOlder: true, skipIfSameAge: true },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [cf0.skipIfNewer, cf0.skipIfOlder, cf0.skipIfSameAge] })
})
