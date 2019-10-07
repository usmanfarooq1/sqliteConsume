#!/usr/bin/env node
const commander = require('commander');
const command = new commander.Command();
const fileHelpers = require('./file_functions');
const dbHelpers = require('./db_functions');
const stringHelper = require('./string_functions')
const utils = require ('./utils')
// console.log(chalk)
command.version('1.0')
command.arguments('<file>')
    .option('-t', 'to create models for database tables ')
    .action((file) => {
        if (process.argv.includes('-t')) {
            fileHelpers.checkIfFileExists(file).then((object) => {
                utils.Log('file existence :', object.message, object.from_function)
                process.stdout.write('5')
                return dbHelpers.createDbConnection(file)
            }).then(object => {
                utils.Log('Database connection :', object.message, object.from_function)
                return dbHelpers.getDbtablesNames(object)
            }).then((object) => {
                utils.Log('Database table names :', object.message, object.from_function)
                return fileHelpers.createModelsDirectory(object)
            }).then((object) => {
                utils.Log('Models folder creation :', object.message, object.from_function)
                return (dbHelpers.getSchemaInfoAllTables(object))
            }).then(object => {
                utils.Log('Extracting schema from table :', object.message, object.from_function)
                return stringHelper.createSchemaModelsString(object)
            }).then(object => {
                utils.Log('Creating schema string for every table :', object.message, object.from_function)
                return fileHelpers.createSchemaFiles(object)
            }).then(object => {
                utils.Log('Creating Files in the Models Folder :', object.message, object.from_function)
            }).catch((object) => {
                console.log(chalk.green(`${chalk.magenta.bold(`Check from function name :`)} ${chalk.red(object.message)} ${chalk.yellow.bold(object.from_function)}`));
            })
        }
    }).parse(process.argv)

//     // command.on('--table', function)
// let arugments = command.parseOptions(process.argv)
// console.log(arugments)
// console.log("hello world")