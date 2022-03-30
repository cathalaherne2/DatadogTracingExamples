/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2.0 License.
 * This product includes software developed at Datadog (https://www.datadoghq.com/). Copyright 2021 Datadog, Inc.
 **/
'use strict'
const path = require('path')
const os = require('os')
const pkg = require('../package.json')

const platform = process.env.PLATFORM || os.platform()
const arch = process.env.ARCH || os.arch()

const getLibName = module.exports.getLibName = function () {
  switch (platform) {
    case 'darwin':
      return 'libddwaf.a'
    case 'win32':
      return 'ddwaf_static.lib'
    case 'linux':
      return 'libddwaf.so'
  }
}

const getDirName = module.exports.getDirName = function () {
  // TODO: override arch to download binaries out of docker and copy them then
  switch (platform) {
    case 'darwin':
      return `libddwaf-${pkg.libddwaf_version}-darwin-x86_64`
    case 'win32':
      if (arch === 'x64') {
        return `libddwaf-${pkg.libddwaf_version}-windows-x64`
      }
      if (arch === 'ia32') {
        return `libddwaf-${pkg.libddwaf_version}-windows-win32`
      }
      break
    case 'linux':
      return `libddwaf-${pkg.libddwaf_version}-linux-x86_64`
  }
  throw new Error(`Platform: ${platform} - ${arch} is unsupported`)
}

const dirname = getDirName()
const libName = getLibName()

module.exports.include = path.join(__dirname, '..', dirname, 'include').split('\\').join('\\\\')
module.exports.lib = path.join(__dirname, '..', dirname, 'lib', libName).split('\\').join('\\\\')
