const util = require('util')

exports.info = function (...v) {
  console.info(...v)
}
exports.warn = function (...v) {
  console.warn(...v)
}
exports.print = function (...v) {
  process.stdout.write(util.format(...v))
}
