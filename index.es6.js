import createVirtualAudioGraph from 'virtual-audio-graph';

export default ({audioContext = new AudioContext(),
                 output = audioContext.destination} = {}) => {
  const virtualAudioGraph = createVirtualAudioGraph({audioContext, output});
  return nodeParams$ => nodeParams$.subscribe(nodeParams => virtualAudioGraph.update(nodeParams));
};
