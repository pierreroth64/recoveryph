const debugLib = require('debug');
const randomWord = require('random-word');
const { promisify } = require('util');
const fs = require('fs');
const fileWriteOp = promisify(fs.writeFile);

const {
  makeAskWords,
  makeAskCode,
  makeEncodeWords,
  makeDisplayEncoded,
} = require('./domain');
const { makeUI, makeWriteFile } = require('./tools');

module.exports = (options) => {
  const debug = debugLib('recoveryph');
  debug.enabled = options.debugEnabled;

  const ui = makeUI();
  const givenWordsAlready = options.words
    ? options.words.split(',')
    : undefined;
  const askWords = makeAskWords({ ui, debug, givenWordsAlready });
  const askCode = makeAskCode({ ui, debug });
  const encodeWords = makeEncodeWords({ randomWord, debug });
  const displayEncoded = makeDisplayEncoded({ ui, debug });
  const mayWriteToFile = options.outputFile
    ? makeWriteFile({ fileWriteOp })
    : () => {};

  return {
    askCode,
    askWords,
    debug,
    encodeWords,
    displayEncoded,
    mayWriteToFile,
  };
};
