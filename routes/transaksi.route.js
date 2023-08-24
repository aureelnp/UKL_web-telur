/** panggil si express */
const express = require(`express`)

/** buat object dari express */
const app = express()

/** ijin membaca data dari request.body */
app.use(express.urlencoded({ extended: true }))

/** panggil controller transaksi */
const transaksiController = require(`../Controllers/transaksi.controller`)

/** middlewear untuk autorizathion */
const authorization = require(`../middleware/authorization`)

/**reoute untuk menampilkan form transaksi */
app.get(`/add`, authorization.cekUser,  transaksiController.showFormTransaksi)

/** route untuk menyimpan data transaksi */
app.post(`/add`, authorization.cekUser,  transaksiController.simpanTransaksi)

/** rpute untuk menampilkan data transaksi */
app.get(`/`, authorization.cekUser,  transaksiController.showTransaksi)

/** route untuk menghapus data transaksi */
app.get(`/:id` , authorization.cekUser,  transaksiController.hapusTransaksi)

/** exports object app */
module.exports = app