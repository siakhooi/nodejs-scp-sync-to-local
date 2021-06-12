# Change Log

## Upcoming (0.4.1)

- As scp user, I want to have API documentation.
- bug: rename `localpath`, `remotepath` to camel case (`localPath`, `remotePath`).

## `0.4.0`

- As scp user, I want to choose skip/replace download if file already exists. (`option.skipIfExists` default to `true`)

## `0.3.1`

- bug: change `console.log` to `console.warn` for warnings.

## `0.3.0` - localpath verification

- As scp user, I want to auto create local path if it is not exist.

## `0.2.0` - options verification

- As scp user, I want to default port=`22` if not provided.
- As scp user, I want to default localpath=current directory (`.`) if not provided.
- As scp user, I want to default remotepath=current directory (`.`) if not provided.
- As scp user, I want to have error if username not provided.
- As scp user, I want to have error if password not provided.
- As scp user, I want to have error if host not provided.

## `0.1.1`

- As scp user, I want to download all files from a remote directory to a local directory.
