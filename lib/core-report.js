exports.returnReport = function (workingObject) {
  return new Promise((resolve, reject) => {
    const returnValue = {}
    returnValue.totalDownloaded = workingObject.totalDownloaded
    returnValue.validatedOption = workingObject.validatedOption
    returnValue.files = workingObject.filteredFileList.map((x) => {
      return {
        name: x.name,
        size: x.size,
        modifyTime: x.modifyTime,
        accessTime: x.accessTime
      }
    })
    resolve(returnValue)
  })
}
