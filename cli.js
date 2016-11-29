#!/usr/bin/env node

const parseArgs = require('minimist')
const bundle = require('./')
const elegantSpinner = require('elegant-spinner')
const logUpdate = require('log-update')


const args = parseArgs(process.argv.slice(2))
let frame = elegantSpinner()

const intervalId = setInterval(function () {
  logUpdate(frame())
}, 50)

const src = args._
const dest = args.o

bundle({ src, dest }).then(() => {
  clearInterval(intervalId)
}).catch((err) => {
  clearInterval(intervalId)
  console.log(err)
})

