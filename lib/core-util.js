exports.isBoolean = function (s) {
  const i = ('' + s).toLowerCase().trim()
  switch (i) {
    case 'false':
    case '0':
    case 'off':
    case 'no':
    case 'n':
      return true
    case 'true':
    case '1':
    case 'on':
    case 'yes':
    case 'y':
      return true
  }
  return false
}
exports.isTrue = function (s) {
  const i = ('' + s).toLowerCase().trim()
  switch (i) {
    case 'false':
    case '0':
    case 'off':
    case 'no':
    case 'n':
      return false
  }
  return !!s
}
