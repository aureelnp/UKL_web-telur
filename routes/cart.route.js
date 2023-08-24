/** panggil express */
const express = require(`express`)

/** bikin object express */
const app = express()

/** minta ijin untuk membaca data */
app.use(express.urlencoded({extended: true}))

/** panggil controller transaksi */
const transaksiController = require (`../Controllers/transaksi.controller`)

/** panggil authorization dr middleware */
const autorizathion = require (`../middleware/authorization`)

/** definisikan route untuk menambah isi cart */
app.post(`/`,  transaksiController.addToCart)

/** definisikan route untuk menghapus item pada cart */
app.get(`/:id`,  transaksiController.hapusCart)

/** export object app */
module.exports = app