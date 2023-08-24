/** memanggil library crypto js */
const crypto = require(`crypto-js`)

/**membuang function untuk enkripsi */
exports.enkripsi = (plainText) => {
    /** membuat secret key */
    let secretkey = `YTTA`

    /** proses enkripsi */
    let result = crypto.AES.encrypt(plainText, secretkey).toString()
    /**AES = advanced encryption standart */

    return result
}

/**membuat fungsi deskripsi */
exports.deskripsi = (chiperText) => {
    /** define secretKey */
    let secretKey = `YTTA`

    /** proses deskripsi */
    let byte = crypto.AES.decrypt(chiperText, secretKey)
    let result = byte.toString(crypto.enc.Utf8)

    return result
}