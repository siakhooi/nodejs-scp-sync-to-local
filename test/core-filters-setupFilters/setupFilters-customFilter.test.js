const cf0 = require('../../lib/core-filters')

const dummyFunction = () => { }

test('core-filters/setupFilters/customFilter/+', () => {
  const workingObject = {
    validatedOption: { customFilter: dummyFunction },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves
    .toMatchObject({ fileFilters: [dummyFunction] })
})

test('core-filters/setupFilters/customFilter/null', () => {
  const workingObject = {
    validatedOption: { customFilter: null },
    fileFilters: []
  }

  return expect(cf0.setupFilters(workingObject))
    .resolves.not
    .toMatchObject({ fileFilters: [dummyFunction] })
})
