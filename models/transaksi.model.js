/** model file for obat contains CRUD process */

/** call object 'connection'
 * from config.js
 */
 const connection = require(`../config`)

 /** set table name to manage in this model file */
 const tableName = `transaksi`
 
 /** ----------------------------------------------------------------------- 
  * create and export 
  * function to get data from table */
 exports.findAll = () => {
     return new Promise((resolve, rejected) => {
         /** define query to get all data */
         let query = `select transaksi.*, member.nama_member,
         admin.nama_admin from ${tableName} 
         join admin on admin.id = transaksi.id_admin 
         join member on transaksi.id_member = member.id`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 
 /** * function to get data from table with specific criteria */
 exports.findByCriteria = (parameter) => {
     return new Promise((resolve, rejected) => {
         
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")
 
         /** define query to get all data */
         let query = `select * from ${tableName} where ${params}`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 
 /** function to insert new data to table */
 exports.add = (dataObject) => {
     return new Promise((resolve, rejected) => {
        
         /** ----------------------------------------------
          * arrange list of dataObject's key as string */
         let columns = Object.keys(dataObject).join()

         let values = Object.values(dataObject)
             .map(value => `"${value}"`).join()
 
         /** create query for insert */
         let query = `insert into ${tableName} (${columns}) values (${values})`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error.message)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 
 /**function to update data of table */
 exports.update = (dataObject, parameter) => {
     return new Promise((resolve, rejected) => {
        
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")
        
         /** create query for update */
         let query = `update ${tableName} set ${updateData} where ${params}`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error.message)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 
 /**function to delete data of table */
 exports.delete = (parameter) => {
     return new Promise((resolve, rejected) => {
        
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")
         /** result:
          * params = ' id="1" '
          * ------------------------------------------------
          */
 
         /** create query for delete */
         let query = `delete from ${tableName} where ${params}`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error.message)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 