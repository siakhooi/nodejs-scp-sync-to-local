#!/usr/bin/env node

const scp = require('./index')

const option = {
  prompt: true
}
scp.download(option)
