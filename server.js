/** load library express */
const express = require(`express`)

/** instance "app" object */
const app = express()

/** define port for the server */
const PORT = `8000`

/** set view engine to ejs */
app.set(`view engine`, `ejs`)

// /** load library express-session */
const session = require(`express-session`)

/** load routes */
app.use(session({
    secret: `I Love Javascript`,
    resave: false,
    saveUninitialized: false
}))

const telur = require(`./routes/telur.route`)
const pack = require(`./routes/pack.route`)
const member = require(`./routes/member.route`)
const admin = require(`./routes/admin.route`)
const auth = require (`./routes/auth.route`)
const transaksi = require(`./routes/transaksi.route`)
const cart = require(`./routes/cart.route`)


/** define prefix for route obat */
app.use(`/telur`, telur)

/** define prefix for route obat */
app.use(`/pack`, pack)

/** define prefix for route obat */
app.use(`/member`, member)

/** define prefix for route obat */
app.use(`/admin`, admin)

/** define prefix for route obat */
app.use(`/transaksi`, transaksi)

/** define prefix cart */
app.use(`/cart`, cart)

/** define prefix cart */
app.use(`/auth`, auth)

/** running web server based on defined PORT */
app.listen(PORT, () => {
    console.log(`Server telur is running on port ${PORT}`);
})

