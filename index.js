'use strict'

var createVirtualAudioGraph = require('virtual-audio-graph').default

module.exports = function (arg) {
  var config = arg || {}
  var audioContext = config.audioContext || new AudioContext
  var output = config.output || audioContext.destination

  var virtualAudioGraph = createVirtualAudioGraph({
    audioContext: audioContext,
    output: output
  })

  return function (nodeParams$) {
    return nodeParams$.addListener({
      next: function next(nodeParams) {
        return virtualAudioGraph.update(nodeParams)
      }
    })
  }
}
