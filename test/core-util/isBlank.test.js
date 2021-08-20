const cu = require('../../lib/core-util')
const dt = require('../mock-data/common-data-sets')

test.each(dt.BlankValueDataSet)('core-util/isBlank/BlankValueDataSet', (value) => {
  return expect(cu.isBlank(value)).toBe(true)
})
test.each(dt.NotBlankValueDataSet)('core-util/isBlank/NotBlankValueDataSet', (value) => {
  return expect(cu.isBlank(value)).toBe(false)
})
