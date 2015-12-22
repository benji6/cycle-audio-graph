# cycle-audio-graph

[![npm version](https://badge.fury.io/js/cycle-audio-graph.svg)](https://badge.fury.io/js/cycle-audio-graph)
[![Build Status](https://travis-ci.org/benji6/cycle-audio-graph.svg)](https://travis-ci.org/benji6/cycle-audio-graph)

Audio graph driver for Cycle.js based on [virtual-audio-graph](https://github.com/benji6/virtual-audio-graph)

## Installation

```bash
npm i -S cycle-audio-graph
```

## Usage

### makeAudioGraphDriver

The default export of `cycle-audio-graph` is `makeAudioGraphDriver` which takes an optional configuration object with two optional key-value pairs:

```javascript
import makeAudioGraphDriver from 'cycle-audio-graph';

const audioContext = new AudioContext();

// if no configuration object is provided the defaults
// detailed below will be used
makeAudioGraphDriver({
  // if audioContext is not provided then cycle-audio-graph
  // will attempt to construct its own instance
  audioContext,
  // output could be any valid AudioNode destination.
  // If not provided then cycle-audio-graph will use
  // the destination of its audioContext instance
  output: audioContext.destination,
});

```

### Very Basic Example

```javascript
import {run} from '@cycle/core';
import makeAudioGraphDriver from 'cycle-audio-graph';

const audioContext = new AudioContext();

const main = responses => {
  // ...
  virtualNodeParams$ = example$.map(_ => {
    // ...
    const {currentTime} = audioContext;
    return {
      0: ['gain', 'output', {gain: 0.2}],
      1: ['oscillator', 0, {type: 'square',
                            frequency: 440,
                            startTime: currentTime + 1,
                            stopTime: currentTime + 2}],
    };
  });
  return {
    audioGraph: virtualNodeParams$,
    // ... etc.
  };
};

const drivers = {
  audioGraph: makeAudioGraphDriver({audioContext,
                                    output: audioContext.destination}),
  // ... etc.
};

run(main, drivers);
```

### virtual-audio-graph

For more info on the `virtualNodeParams` objects check out the documentation for [virtual-audio-graph](https://github.com/benji6/virtual-audio-graph)
