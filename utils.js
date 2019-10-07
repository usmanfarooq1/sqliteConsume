const chalk = require('chalk');
const utils ={
    Log:(task_descrpitor,message, function_name )=>{
        console.log(chalk.green(`${chalk.magenta.bold(`${task_descrpitor}`)} ${chalk.cyan(message)} ${chalk.green(function_name)}`));
    }
}

module.exports = utils 