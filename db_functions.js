const sql = require('sqlite3');
const db_functions = {
    createDbConnection: (path) => {
        return new Promise((resolve, reject) => {
            let db = {};
            try {
                db = new sql.Database(path)
                resolve({
                    error: false,
                    DATABASE: db,
                    message: 'Database connection created',
                    from_function: 'createDbConnection'
                })
            } catch (err) {
                reject({
                    error: true,
                    DATABASE: null,
                    message: 'Error: error creating database connection',
                    from_function: 'createDbConnection'
                })
            }
        })
    },
    getDbtablesNames: (object) => {
        let db = object.DATABASE;
        // console.log(`daaaaaaaaaa`,db)
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all(`SELECT * FROM sqlite_master`, (error, result) => {
                    if (error) reject({ ...object, message: error.stack, error: true, from_function: 'getDbtablesNames' })
                    // console.log(error,result)
                    if (result.length) {
                        let tableNames = extractTableNames(result);
                        resolve({
                            ...object,
                            error: false,
                            message: `extracted database tables name from sqlite_master table`,
                            tableNames: tableNames,
                            from_function: 'getDbtablesNames'
                        });
                    } else {
                        reject({
                            ...object,
                            message: `no tables in the linked database`,
                            error: true,
                            from_function: 'getDbtablesNames'
                        })
                    }
                })
            })
        })

    },
    getSchemaInfoAllTables: (object) => {
        let promises = [];
        object.tableNames.forEach(element => {
            promises.push(getSchemaInfo(object.DATABASE, element));
        });

        return new Promise((resolve, reject) => {
            Promise.all(promises)
                .then(data => {
                    // console.log(data)
                    resolve({
                        ...object,
                        tablesMetaData: data,
                        error: false,
                        from_function: 'getSchemaInfoAllTables',
                        message: `Schema extracted from all the tables correctly !`
                    });

                }).catch(error => {
                    // console.log(error)
                    reject({
                        ...object,
                        tablesMetaData: null,
                        from_function: 'getSchemaInfoAllTables',
                        error: true,
                        message: `Error: extracting check the data from the function getSchemaInfo ! ${error}`
                    })
                })

        })

    }
}

function getSchemaInfo(db, name) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`PRAGMA table_info(${name})`, (error, result) => {
                if (error) {
                    reject({ message: `Error: ${error.stack} !`, error: true, })
                } else {
                    let obj = {};
                    obj[name] = result;
                    obj.error = false;
                    obj.message = `schema extracted from table ${name}`
                    resolve(obj)
                }
            });
        });
    });
}

function extractTableNames(result_array) {
    return result_array.filter((table=>{
        if(table.type==='table'){
            return table;
        }
    })).map((entry) => {
            return entry.tbl_name;
    })
}
module.exports = db_functions;