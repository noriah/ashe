'use strict'

var fs = require('fs')
var path = require('path')
var R = require('ramda')

var ashemd = path.resolve(__dirname, 'src', 'docs.md')
var sedFile = path.resolve(__dirname, 'docFix.sed')

fs.readFile(ashemd, 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  var insts = R.match(/#Ashe\+(.+?\))/g, data)
  var out = R.map(value => {
    var repl = R.toLower(R.replace('+', '', R.match(/\+(.+?\))/g, value)[0]))
    repl = R.replace('event_', '', repl)
    return `s/${value}/#${repl}/g;`
  }, insts)

  out = R.concat([
    '{',
    's/\\* \\[\\./\\* \\[#/g;',
    's/<a name=".*"><\\/a>//g;',
    's/new_Ashe_new/new_asheoptions/g',
    's/ashe\\.\\([^(]*\\)\\((.*) ⇒ \\)<code>/\\1\\n<code>\\1\\2/g;'
  ], out)

  out = R.concat(out, [
    's/#Ashe/#ashe/g;',
    '}'
  ])

  out = R.join('\n', out)

  fs.writeFile(sedFile, out, err => {
    if (err) {
      throw err
    }
  })
})
