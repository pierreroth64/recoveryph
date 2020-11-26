const _ = require('lodash');

module.exports = (creation) => {
  const { debug, ui } = creation;

  return async function askCode() {
    debug(`asking code`);
    let ok = false;
    while (1) {
      try {
        return await tryAskCode();
      } catch (error) {
        await ui.error(error.message);
      }
    }

    async function tryAskCode() {
      const code = await ui.input(`Enter your code:`, {
        regexString: '^[1-9]{4,}',
        confirm: true,
      });
      return code;
    }
  };
};
