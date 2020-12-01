const _ = require('lodash');

module.exports = (creation) => {
  const { debug, ui, givenWordsAlready } = creation;

  return async function askWords(nb) {
    const nbOfWords = Number(nb);

    if (_.isArray(givenWordsAlready)) {
      if (givenWordsAlready.length === nbOfWords) {
        return givenWordsAlready;
      }
      throw new Error(
        `${givenWordsAlready.length} given words while expecting ${nbOfWords}`
      );
    }

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
