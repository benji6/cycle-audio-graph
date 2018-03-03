require('web-audio-test-api')
var of = require('xstream').default.of
var test = require('tape')
var makeAudioGraphDriver = require('./')

WebAudioTestAPI.setState({
  'AudioContext#createStereoPanner': 'enabled',
  'AnalyserNode#getFloatTimeDomainData': 'enabled'
})

test('no destination in config', function (t) {
  var audioContext = new AudioContext

  var audioGraphDriver = makeAudioGraphDriver({
    audioContext: audioContext,
  })

  audioGraphDriver(of({
    0: ['gain', 'output', {gain: 0.2}],
    1: ['oscillator', 0, {type: 'square', frequency: 440}]
  }))
  t.deepEqual(audioContext.toJSON(), {
    name: 'AudioDestinationNode',
    inputs: [
      {
        gain: {inputs: [], value: 0.2},
        inputs: [
          {
            detune: {value: 0, inputs: []},
            frequency: {value: 440, inputs: []},
            inputs: [],
            name: 'OscillatorNode',
            type: 'square'
          }
        ],
        name: 'GainNode'
      }
    ]
  })
  t.end()
})

test('a few graphs', function(t) {
  var audioContext = new AudioContext

  var audioGraphDriver = makeAudioGraphDriver({
    audioContext: audioContext,
    output: audioContext.destination
  })

  audioGraphDriver(of({
    0: ['gain', 'output', {gain: 0.2}],
    1: ['oscillator', 0, {type: 'square', frequency: 440}]
  }))
  t.deepEqual(audioContext.toJSON(), {
    name: 'AudioDestinationNode',
    inputs: [
      {
        gain: {inputs: [], value: 0.2},
        inputs: [
          {
            detune: {value: 0, inputs: []},
            frequency: {value: 440, inputs: []},
            inputs: [],
            name: 'OscillatorNode',
            type: 'square'
          }
        ],
        name: 'GainNode'
      }
    ]
  })

  audioGraphDriver(of({
    0: ['gain', 'output', {gain: 0.1}],
    1: ['oscillator', 0, {type: 'sine', frequency: 220}]
  }))
  t.deepEqual(audioContext.toJSON(), {
    name: 'AudioDestinationNode',
    inputs: [
      {
        gain: {inputs: [], value: 0.1},
        inputs: [
          {
            detune: {value: 0, inputs: []},
            frequency: {value: 220, inputs: []},
            inputs: [],
            name: 'OscillatorNode',
            type: 'sine'
          }
        ],
        name: 'GainNode'
      }
    ]
  })

  audioGraphDriver(of({}))
  t.deepEqual(audioContext.toJSON(), {
    name: 'AudioDestinationNode',
    inputs: []
  })

  audioGraphDriver(of({
    0: ['gain', 'output', {gain: 0.2}],
    1: ['oscillator', 0, {type: 'square', frequency: 440}]
  }))
  t.deepEqual(audioContext.toJSON(), {
    name: 'AudioDestinationNode',
    inputs: [
      {
        gain: {inputs: [], value: 0.2},
        inputs: [
          {
            detune: {value: 0, inputs: []},
            frequency: {value: 440, inputs: []},
            inputs: [],
            name: 'OscillatorNode',
            type: 'square'
          }
        ],
        name: 'GainNode'
      }
    ]
  })
  t.end()
})
