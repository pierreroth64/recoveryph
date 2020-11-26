const _ = require('lodash');

module.exports = (creation) => {
  const { debug, randomWord } = creation;

  return async function encodeWords({ code, words }) {
    debug(`encodings ${words.length} words with code ${code}...`);
    const digitsGenerator = createDigitsGenerator(code);
    const encoded = [];
    for (const word of words) {
      const digit = digitsGenerator.next().value;
      const random = generateNRandomWords(digit);
      encoded.push({
        word,
        meta: {
          random: false,
        },
      });
      encoded.push(
        ...random.map((r) => ({
          word: r,
          meta: {
            random: true,
          },
        }))
      );
      debug(
        `pushed: initial word: "${word}" with ${random.length} random words: ${random}`
      );
    }
    return encoded;
  };

  function* createDigitsGenerator(code) {
    let index = 0;
    const digits = code.split('').map((d) => Number(d));
    while (1) {
      const digit = digits[index % digits.length];
      index++;
      yield digit;
    }
  }

  function generateNRandomWords(n) {
    debug(`generating ${n} random words...`);
    return _.range(n).map(() => randomWord());
  }
};
