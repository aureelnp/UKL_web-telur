/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load obat controller */
const telurController = require(`../controllers/telur.controller`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

// /** load authorization */
const authorization = require(`../middleware/authorization`)

/** create route untuk akses data telur */
app.get("/", authorization.cekUser, telurController.showDatatelur)

// /** create route for show add obat view */
app.get("/add", authorization.cekUser,  telurController.showAddPage)

// /** create route for show edit obat view */
app.get("/edit/:id", authorization.cekUser,  telurController.showEditPage)

// /** create route for process of add new obat */
app.post("/add", authorization.cekUser,  telurController.processInsert)

// /** create route for process edit obat */
app.post("/edit/:id", authorization.cekUser,  telurController.processUpdate)

// /** create route for process delete obat */
app.get("/delete/:id", authorization.cekUser,  telurController.processDelete)

/** export object "app" to another file */
module.exports = app


