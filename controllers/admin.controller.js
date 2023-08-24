/** panggil model customer */
const adminModel = require(`../models/admin.model`)

/** memanggil file crypt.js */
const crypt = require(`../crypt`)

exports.showDataAdmin = async (request, response) => {
    try {
        /** ambil data apoteker menggunakan model */
        let dataAdmin = await adminModel.ambilDataAdmin()
        /** passing ke view */
        let sendData = {
            page: `admin`,
            data: dataAdmin,
            dataUser: request.session.dataUser
        }

        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi untuk menampilkan form apoteker utk tambah data */
exports.showTambahAdmin = async (request, response) => {
    try {
        /** prepare data yang akan di passing ke view */
        let sendData = {
            nama_admin: ``,
            username: ``,
            password: ``,
            page: `form-admin`,
            targetRoute: `/admin/add`,
            deskripsi : crypt.deskripsi,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi untuk memproses data apoteker baru */
exports.prosesTambahData = async (request, response) => {
    try {
        /** membaca data dari yg diisikan user */
        let newData = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)

            
        }

        /** await digunakan untuk eksekusi tamba data */
        await adminModel.tambahAdmin(newData)

        /** redirect ke tampilan data pelanggan */
        return response.redirect(`/admin`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk menampilkan data apoteker yang akan diubah */
exports.showEditAdmin = async (request, response) => {
    try {
        /** mendapatkan id dari apoteker yg akan diubah */
        let id = request.params.id

        /** menampung id ke dalam object */
        let parameter = {
            id: id
        }

        /** ambil data sesuai parameter */
        let admin = await adminModel.ambilDataDenganParameter(parameter)

        /** prepare data yg akan ditampilkan pada view */
        let sendData = {
            nama_admin: admin[0].nama_admin,
            username: admin[0].username,
            password: admin[0].password,
            page: `form-admin`,
            targetRoute: `/admin/edit/${id}`,
            deskripsi: crypt.deskripsi,
            dataUser: request.session.dataUser
        }

        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk memproses data yg diedit */
exports.prosesUbahData = async (request, response) => {
    try {
        /** mendapatkan id yang diubah */
        let id = request.params.id

        /** membungkus id ke bentuk object */
        let parameter = {
            id: id
        }

        /** menampung perubahan data ke dlm object */
        let perubahan = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
           
        }

        /** eksekusi perubahan data  */
        await adminModel.ubahAdmin(perubahan, parameter)

        /** direct ke tampilan data customer */
        return response.redirect(`/admin`)


    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** -------------------------------------
 * create function to handle request
 * with url: /obat/delete with method GET
 */
exports.processDelete = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** call function for delete data table of obat */
        await adminModel.delete(parameter)

        /** redirect to obat's page */
        return response.redirect(`/admin`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

