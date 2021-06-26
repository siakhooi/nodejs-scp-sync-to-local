# Change Log

## Upcoming

- `#67`: As dev, I want to standardize `require()` without `.js`.
- `#49`: As dev/test, I want to refactor code and do jest testing. (`scp.login` to `core-remote.login`)
- `#54`: As dev/test, I want to refactor code and do jest testing. (`scp.getRemoteFileList` to `core-remote.getFileList`)
- `#55`: As dev/test, I want to refactor code and do jest testing. (`scp.filterFiles` to `corefilters.filterFiles`, `corefilters.setupFilters`)

## `0.7.0`

- `#50`: As scp user, I want to `quiet` to turn off option verification info & warning.
- `#62`: bug: As dev/test, I want to not include github files in npm package.
- `#64`: As dev/test, I want to npm test on build & release enhancement.
- `#11`: As scp user, I want to choose to error or auto create local path if it is not exist. (`option.autoCreateLocalPath` default to `true`)

## `0.6.1`

- `#59` : bug: `#25`: As scp user, I want to choose skip download if file not exists.(`option.skipIfNotExists` default to `false`)

## `0.6.0`

- `#30`: As dev/test, I want to use jest for test framework (init/options)
- `#43`: As dev, I want to move all default values to `index.conf.js`.
- `#41`: As scp user, I want to get Version Number. add `getVersion()`
- `#42`: As scp user, I want to throw all errors as `Error()` objects.
- `#32`: As scp user, I want to change warning to info if `port` is not defined, and default to `22`.
- `#28`: As scp user, I want to have error if `port` is not a number.
- `#39`: As scp user, I want to see warning of `quiet` override `verbose`.
- `#45`: As scp user, I want to default `host` to `localhost` if not specified.

## `0.5.0`

- `#21`: As scp user, I want to print full option values before downloads. (`option.verbose`=`true`, default to `false`)
- `#20`: As scp user, I want to have quiet mode, no output on stdout. (`option.quiet`=`true`, default to `false`)
- `#25`: As scp user, I want to choose skip download if file not exists.(`option.skipIfNotExists` default to `false`)

## `0.4.1`

- `#15`: As scp user, I want to have API documentation.
- `#16`: bug: As dev, I want to rename `localpath`, `remotepath` to camel case (`localPath`, `remotePath`).
- `#18`: bug: As scp user, I want to see file numbering start from 1 (not 0)
- `#17`: bug: As dev, I want to separate working value from options. (security, internal state should not be exposed.)

## `0.4.0`

- `#4`: As scp user, I want to choose skip download if file already exists. (`option.skipIfExists` default to `true`)

## `0.3.1`

- `#12`: bug: As dev, I want to change `console.log` to `console.warn` for warnings.

## `0.3.0` - localpath verification

- `#2`: As scp user, I want to auto create local path if it is not exist.

## `0.2.0` - options verification

- `#3`: As scp user, I want to default port=`22` if not provided.
  - As scp user, I want to default localpath=current directory (`.`) if not provided.
  - As scp user, I want to default remotepath=current directory (`.`) if not provided.
  - As scp user, I want to have error if username not provided.
  - As scp user, I want to have error if password not provided.
  - As scp user, I want to have error if host not provided.

## `0.1.1`

- `#1`: As scp user, I want to download all files from a remote directory to a local directory.
