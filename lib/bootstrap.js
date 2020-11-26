const debugLib = require('debug');

const { makeAskWords, makeAskCode } = require('./domain');
const { makeUI } = require('./tools');

module.exports = (options) => {
  const debug = debugLib('recoveryph');
  debug.enabled = options.debugEnabled;

  const ui = makeUI();
  const askWords = makeAskWords({ ui, debug });
  const askCode = makeAskCode({ ui, debug });

  return {
    askCode,
    askWords,
    debug,
  };
};
