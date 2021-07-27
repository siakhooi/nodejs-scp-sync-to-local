const scp = require('../../index')
const path = require('path')

beforeEach(() => jest.clearAllMocks())

test('scp/download/ok/1', () => {
  const actualInfo = []
  console.info = jest.fn().mockImplementation((s) => { actualInfo.push(s) })
  const expectedInfo = ['Info: port is undefined, defaulting to 22.',
    '1 downloading /home/testuser/data/Mock_File_1.zip',
    '2 downloading /home/testuser/data/Mock_File_2.zip',
    '1 downloaded /home/testuser/data/Mock_File_1.zip ' + path.normalize('./test-data/Mock_File_1.zip') + ' 2928',
    '2 downloaded /home/testuser/data/Mock_File_2.zip ' + path.normalize('./test-data/Mock_File_2.zip') + ' 49453',
    'All done, total downloads = %d.',
    'done']

  const actualWarn = []
  console.warn = jest.fn().mockImplementation((s) => { actualWarn.push(s) })
  const expectedWarn = [
    'Warning: skipIfExists is undefined, defaulting to false.',
    'Warning: skipIfNotExists is undefined, defaulting to false.',
    'Warning: skipIfNewer is undefined, defaulting to false.',
    'Warning: skipIfOlder is undefined, defaulting to false.',
    'Warning: skipIfSameAge is undefined, defaulting to false.',
    'Warning: skipIfBigger is undefined, defaulting to false.',
    'Warning: skipIfSmaller is undefined, defaulting to false.',
    'Warning: skipIfSameSize is undefined, defaulting to false.']

  const actualWrite = []
  process.stdout.write = jest.fn().mockImplementation((s) => { actualWrite.push(s) })
  const expectedWrite = ['Downloading Remote File List...']

  const option = {
    host: '1.0.0.0',
    username: 'testuser',
    password: 'testpassord',
    remotePath: '/home/testuser/data',
    localPath: '.\\test-data'
  }

  return scp.download(option)
    .then(() => {
      expect(console.warn).toBeCalled()
      expect(console.info).toBeCalled()
      expect(process.stdout.write).toBeCalled()
      actualInfo.forEach((x) => expect(expectedInfo).toContainEqual(x))
      expectedInfo.forEach((x) => expect(actualInfo).toContainEqual(x))
      actualWrite.forEach((x) => expect(expectedWrite).toContainEqual(x))
      expectedWrite.forEach((x) => expect(actualWrite).toContainEqual(x))
      actualWarn.forEach((x) => expect(expectedWarn).toContainEqual(x))
      expectedWarn.forEach((x) => expect(actualWarn).toContainEqual(x))
    })
})

test('scp/download/ok/2', () => {
  const actualInfo = []
  console.info = jest.fn().mockImplementation((s) => { actualInfo.push(s) })
  const expectedInfo = [
    '1 downloading /home/testuser/data/Mock_File_1.zip',
    '2 downloading /home/testuser/data/Mock_File_2.zip',
    '1 downloaded /home/testuser/data/Mock_File_1.zip ' + path.normalize('./test-data/Mock_File_1.zip') + ' 2928',
    '2 downloaded /home/testuser/data/Mock_File_2.zip ' + path.normalize('./test-data/Mock_File_2.zip') + ' 49453',
    'All done, total downloads = %d.',
    'done']

  const actualWrite = []
  process.stdout.write = jest.fn().mockImplementation((s) => { actualWrite.push(s) })
  const expectedWrite = ['Downloading Remote File List...']

  const actualWarn = []
  console.warn = jest.fn().mockImplementation((s) => { actualWarn.push(s) })
  const expectedWarn = [
    'Warning: skipIfExists is undefined, defaulting to false.',
    'Warning: skipIfNotExists is undefined, defaulting to false.',
    'Warning: skipIfNewer is undefined, defaulting to false.',
    'Warning: skipIfOlder is undefined, defaulting to false.',
    'Warning: skipIfSameAge is undefined, defaulting to false.',
    'Warning: skipIfBigger is undefined, defaulting to false.',
    'Warning: skipIfSmaller is undefined, defaulting to false.',
    'Warning: skipIfSameSize is undefined, defaulting to false.']

  const option = {
    host: '1.0.0.0',
    port: 23,
    username: 'testuser',
    password: 'testpassord',
    remotePath: '/home/testuser/data',
    localPath: '.\\test-data'
  }

  return scp.download(option).then(() => {
    expect(console.warn).toBeCalled()
    expect(console.info).toBeCalled()
    expect(process.stdout.write).toBeCalled()
    actualInfo.forEach((x) => expect(expectedInfo).toContainEqual(x))
    expectedInfo.forEach((x) => expect(actualInfo).toContainEqual(x))
    actualWrite.forEach((x) => expect(expectedWrite).toContainEqual(x))
    expectedWrite.forEach((x) => expect(actualWrite).toContainEqual(x))
    actualWarn.forEach((x) => expect(expectedWarn).toContainEqual(x))
    expectedWarn.forEach((x) => expect(actualWarn).toContainEqual(x))
  })
})
