# Contributing Guide

## Test

### Test Naming

- Format: `jsFile/function[/circumstances]*[/result]`

  - `jsFile` - file name without extension `.js`
  - `function` - the exported function
  - `circumstances`
    - grouping of test cases
    - test data set name if is a `test.each`
  - `result`
    - for simple test, can use `+` for positive, `-` for negative test

- Example
  - `core-download/downloadFile/+`
  - `index/download/checkPortNumber/IncorrectPortNumber`

#### `test`

```js
test("core-download/downloadFile/+", () => {});
```

#### `test.each`

```js
test.each(dt.IncorrectPortNumber)("index/download/checkPortNumber/IncorrectPortNumber", (value) => {});
```
