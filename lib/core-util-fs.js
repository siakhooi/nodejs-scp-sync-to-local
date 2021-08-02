const fs = require('fs')

exports.isPathExist = function (f) {
  return fs.existsSync(f)
}

exports.isDirectory = function (f) {
  return fs.lstatSync(f).isDirectory()
}
exports.mkdir = function (f) {
  fs.mkdirSync(f)
}
exports.updateTimes = function (f, atimeMs, mtimeMs) {
  fs.utimesSync(f, atimeMs / 1000, mtimeMs / 1000)
}
const statOptions = {
  throwIfNoEntry: false
}
exports.isNewer = function (f, modifyTime) {
  const s = fs.statSync(f, statOptions)
  return s === undefined ? false : (Number(s.mtime) > modifyTime)
}
exports.isOlder = function (f, modifyTime) {
  const s = fs.statSync(f, statOptions)
  return s === undefined ? false : (Number(s.mtime) < modifyTime)
}
exports.isSameAge = function (f, modifyTime) {
  const s = fs.statSync(f, statOptions)
  return s === undefined ? false : (Number(s.mtime) === modifyTime)
}
exports.isBigger = function (f, size) {
  const s = fs.statSync(f, statOptions)
  return s === undefined ? false : (s.size > size)
}
exports.isSmaller = function (f, size) {
  const s = fs.statSync(f, statOptions)
  return s === undefined ? false : (s.size < size)
}
exports.isSameSize = function (f, size) {
  const s = fs.statSync(f, statOptions)
  return s === undefined ? false : (s.size === size)
}
