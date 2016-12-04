#!/usr/bin/env node

import fs from 'fs'
import program from 'commander'
import elegantSpinner from 'elegant-spinner'
import logUpdate from 'log-update'
import bundle from './'
import info from '../package.json'

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
