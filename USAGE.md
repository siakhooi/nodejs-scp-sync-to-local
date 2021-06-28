# Usage

- This module allow users to download files in a remote directory into a local directory via `scp`.

## To Install

```bash
npm install scp-sync-to-local [--save]
```

## To use this module

```js
const scp = require("scp-sync-to-local");
```

## `scp.download(option)`

### `option`

| name                  | type      | default value | description                                                                      |
| --------------------- | --------- | ------------- | -------------------------------------------------------------------------------- |
| `host`                | `String`  | `localhost`   |                                                                                  |
| `port`                | `integer` | `22`          |                                                                                  |
| `username`            | `String`  |               |                                                                                  |
| `password`            | `String`  |               |                                                                                  |
| `remotePath`          | `String`  | `.`           |                                                                                  |
| `localPath`           | `String`  | `.`           |                                                                                  |
| `skipIfExists`        | `boolean` | `true`        | Skip download if file exists locally, mutually exclusive with `skipIfNotExists`  |
| `skipIfNotExists`     | `boolean` | `false`       | Skip download if file NOT exists locally, mutually exclusive with `skipIfExists` |
| `skipIfNewer`         | `boolean` | `false`       | Skip download if local file is newer, mutually exclusive with `skipIfOlder`.     |
| `skipIfOlder`         | `boolean` | `false`       | Skip download if local file is older, mutually exclusive with `skipIfNewer`.     |
| `skipIfBigger`        | `boolean` | `false`       | Skip download if local file is bigger in size.                                   |
| `skipIfSmaller`       | `boolean` | `false`       | Skip download if local file is smaller in size.                                  |
| `verbose`             | `boolean` | `false`       | Print full option values before downloads. Override by `quiet`                   |
| `quiet`               | `boolean` | `false`       | no output, except error. override `verbose`                                      |
| `autoCreateLocalPath` | `boolean` | `true`        | auto Create Local Path if it is not exist, otherwise, throw an Error.            |

### Example

```js
var option = {
  host: "hostname",
  port: 22,
  username: "yourUsername",
  password: "yourPassword",
  remotePath: "remotePath",
  localPath: "localPath",
  skipIfExists: true,
  skipIfNotExists: false,
  skipIfNewer: false,
  skipIfOlder: false,
  skipIfBigger: false,
  verbose: false,
  quiet: false,
};

scp.download(option);
```

## `scp.getVersion()`

- return the version number in `string`.
