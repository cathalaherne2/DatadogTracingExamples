#!/usr/bin/env node
'use strict'
const tar = require('tar')
const fs = require('fs')
const path = require('path')
const os = require('os')
const detectLibc = require('detect-libc')
const argv = require('minimist')(process.argv.slice(2))

const args = {
  platform: os.platform(),
  arch: os.arch(),
  libc: detectLibc.family || 'unknown'
}

if (argv.help || argv.h) {
  console.log('appsec-reinstall:')
  console.log('Reinstall native addon for AppSec features.')
  console.log('appsec-reinstall [arguments]')
  console.log('Arguments:')
  console.log('\targument\t\talias')
  console.log('\t--help\t\t\t-h\t\tprints help and exit')
  console.log('\t--platform\t\t-p\t\tchange platform (based on os.platform()). Default os.platform()')
  console.log('\t--arch\t\t\t-a\t\tchange arch (based on os.arch()). Default os.arch()')
  console.log('\t--libc\t\t\t-l\t\tchange libc variant. Default to current ones. Values are glibc, musl, unknown')
  process.exit(0)
}

if (argv.platform || argv.p) {
  args.platform = argv.platform || argv.p
}
if (argv.arch || argv.a) {
  args.arch = argv.arch || argv.a
}
if (argv.libc || argv.l) {
  args.libc = argv.libc || argv.l
}

// TODO: test on windows
async function install () {
  const dir = `${args.platform}-${args.arch}-${args.libc}`
  const tarPAth = path.join(__dirname, '..', 'vendor', dir + '.tgz').split('\\').join('\\\\')
  if (!fs.existsSync(tarPAth)) {
    // console.error(`No support for ${dir}`)
    process.exit(0)
  }
  await tar.x({
    file: tarPAth
  })
  fs.mkdirSync(path.join(__dirname, '..', 'vendor', dir), { recursive: true })
  fs.renameSync(path.join(process.cwd(), 'appsec.node').split('\\').join('\\\\')
    , path.join(__dirname, '..', 'vendor', dir, 'appsec.node').split('\\').join('\\\\'))
  if (args.platform === 'linux') {
    fs.renameSync(path.join(process.cwd(), 'libddwaf.so').split('\\').join('\\\\')
      , path.join(__dirname, '..', 'vendor', dir, 'libddwaf.so').split('\\').join('\\\\'))
  }
  fs.writeFileSync(path.join(__dirname, '..', 'install.json').split('\\').join('\\\\')
    , JSON.stringify({ target: dir }, null, 2))
}

install()
  .catch((e) => {
    // console.error(e)
    process.exit(0)
  })
