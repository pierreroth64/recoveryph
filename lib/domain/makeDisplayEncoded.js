const _ = require('lodash');

module.exports = (creation) => {
  const { ui } = creation;

  return async function displayEncoded(encoded) {
    const chunks = _.chunk(encoded, 5);
    for (const chunk of chunks) {
      await displaySome(chunk);
    }
  };

  async function displaySome(encoded) {
    const enhanced = encoded.map((e) =>
      e.meta.random ? e.word : ui.enhance(e.word)
    );
    await ui.line(enhanced.join(' '));
  }
};
