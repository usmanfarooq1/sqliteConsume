let sql= require('sqlite3').verbose();
let db = new sql.Database('/home/markhor/D_Drive/node/sql/chinook.db');
// console.log(db)
// let sqlite_data_types = ['INTEGER', 'TEXT', 'REAL', 'NULL', 'BLOB'];
// db.serialize(()=>{
//     // let create_table_result = createTable('names',{
//     //   v_name: 'text',
//     //   n_name : 'text'  
//     // });
//     // if(!create_table_result.error){
//         // PRAGMA table_info(contacts)
        // 
        db.all(`PRAGMA table_info(albums)`,(error,result )=>{
            if(error){
                console.log(error);
            }else{
                console.log(result);
            }
        });
//     // }
    
//     // db.run(`CREATE TABLE lorem (
        
//     //     Ipsum TEXT 
//     // )`);

//     // let stmt = `INSERT INTO contacts (contact_id,first_name) VALUES  (`;
//     // for (var i = 0; i < 10; i++) {
//         // stmt= stmt+1+`,"usman"`;
//         // stmt.run("first_name " + '');
//     // }
//     // stmt= stmt+`)`;
// //     // db.run(stmt)
// //     let name = 'usman'
// //     var stmt = db.prepare(`INSERT INTO contacts VALUES (?,?)`);
// //     for (var i = 10; i < 20; i++) {
// //         stmt.run(`contact_id ` + i);
// //         stmt.run(`first_name "${name}"`);
// //     }
// // console.log(stmt)
// //     stmt.finalize();
// //     console.log(stmt)
//     // db.each("SELECT * FROM contacts", function(err, row) {
//     //     console.log(row);
//     // });
// })
// // console.log(db)
// db.close();




// function createTable(name, options){
//     let queryString= `Create TABLE ${name} (`;
//     let values_names= Object.keys(options);
//     let check=true;
//     values_names.forEach((value, index)=>{
//         if(typeof value === 'string' && sqlite_data_types.includes(options[value].toUpperCase())){
//             if(index!=values_names.length-1){
//                 // let all_constraint_object = options[value];
//                 // all_constraint_object
//                 queryString= queryString+ value + ` `+options[value]+ `,`; 
//             }else{
//                 queryString= queryString+ value + ` `+options[value]+ `)`;
//             }
//         }else{
//             check=false;
//         }
//     });
//     if(check){
//         return {error:false, q_string:queryString};
//     }else{
//         return {error:true, q_string:''};
//     }
    
//     // get the all the name of the columns from the object
// }

// function getDBInfoQuery(){
//        return `SELECT name FROM sqlite_master
//        WHERE type='table'
//        ORDER BY name;`
// }
// function insertIntoTable(name, data){

// }