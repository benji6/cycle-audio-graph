require('web-audio-test-api')
WebAudioTestAPI.setState({
  'AudioContext#createStereoPanner': 'enabled',
  'AnalyserNode#getFloatTimeDomainData': 'enabled'
})
const Observable = require('rx').Observable
const test = require('tape')
const makeAudioGraphDriver = require('./')

const audioContext = new AudioContext()

const audioGraphDriver = makeAudioGraphDriver({
  audioContext,
  output: audioContext.destination
})

test('it works', t => {
  audioGraphDriver(Observable.of({
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

  audioGraphDriver(Observable.of({
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

  audioGraphDriver(Observable.of({}))
  t.deepEqual(audioContext.toJSON(), {
    name: 'AudioDestinationNode',
    inputs: []
  })

  audioGraphDriver(Observable.of({
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
