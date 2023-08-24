/** load model's file of telur */
const packModel = require(`../models/pack.model`)

exports.showDatapack = async (request, response) => {
    try {
        /** show data telur menggunakan telurmodel */
        let datapack = await packModel.findAll()

        /** send data to view */
        let sendData = {
            page: `pack`,
            data: datapack,

            /** passing data user yg login dari session */
            dataUser: request.session.dataUser
        }

        /** set view page for this function */
        return response.render(`../views/index`, sendData)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** showaddpage digunakan untuk menampilkan data telur */
exports.showAddPage = (request, response) => {
    let sendData = {
        page: `form-pack`, // page that will be show
        /** set empty data because this is add feature */
        nama_pack: ``,
        harga: ``,
        /** set target route for submit filled data */
        targetRoute: `/pack/add`,

        dataUser: request.session.dataUser
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)
}

/** menampilkan page edit */
exports.showEditPage = async (request, response) => {
    /** read selected ID from URL parameter */
    let selectedID = request.params.id

    /** store selected ID to object "parameter" */
    let parameter = {
        id: selectedID // 'id' is similar as column's name of table
    }

    /** call function for get data from database based on seleced id */
    let selectedData = await packModel.findByCriteria(parameter)

    /** prepare data to send to view page  */
    let sendData = {
        page: `form-pack`, // page that will be show
        /** set each data based on data that will be change */
        nama_pack: selectedData[0].nama_pack,
        harga: selectedData[0].harga,
        /** set target route for submit filled data */
        targetRoute: `/pack/edit/${selectedID}`,

        dataUser: request.session.dataUser
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)

}

/** proses tambah data */
exports.processInsert = async (request, response) => {
    try {
        /** reading obat's data from user that has sent */
        let newPack = {
            nama_pack: request.body.nama_pack,
            harga: request.body.harga
        }

        /** call function for insert to table of obat */
        await packModel.add(newPack)

        /** redirect to obat's page */
        return response.redirect(`/pack`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.prosesupdate = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** reading obat's data from user that has sent */
        let newPack = {
            nama_pack: request.body.nama_pack,
            harga: request.body.harga
        }

        /** call function for update to table of obat */
        await packModel.update(newPack, parameter)

        /** redirect to obat's page */
        return response.redirect(`/pack`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** untuk menghapus data telur */
exports.prosesdelete = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** call function for delete data table of obat */
        await packModel.delete(parameter)

        /** redirect to obat's page */
        return response.redirect(`/pack`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}


