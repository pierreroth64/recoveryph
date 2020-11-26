const _ = require('lodash');
const inquirer = require('inquirer');
const chalk = require('chalk');

module.exports = () => {
  return {
    input,
    error,
    enhance,
    line,
  };

  async function input(msg, options) {
    const { confirm, regexString } = _.defaults({}, options, {
      confirm: false,
      regexString: '.*',
    });
    const answer = confirm
      ? await inputWithConfirmation(msg)
      : await simpleInput(msg);
    if (!new RegExp(regexString).test(answer)) {
      throw new Error(`your input does not satisfy regexp ${regexString}`);
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

  async function error(msg) {
    await line(chalk.red(msg));
  }

  function enhance(msg) {
    return chalk.cyanBright(msg);
  }

  async function line(msg) {
    console.log(msg);
  }
};
