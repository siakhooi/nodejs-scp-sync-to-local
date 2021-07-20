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

## `scp.getVersion()`

- return the version number in `string`.

## `scp.download(option)`

### `option`

| name                  | type       | default value | description                                                                      |
| --------------------- | ---------- | ------------- | -------------------------------------------------------------------------------- |
| `host`                | `String`   | `localhost`   |                                                                                  |
| `port`                | `integer`  | `22`          |                                                                                  |
| `username`            | `String`   |               |                                                                                  |
| `password`            | `String`   |               |                                                                                  |
| `remotePath`          | `String`   | `.`           |                                                                                  |
| `localPath`           | `String`   | `.`           |                                                                                  |
| `skipIfExists`        | `boolean`  | `false`       | Skip download if file exists locally, mutually exclusive with `skipIfNotExists`  |
| `skipIfNotExists`     | `boolean`  | `false`       | Skip download if file NOT exists locally, mutually exclusive with `skipIfExists` |
| `skipIfNewer`         | `boolean`  | `false`       | Skip download if local file is newer.                                            |
| `skipIfOlder`         | `boolean`  | `false`       | Skip download if local file is older.                                            |
| `skipIfSameAge`       | `boolean`  | `false`       | Skip download if local file and remote file have same file modified time.        |
| `skipIfBigger`        | `boolean`  | `false`       | Skip download if local file is bigger in size.                                   |
| `skipIfSmaller`       | `boolean`  | `false`       | Skip download if local file is smaller in size.                                  |
| `skipIfSameSize`      | `boolean`  | `false`       | Skip download if local file and remote file is same in size.                     |
| `verbose`             | `boolean`  | `false`       | Print full option values before downloads. Override by `quiet`                   |
| `quiet`               | `boolean`  | `false`       | no output, except error. override `verbose`                                      |
| `autoCreateLocalPath` | `boolean`  | `true`        | auto Create Local Path if it is not exist, otherwise, throw an Error.            |
| `customFilter`        | `function` | `null`        | use custom filter function                                                       |
| `keepTimestamp`       | `boolean`  | `false`       | Keep the Timestamp of file same with remote.                                     |

- A file will be downloaded only if **all filters** return `true`.

### Example

```js
var option = {
  host: "hostname",
  port: 22,
  username: "yourUsername",
  password: "yourPassword",
  remotePath: "remotePath",
  localPath: "localPath",
  skipIfExists: false,
  skipIfNotExists: false,
  skipIfNewer: false,
  skipIfOlder: false,
  skipIfSameAge: false,
  skipIfBigger: false,
  skipIfSmaller: false,
  skipIfSameSize: false,
  verbose: false,
  quiet: false,
  keepTimestamp: false,
};

scp.download(option);
```

### Custom Filter

- Custom filter allows user to define a function to filter the file to be downloaded based on custom logic.
- Example of the function

```js
function myCustomFilter(localPath, remotePathObject) {
  //conditions..
  if(...) return false; // not downlolad
  if(...) return true; // to download
}
```

- `localPath`
  - `option.localPath +'/' + remotePathObject.name`
- `remotePathObject` - an object, example:

```js
    {
        type: '-',
        name: 'filename.ext',
        size: 49453,
        modifyTime: 1622867586000,
        accessTime: 1623577546000,
        rights: { user: 'rw', group: 'rw', other: 'r' },
        owner: 1001,
        group: 1001
    }
```

## Built-In Filters with customFilters

- Filters are AND together when checking all files. So be careful when Built-In Filters and customFilters are enabled together.

```js
const cf = require("scp-sync-to-local/filters");       //include the built-in filters

function myCustomFilter(localPath, remotePathObject) { //define customFilters
  return <...other condition...> ||                    //custom condition, eg: remotePathObject.name='abc.txt'
         cf.skipIfExists(localPath, remotePathObject); //or with built in filters
}
var option = {
  username: "yourUsername",
  password: "yourPassword",
  customFilter: myCustomFilter                        //declare customFilter
};

scp.download(option);
```

| Built-in Filter   | description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `skipIfExists`    | Skip download if file exists locally, not to use with `skipIfNotExists`   |
| `skipIfNotExists` | Skip download if file NOT exists locally, not to use with `skipIfExists`  |
| `skipIfNewer`     | Skip download if local file is newer.                                     |
| `skipIfOlder`     | Skip download if local file is older.                                     |
| `skipIfSameAge`   | Skip download if local file and remote file have same file modified time. |
| `skipIfBigger`    | Skip download if local file is bigger in size.                            |
| `skipIfSmaller`   | Skip download if local file is smaller in size.                           |
| `skipIfSameSize`  | Skip download if local file and remote file is same in size.              |
