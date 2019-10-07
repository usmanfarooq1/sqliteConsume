const string_functions = {
    createSchemaModelsString: (object) => {
        // console.log(object.tablesMetaData[0].contacts[0].dfflt_value)
        return new Promise((resolve, reject) => {
            try {
                object.schemaStrings = [];
                if (object.tablesMetaData) {
                    object.tableNames.forEach((element, index) => {
                        if (object.tablesMetaData[index][element]) {
                            object.schemaStrings.push({ name: element, schemaString: createSingleModelString(element, object.tablesMetaData[index][element]) });
                        }
                    });
                }
                resolve({
                    ...object,
                    from_function: 'createSchemaModelsString',
                    error: false,
                    message: `Schema Strings generated successfully !`
                })
            } catch (error) {
                reject({
                    ...object,
                    schemaStrings: [],
                    from_function: 'createSchemaModelsString',
                    error: true,
                    message: `Error: error generated while creating schema strings ! ${error}`
                })
            }
        });

        // console.log(object.tablesMetaData[0])
    }
}
function createSingleModelString(table_name, schema) {
    let schemaStr = `const ${table_name.toUpperCase()} = { \ntype:"table",\n columns:[\n`;
    schema.forEach(row => {
        schemaStr = schemaStr + `{
            NAME:${row.name},
            TYPE:${row.type},
            NOTNULL: ${(row.notnull) ? true : false}, 
            DEFAULTVALUE:${row.dflt_value},
            CONSTRAINTS:{
                PRIMARY_KEY : ${row.pk ? true : false},
                SECONDARY_KEY:${false} 
            }    
        }, `;
        //   let keys =  Object.entries(row)
        //   keys.forEach(row_keys=>{
        //       column_name:  row_keys.name
        //   })
    });
    schemaStr = schemaStr + `]
}
module.exports =${table_name.toUpperCase()};`;
    return schemaStr;
}
module.exports = string_functions;