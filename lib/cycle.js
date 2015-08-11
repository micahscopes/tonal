'use strict'
var noteName = require('./note-name')
var parse = require('./parse-interval')
var transpose = require('./transpose')
var invert = require('./invert-interval')

/**
 * Create cycles of notes by transposing them by an interval.
 *
 * @param {String|Note} root - the first note of the cycle (required)
 * @param {String|Interval} interval - the interval used to transpose the note (required)
 * @param {Integer} length - the length of the returned array (required, must be > 0)
 * @param {Integer} offset - if specified, the first note of the cycle will be
 * the root after _offset_ steps. Optional, 0 by default
 * @return {Array} an array of notes __without__ octave
 *
 * @example
 * var cycle = require('tonal/cycle')
 * cycle('C', 'P5', 4) // ['C', 'G', 'D', 'A']
 * cycle('C', 'P5', 4', 2) // ['D', 'A', 'E', 'B']
 */
function cycle (root, interval, length, offset) {
  if (length === 0) return []
  else if (length < 0) {
    interval = invert(interval)
    length *= -1
  }
  interval = parse(interval)
  var note = noteName(root)
  offset = offset || 0
  for (var o = 0; o < offset; o++) {
    note = noteName(transpose(interval, note))
  }
  var result = [ note ]
  for (var i = 1; i < length ; i++) {
    note = noteName(transpose(interval, note))
    result.push(note)
  }
  return result
}

module.exports = cycle