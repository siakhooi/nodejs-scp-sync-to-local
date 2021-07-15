# Change Log

## Unreleased

- **Fixed**
  - `#129`: bug: `Error: Error: customFilter is not a function [null]`, when `option.customFilter=null`.
- **Other**
  - `#131`: As dev, I want to change license to `MIT` license.

## `0.11.0` - 2021-Jul-15

- **Added**
  - `#111`: As scp user, I want to use built-in filters with custom logic (`scp-sync-to-loca/filters`).
  - `#7`: As scp user, I want to have file datestamp same with original files (`option.keepTimestamp`).
- **Changed**
  - `#112`: As scp user, I want to see program name and version prior to parameter verifications. (`lib/core-option-verify-basic`)
- **Documentation**
  - `#115`: As dev, I want to rename workflow `Build` workflow to `Test with Jest`.
    - As dev, I want to remove jest badge.
    - As dev, I want to rename `Publish to GPR` and `Publish to NPM` workflow.
    - As dev, I want to rename npm version badge to `release`.
  - `#122`: As Dev, I want to add github top language badge to `README.md`.
- **Other**
  - `#121`: As dev, i want to use `eslint` to standardize coding style so that the code has better quality.
  - `#124`: As dev, I want to add `eslint` as github workflow.

## `0.10.0` - 2021-Jul-5

- **Added**
  - `#10`: As scp user, I want to specify custom function to filter files. (`option.customFilter`)
- **Code Refactor**
  - `#82`: As dev/test, I want to refactor test scripts directory/files to follow product files.
  - `#96`: As dev/test, I want to refactor code and do jest testing. (`verifyOptions` to `core-option.verify`)
  - `#97`: As dev/test, I want to refactor code and do jest testing. (`optionMutualCheck` to `core-option.crossVerify`)
  - `#56`: As dev/test, I want to refactor code and do jest testing. (`downloadRemoteFiles` to `core-remote.downloadFiles`)
  - `#57`: As dev/test, I want to refactor code and do jest testing. (`DisconnectOnAllDone` to `core-remote.disconnectOnAllDone`)
- **Fixed**
  - `#104`: bug in `#96`: As test, I want to fix `core-options-verify.js` uncapture warning.
- **Documentation**
  - `#94`: As dev, I want to refactor CHANGELOG to follow recommendation from <https://keepachangelog.com>
  - `#109`: As dev, I want to add badges for code size and npm download counts documentation.
  - `#113`: As dev, I want to add fundings to package.

## `0.9.0` 2021-Jun-29

- **Added**
  - `#35`: As scp user, I want to choose skip download if local file has bigger size. (`option.skipIfBigger` default to `false`)
  - `#36`: As scp user, I want to choose skip download if local file has smaller size. (`option.skipIfSmaller` default to `false`)
  - `#84`: As scp user, I want to choose skip download if file sizes are same. (`option.skipIfSameSize` default to `false`)
  - `#86`: As scp user, I want to choose skip download if file modified time are same. (`option.skipIfSameAge` default to `false`)
- **Changed**
  - `#91`: As scp user, I want to view print options before all actions.
- **Fixed**
  - `#85`: bug: As scp user, I want to remove mutual exclusive check on file size filters.
  - `#87`: bug: As scp user, I want to remove mutual exclusive check on file modified time filters.
- **Documentation**
  - `#80`: As dev, I want to have build/test/deploy status badge on `README.md`

## `0.8.0` 2021-Jun-27

- **Added**
  - `#26`: As scp user, I want to choose skip download if local file is newer. (`option.skipIfNewer` default to `false`)
  - `#27`: As scp user, I want to choose skip download if local file is older. (`option.skipIfOlder` default to `false`)
- **Fixed**
  - `#77`: bugs in `#26` test scripts.
- **Code Refactor**
  - `#49`: As dev/test, I want to refactor code and do jest testing. (`scp.login` to `core-remote.login`)
  - `#54`: As dev/test, I want to refactor code and do jest testing. (`scp.getRemoteFileList` to `core-remote.getFileList`)
  - `#55`: As dev/test, I want to refactor code and do jest testing. (`scp.filterFiles` to `corefilters.filterFiles`, `corefilters.setupFilters`)
  - `#67`: As dev, I want to standardize `require()` without `.js`.
  - `#73`: As test, I want to combine the mock-data files.

## `0.7.0` 2021-Jun-25

- **Added**
  - `#11`: As scp user, I want to choose to error or auto create local path if it is not exist. (`option.autoCreateLocalPath` default to `true`)
  - `#50`: As scp user, I want to `quiet` to turn off option verification info & warning.
- **Fixed**
  - `#62`: bug: As dev/test, I want to not include github files in npm package.
- **Others**
  - `#64`: As dev/test, I want to npm test on build & release enhancement.

## `0.6.1` 2021-Jun-24

- **Fixed**
  - `#59` : bug: `#25`: As scp user, I want to choose skip download if file not exists.(`option.skipIfNotExists` default to `false`)

## `0.6.0` 2021-Jun-23

- **Added**
  - `#28`: As scp user, I want to have error if `port` is not a number.
  - `#39`: As scp user, I want to see warning of `quiet` override `verbose`.
  - `#41`: As scp user, I want to get Version Number. add `getVersion()`
  - `#45`: As scp user, I want to default `host` to `localhost` if not specified.
- **Changed**
  - `#32`: As scp user, I want to change warning to info if `port` is not defined, and default to `22`.
  - `#42`: As scp user, I want to throw all errors as `Error()` objects.
- **Code Refactor**
  - `#30`: As dev/test, I want to use jest for test framework (`init/options`)
  - `#43`: As dev, I want to move all default values to `index.conf.js`.

## `0.5.0` 2021-Jun-15

- **Added**
  - `#20`: As scp user, I want to have quiet mode, no output on stdout. (`option.quiet` default to `false`)
  - `#21`: As scp user, I want to print full option values before downloads. (`option.verbose` default to `false`)
  - `#25`: As scp user, I want to choose skip download if file not exists.(`option.skipIfNotExists` default to `false`)

## `0.4.1` 2021-Jun-13

- **Documentation**
  - `#15`: As scp user, I want to have API documentation.
- **Fixed**
  - `#16`: bug: As dev, I want to rename `localpath`, `remotepath` to camel case (`localPath`, `remotePath`).
  - `#17`: bug: As dev, I want to separate working value from options. (security, internal state should not be exposed.)
  - `#18`: bug: As scp user, I want to see file numbering start from 1 (not 0)

## `0.4.0` 2021-Jun-12

- **Added**
  - `#4`: As scp user, I want to choose skip download if file already exists. (`option.skipIfExists` default to `true`)

## `0.3.1` 2021-Jun-10

- **Fixed**
  - `#12`: bug: As dev, I want to change `console.log` to `console.warn` for warnings.

## `0.3.0` 2021-Jun-09

- **Added**
  - `#2`: As scp user, I want to auto create local path if it is not exist.

## `0.2.0` 2021-Jun-08

- **Added**
  - `#3`: As scp user, I want to default port=`22` if not provided.
    - As scp user, I want to default localpath=current directory (`.`) if not provided.
    - As scp user, I want to default remotepath=current directory (`.`) if not provided.
    - As scp user, I want to have error if username not provided.
    - As scp user, I want to have error if password not provided.
    - As scp user, I want to have error if host not provided.

## `0.1.1` 2021-Jun-06

- **Added**
  - `#1`: As scp user, I want to download all files from a remote directory to a local directory.
