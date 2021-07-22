const scp = require('../index')
const fs = require('fs')

// enable to test customFilters
// const cf = require('../filters')
// downloadOnlyThisFile = (l, r) => { return r.name == 'xxx.zip' }
// downloadOnlyThisFile = (l, r) => { return r.name == 'xxx.zip' || cf.skipIfExists(l, r); }

const CONFIG_FILE = 'test-local-config/remote-server.js'
let REMOTE_HOST = '1.0.0.0'
let REMOTE_USERNAME = 'abc'
let REMOTE_PASSWORD = 'abc'

if (fs.existsSync(CONFIG_FILE)) {
  const l = require('../' + CONFIG_FILE)
  REMOTE_HOST = l.REMOTE_HOST
  REMOTE_USERNAME = l.REMOTE_USERNAME
  REMOTE_PASSWORD = l.REMOTE_PASSWORD
}

const option = {
  host: REMOTE_HOST,
  port: 22,
  username: REMOTE_USERNAME,
  password: REMOTE_PASSWORD,
  remotePath: '/home/testuser/data',
  localPath: './test-data',
  skipIfExists: true,
  skipIfNotExists: false,
  skipIfNewer: false,
  skipIfOlder: false,
  skipIfSameAge: false,
  skipIfBigger: false,
  skipIfSmaller: false,
  skipIfSameSize: false,
  keepTimestamp: true,
  verbose: true,
  quiet: false
}

scp.download(option)
  .catch((err) => console.error(err))
