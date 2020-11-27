#!/usr/bin/env node
const { version } = require('./package.json');
const program = require('commander');
const { bootstrap } = require('./lib');

program
  .command('encode')
  .description('ask for your words and your code and encode it')
  .option(
    '-d, --debug-enabled',
    'when true, activate application level debug messages on the console',
    false
  )
  .option('-n, --nb-of-words [NB_OF_WORDS]', 'number of words to encode', 24)
  .option(
    '-o, --output-file [OUTPUT_FILE]',
    'file where to write encoded output',
    undefined
  )
  .action(async (options) => {
    const {
      askWords,
      askCode,
      debug,
      encodeWords,
      displayEncoded,
      mayWriteToFile,
    } = bootstrap(options);
    const words = await askWords(options.nbOfWords);
    const code = await askCode();
    const encoded = await encodeWords({ words, code });
    debug('words:', words);
    debug('code:', code);
    displayEncoded(encoded);
    await mayWriteToFile(
      options.outputFile,
      encoded.map((e) => e.word).join(' ')
    );
  });

program.version(version).parse(process.argv);

function logErrorAndExit(e, msg) {
  if (msg) {
    console.log(msg);
  }
  console.error(e);
  process.exit(1);
}

process.on('unhandledRejection', (e) => {
  logErrorAndExit(e, 'Ooops! Unhandled rejection');
});
