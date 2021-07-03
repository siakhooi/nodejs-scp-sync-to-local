const fs = require('fs');

exports.isPathExist = function (f) {
    return fs.existsSync(f);
}

exports.isDirectory = function (f) {
    return fs.lstatSync(f).isDirectory();
}
exports.mkdir = function (f) {
    fs.mkdirSync(f);
}
exports.isNewer = function (f, modifyTime) {
    try {
        var s = fs.statSync(f);
        return (Number(s.mtime) > modifyTime);
    } catch (e) {
        return false;
    }
}
exports.isOlder = function (f, modifyTime) {
    try {
        var s = fs.statSync(f);
        return (Number(s.mtime) < modifyTime);
    } catch (e) {
        return false;
    }
}
exports.isSameAge = function (f, modifyTime) {
    try {
        var s = fs.statSync(f);
        return (Number(s.mtime) == modifyTime);
    } catch (e) {
        return false;
    }
}
exports.isBigger = function (f, size) {
    try {
        var s = fs.statSync(f);
        return (s.size > size);
    } catch (e) {
        return false;
    }
}
exports.isSmaller = function (f, size) {
    try {
        var s = fs.statSync(f);
        return (s.size < size);
    } catch (e) {
        return false;
    }
}
exports.isSameSize = function (f, size) {
    try {
        var s = fs.statSync(f);
        return (s.size == size);
    } catch (e) {
        return false;
    }
}