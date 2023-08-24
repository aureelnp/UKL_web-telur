/** panggil express */
const express = require(`express`)

/** buat object `app` */
const app = express()

/** minta izin untuk membaca data yang dikirimkan melalui form */
app.use(express.urlencoded({ extended: true }))

/** load authorization */
const authorization = require(`../middleware/authorization`)

//panggil controller customer
const memberController = require(`../controllers/member.controller`)

/** define route untuk access data customer */
app.get(`/`, authorization.cekUser, memberController.showDataMember)

/** define route untuk nampilin form-customer */
app.get(`/add`, authorization.cekUser,  memberController.showTambahMember)

/** define route untuk memproses tambah data customer */
app.post(`/add`, authorization.cekUser,  memberController.prosesTambahData)

/** define route untuk nampilin form customer dgn data yg akan diubah */
app.get(`/edit/:id`, authorization.cekUser,  memberController.showEditMember)

/** define route untuk memproses perubahan data */
app.post(`/edit/:id`,authorization.cekUser,  memberController.prosesUbahData)

/** create route for process delete customer */
app.get("/delete/:id", authorization.cekUser,  memberController.processDelete)
/** :id -> name of paramter URL */

/** export object app */
module.exports = app

