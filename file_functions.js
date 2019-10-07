const fs = require('fs');
const process = require('process')
const file_functions = {
    checkIfFileExists: (path) => {
        let check = false;
        return new Promise((resolve, reject) => {
            fs.access(path, fs.F_OK, (err) => {
                if (!err) {
                    resolve({
                        error: false,
                        message: 'Database file exists !',
                        from_function: 'checkIfFileExists'
                    })
                } else {
                    reject({
                        error: true,
                        message: `Error:file doesn't exists or bad File path !`,
                        from_function: 'checkIfFileExists'
                    });
                }
            })
        })
    },
    createModelsDirectory: (object) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(`${process.cwd()}/Models`, (err) => {
                if (err) {
                    reject({
                        ...object,
                        error: true,
                        message: `Error: error creating models folder in the current working directory !`,
                        from_function: 'createModelsDirectory'
                    })
                } else {
                    resolve({
                        ...object,
                        error: false,
                        message: `Successful creation of models folder in the current working directory !`,
                        from_function: 'createModelsDirectory'
                    })
                }
            })
        })
    },
    createSchemaFiles: (object) => {
        return new Promise((resolve, reject) => {
            let promisesArray = object.schemaStrings.map(table => {
                return createASingleFile(table.name, table.schemaString)
            });
            Promise.all(promisesArray).then((data=>{
                resolve({
                    ...object,
                    error: false,
                    from_function: 'createSchemaFiles',
                    message: `Models files create correctly !`

                })
            })).catch(error=>{
                reject({
                    ...object,
                    from_function: 'createSchemaFiles',
                    error: true,
                    message: `Error: creating files in Models folder ! ${error}`
                })
            })
        })

    }

}
function createASingleFile(file_name, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${process.cwd()}/Models/${file_name}.js`, content, (err) => {
            if (err) {
                reject({ message: `Error: ${err.stack} !`, error: true, })
            } else {
                resolve({
                    error: false,
                    message: `file created for the table ${file_name} !`
                })
            }
        })
    })
}

module.exports = file_functions;