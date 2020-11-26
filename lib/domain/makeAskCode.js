const _ = require('lodash');

module.exports = (creation) => {
  const { debug, ui } = creation;

  return async function askCode() {
    debug(`asking code`);
    const code = await ui.input(`Enter your code:`, {
      regex: '.*',
      confirm: true,
    });
    return code;
  };
};
