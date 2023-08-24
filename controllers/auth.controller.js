/** load model apoteker */
const adminModel = require(`../models/admin.model`)

/** load crypt */
const crypt = require(`../crypt`)
const { response } = require("../routes/admin.route")

/** function untuk menampilkan halaman log in */
exports.showLogin = (request, response) => {
    try {
        return response.render(`../views/pages/login`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** function untuk proses authentication */
exports.authentication = async (request, response) => {
    try {
        /** tampung data username dan password yang diisikan */
        let username = request.body.username
        let password = request.body.password
        
        /** cek kecocokan dengan username */
        let result = await adminModel.ambilDataDenganParameter({ username: username })
        console.log(result);

        /** check keberadaan data apoteker */
        if (result.length > 0) {
            /** cek kecocokan passwordnya */
            console.log(`${password} === ${crypt.deskripsi(result[0].password)}`);
            if (password === crypt.deskripsi(result[0].password)) {
                /**LOGIN BERHASIL */
                /** menyimpan data user ke session */
                request.session.dataUser = result[0]

                /** definisi cart di session */
                request.session.cart = []
                
                return response.redirect(`/telur`)
            } else {
                /**login gagal */
                return response.redirect(`/auth`)
            }
        } else {
            /** data apoteker tidak ada */
            return response.redirect(`/auth`)
        }
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** membuat function untuk logout */
exports.logout = async (request, response) => {
    try {
        /** menghapus data user dari session */
        request.session.dataUser = undefined

        /** kembali ke halaman login */
        return response.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
