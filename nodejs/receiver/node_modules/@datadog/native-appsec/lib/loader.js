/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2.0 License.
 * This product includes software developed at Datadog (https://www.datadoghq.com/). Copyright 2021 Datadog, Inc.
 **/
'use strict'
const os = require('os')
const detectLibc = require('detect-libc')

const getDir = module.exports.getDir = function () {
  return `${os.platform()}-${os.arch()}-${detectLibc.family || 'unknown'}`
}

module.exports.load = function () {
  return require(`../vendor/${getDir()}/appsec.node`)
}
