const fs = require('fs');

exports.isBoolean = function (s) {
    var i = ("" + s).toLowerCase().trim();
    switch (i) {
        case "false":
        case "0":
        case "off":
        case "no":
        case "n":
            return true;
        case "true":
        case "1":
        case "on":
        case "yes":
        case "y":
            return true;
    }
    return false;
}
exports.isTrue = function (s) {
    var i = ("" + s).toLowerCase().trim();
    switch (i) {
        case "false":
        case "0":
        case "off":
        case "no":
        case "n":
            return false;
    }
    return !!s;
}

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