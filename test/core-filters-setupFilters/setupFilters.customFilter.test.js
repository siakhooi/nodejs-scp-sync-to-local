const cf0 = require('../../lib/core-filters')

const dummyFunction = () => { }

test('setupFilters/customFilter/true', () => {
  const workingObject = {
    validatedOption: { customFilter: dummyFunction },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [dummyFunction] })
})

test('setupFilters/customFilter/false', () => {
  const workingObject = {
    validatedOption: { customFilter: null },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves.not
    .toMatchObject({ fileFilters: [dummyFunction] })
})
