const debugLib = require('debug');
const randomWord = require('random-word');

const {
  makeAskWords,
  makeAskCode,
  makeEncodeWords,
  makeDisplayEncoded,
} = require('./domain');
const { makeUI } = require('./tools');

module.exports = (options) => {
  const debug = debugLib('recoveryph');
  debug.enabled = options.debugEnabled;

  const ui = makeUI();
  const askWords = makeAskWords({ ui, debug });
  const askCode = makeAskCode({ ui, debug });
  const encodeWords = makeEncodeWords({ randomWord, debug });
  const displayEncoded = makeDisplayEncoded({ ui, debug });

  return {
    askCode,
    askWords,
    debug,
    encodeWords,
    displayEncoded,
  };
};
