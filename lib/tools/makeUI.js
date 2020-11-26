const _ = require('lodash');
const inquirer = require('inquirer');

module.exports = () => {
  return {
    input,
  };

  async function input(msg, options) {
    const { confirm, regexpString } = _.defaults({}, options, {
      confirm: false,
      regexpString: '.*',
    });
    const answer = confirm
      ? await inputWithConfirmation(msg)
      : await simpleInput(msg);
    if (!new RegExp(regexpString).test(answer)) {
      throw new Error(`your input does not satisfy regexp ${regexpString}`);
    }
    return answer;

    async function inputWithConfirmation(msg) {
      let confirmed = false;
      let answer = '';
      while (!confirmed) {
        answer = await simpleInput(msg);
        confirmed = await askConfirmation(`Do you confirm: ${answer} ?`);
      }
      return answer;
    }

    async function simpleInput(msg) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          message: msg,
          name: 'input',
        },
      ]);
      return answers.input;
    }
  }

  async function askConfirmation(msg) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        message: msg,
        name: 'confirm',
      },
    ]);
    return answers.confirm;
  }
};
