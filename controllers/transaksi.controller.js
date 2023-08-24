/** memanggil model obat */
const telurModel = require(`../models/telur.model`)

const adminModel = require(`../models/admin.model`)

/** model customer */
const memberModel = require(`../models/member.model`)

/** memanggil model transaksi */
const transaksiModel = require(`../models/transaksi.model`)

/** memanggil detail transaksi */
const detailModel = require(`../models/detail.transaksi.model`)

const packModel = require(`../models/pack.model`)

const { request, response } = require("../routes/transaksi.route")

/** membuat fungsi menampilkan form transaksi */
exports.showFormTransaksi = async (request, response) => {
    try {
        /** ambil data obat */
        let telur = await telurModel.findAll()
        let pack = await packModel.findAll()

        /** ambil data customer */
        let member = await memberModel.ambilDataMember()

        /** prepare data yang akan di passing ke view */
        let sendData = {
            datatelur: telur,
            dataMember: member,
            dataPack: pack,
            page: `form-transaksi`,
            tgl_transaksi: ``,
            dataTelurString: JSON.stringify(telur),
            dataPackString: JSON.stringify(pack), //string
            // javascript Object notation =JSON
            dataUser: request.session.dataUser,
            cart: request.session.cart

        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** membuat fungsi untuk menambahkan obat ke keranjang/cart */
exports.addToCart = async (request, response) => {
    try {
        /** dapetin data obat bedasarkan id obat yg dikirimkan *////
        let selectedTelur = await telurModel.findByCriteria({
            id: request.body.id_telur
        })
        let selectedPack = await packModel.findByCriteria({
            id: request.body.id_pack
        })
        /** tampung / receive data yg dikirimkan */
        let storeData = {
            id_telur: request.body.id_telur,
            jenis_telur: selectedTelur[0].jenis_telur, ///
            jumlah_telur: request.body.jumlah_telur,
            harga_telur: request.body.harga_telur,
            id_pack: request.body.id_pack,
            nama_pack: selectedPack[0].nama_pack,
            jumlah_pack: request.body.jumlah_pack,
            harga_pack: request.body.harga_pack


        }

        /** masukkan data ke keranjang menggunakan session */
        request.session.cart.push(storeData) //menambahkan data ke dalam array
        /** push = menambah data ke dalam array */

        /**direct ke halaman form-transaksi */
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat function utk menghapus data item pada cart (keranjang
exports.hapusCart = async (request, response) => {
    try {
        // ambil seluruh data crt
        let cart = request.session.cart

        // ambil id obat
        let id_telur = request.params.id

        // cari tau posisi index dari data yg akan dihps
        let index = cart.findIndex(item => item.id_telur == id_telur)

        // hapus data sesuai index yag ditemukan
        cart.splice(index, 1)

        /** kembalikan data cart ke dalam session */
        request.session.cart = cart

        /** direct ke alaman form-transaksi */
        return response.redirect(`/transaksi/add`)

        // splice digunakan untuk menghapus data pd array
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** function untuk menyimpan data transaksi */
exports.simpanTransaksi = async (request, response) => {
    try {
        /** tampung data yg dikirimkan */
        let newTransaksi = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_member: request.body.id_member,
            id_admin: request.session.dataUser.id
        }

        /** simpan transaksi */
        let resultTransaksi = await transaksiModel.add(newTransaksi)

        /** menampung isi cart */
        let cart = request.session.cart

        for (let i = 0; i < cart.length; i++) {
            /** hapus data atau key nama_obat dari cart */
            delete cart[i].jenis_telur
            delete cart[i].nama_pack


            /** tambah key id_transaksi ke dalam cart */
            cart[i].id_transaksi = resultTransaksi.insertId

            /** eksekusi simpan cart ke detail_transaksi */
            await detailModel.add(cart[i])
        }

        /** hapus cart nya ksongkan */
        request.session.cart = []

        /** direct ke halaman form transaksi lagi */
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** membuat fungsi untuk menampilkan data transaksi */
exports.showTransaksi = async (request, response) => {
    try {
        /** ambil data transaksi */
        let transaksi = await transaksiModel.findAll()

        /** sisipin data detail dari setiap transaksi */
        for (let i = 0; i < transaksi.length; i++) {
            /** ambil id transaksi */
            let id = transaksi[i].id

            /** ambil data detail nya sesuai id */
            let detail = await detailModel.findByCriteria({ id_transaksi: id })

            /** sisipin detail ke transaksi nya  */
            transaksi[i].detail = detail

        }

        /** prepare data yg akan dikirimkan ke view */
        let sendData = {
            page: `transaksi`,
            dataUser: request.session.dataUser,
            transaksi: transaksi
        }

        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** menghapus data transaksi  */
exports.hapusTransaksi = async (request, response) => {
    try {
        /** menampung data id yg akan dihapus */
        let id = request.params.id

        /** menghapus data detail transaksi dulu */
        await detailModel.delete({ id_transaksi: id })

        /** menghapus data transaksi  */
        await transaksiModel.delete({ id: id })

        /** kembali lagi ke halaman transaksi */
        return response.redirect(`/transaksi`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}