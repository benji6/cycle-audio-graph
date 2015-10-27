'use strict';

Object.defineProperty(exports, '__esModule', {
                 value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _virtualAudioGraph = require('virtual-audio-graph');

var _virtualAudioGraph2 = _interopRequireDefault(_virtualAudioGraph);

exports['default'] = function () {
                 var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                 var _ref$audioContext = _ref.audioContext;
                 var audioContext = _ref$audioContext === undefined ? new AudioContext() : _ref$audioContext;
                 var _ref$output = _ref.output;
                 var output = _ref$output === undefined ? audioContext.destination : _ref$output;

                 var virtualAudioGraph = (0, _virtualAudioGraph2['default'])({ audioContext: audioContext, output: output });
                 return function (nodeParams$) {
                                  return nodeParams$.subscribe(function (nodeParams) {
                                                   return virtualAudioGraph.update(nodeParams);
                                  });
                 };
};

module.exports = exports['default'];
