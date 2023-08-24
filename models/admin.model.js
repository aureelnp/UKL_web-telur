/** function untuk CRUD */

/** load dulu connection dari config */
const connection = require(`../config`)

/** set table name to manage in this model file */
const tablenama = `admin`

/** function untuk ambil data apoteker */
exports.ambilDataAdmin = () => {
    return new Promise((resolve, rejected) => {
        /** bikin query untuk ambil data */
        let query = `select * from admin`

        /** jalankan query-nya */
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

/** function untuk ambil data berdasarkan parameter khusus */
exports.ambilDataDenganParameter = (parameter) => {
    return new Promise((resolve, reject) => {
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        let query = `select * from admin where ${params}`

        /** jalankan query-nya */
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

/** function utk menambah data apoteker baru  */
exports.tambahAdmin = (admin) => {
    return new Promise((resolve, reject) => {
        /** ambil key dari object apoteker */
        let key = Object
            .keys(admin) // [key1,key2,dst]
            .join() // "key1,key2,dst"

        /** ambil value dari object apoteker */
        let value = Object
            .keys(admin) // [key1,key2,dst]
            .map(item => `"${admin[item]}"`) // untuk scanning, ["value1","value2",dst]
            .join() // `"values1","value2",dst`

        let query = `insert into admin (${key}) values (${value})`

        /** jalankan query-nya */
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

/** buat fungsi utk update data apoteker */
exports.ubahAdmin = (data, parameter) => {
    return new Promise((resolve, reject) => {
        /** menyusun string utk query bagian
         * perubahan data
         */
        let perubahanData = Object
            .keys(data) // [nama_apoteker, username]
            .map(item => `${item}="${data[item]}"`)
            .join()

        /** menyusun string utk query bagian
         * penentu data yg akan diubah
         */
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        /** susun query */
        let query = `update admin set ${perubahanData} where ${params}`

        /** jalankan query-nya */
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

/** ----------------------------------------------------------------------- 
  * create and export 
  * function to delete data of table */
exports.delete = (parameter) => {
    return new Promise((resolve, rejected) => {
        /** ----------------------------------------------
         * arrange list of parameter's keys and its value as string */
        let params = Object
            .keys(parameter)
            .map(key => `${key}="${parameter[key]}"`)
            .join(" and ")
        /** create query for delete */
        let query = `delete from ${tablenama} where ${params}`

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


