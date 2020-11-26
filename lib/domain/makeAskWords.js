const _ = require('lodash');

module.exports = (creation) => {
  const { debug, ui } = creation;

  return async function askWords(nbOfWords) {
    debug(`asking ${nbOfWords} words`);
    const words = [];
    for (const n of _.range(nbOfWords)) {
      const word = await ui.input(`Enter word ${n + 1}/${nbOfWords}:`, {
        confirm: true,
      });
      words.push(word);
    }
    return words;
  };
};
