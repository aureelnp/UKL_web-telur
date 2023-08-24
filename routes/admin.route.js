/** panggil express */
const express = require(`express`)

/** buat object `app` */
const app = express()

/** minta izin untuk membaca data yang dikirimkan melalui form */
app.use(express.urlencoded({ extended: true }))

//panggil controller customer
const adminController = require(`../controllers/admin.controller`)

/** load authorization from middleware */
const authorization = require(`../middleware/authorization`)

/** define route untuk access data customer */
app.get(`/`, authorization.cekUser, 
adminController.showDataAdmin)

/** define route untuk nampilin form-customer */
app.get(`/add`, authorization.cekUser, 
adminController.showTambahAdmin)

/** define route untuk memproses tambah data customer */
app.post(`/add`, authorization.cekUser, 
adminController.prosesTambahData)

/** define route untuk nampilin form customer dgn data yg akan diubah */
app.get(`/edit/:id`, authorization.cekUser, 
adminController.showEditAdmin)

/** define route untuk memproses perubahan data */
app.post(`/edit/:id`, authorization.cekUser, 
adminController.prosesUbahData)

/** create route for process delete customer */
app.get("/delete/:id", authorization.cekUser, 
adminController.processDelete)
/** :id -> name of paramter URL */

/** export object app */
module.exports = app
