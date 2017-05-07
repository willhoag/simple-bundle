#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const elegantSpinner = require('elegant-spinner')
const logUpdate = require('log-update')
const bundle = require('./')
const info = require('../package.json')

program
  .version(info.version)
  .usage('[html] {OPTIONS}')
  .option('-o, --output [folder]', 'output directory for assets')
  .parse(process.argv)

const frame = elegantSpinner()

const intervalId = setInterval(function () {
  logUpdate(frame())
}, 50)

bundle({
  src: program.args,
  dest: program.output
}).then(function () {
  clearInterval(intervalId)
}).catch(function (err) {
  clearInterval(intervalId)
  console.log(err)
})
