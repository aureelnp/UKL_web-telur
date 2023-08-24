/** panggil model customer */
const memberModel = require(`../models/member.model`)
/** request => melihat data customer 
 * response => menampilkan data customer melalui view 
 */

exports.showDataMember = async (request, response) => {
    try {
        /** ambil data customer menggunakan model */
        let dataMember = await memberModel.ambilDataMember()
        /** passing ke view */
        let sendData = {
            page: `member`,
            data: dataMember,
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

/** fungsi untuk menampilkan form customer utk tambah data */
exports.showTambahMember = async (request, response) => {
    try {
        /** prepare data yang akan di passing ke view */
        let sendData = {
            nama_member: ``,
            alamat: ``,
            telepon: ``,
            page: `form-member`,
            targetRoute: `/member/add`,

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

/** fungsi untuk memproses data customer baru */
exports.prosesTambahData = async (request, response) => {
    try {
        /** membaca data dari yg diisikan user */
        let newData = {
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }

        /** await digunakan untuk eksekusi tamba data */
        await memberModel.tambahMember(newData)

        /** redirect ke tampilan data pelanggan */
        return response.redirect(`/member`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk menampilkan data customer yang akan diubah */
exports.showEditMember = async (request, response) => {
    try {
        /** mendapatkan id dari customer yg akan diubah */
        let id = request.params.id

        /** menampung id ke dalam object */
        let parameter = {
            id: id
        }

        /** ambil data sesuai parameter */
        let member = await memberModel.ambilDataDenganParameter(parameter)

        /** prepare data yg akan ditampilkan pada view */
        let sendData = {
            nama_member: member[0].nama_member,
            alamat: member[0].alamat,
            telepon: member[0].telepon,
            page: `form-member`,
            targetRoute: `/member/edit/${id}`,

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
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }

        /** eksekusi perubahan data  */
        await memberModel.ubahMember(perubahan, parameter)

        /** direct ke tampilan data customer */
        return response.redirect(`/member`)


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
        await memberModel.delete(parameter)

        /** redirect to obat's page */
        return response.redirect(`/member`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}