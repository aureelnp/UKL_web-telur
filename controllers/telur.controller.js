/** load model's file of telur */
const telurModel = require(`../models/telur.model`)

exports.showDatatelur = async (request, response) => {
    try {
        /** show data telur menggunakan telurmodel */
        let dataTelur = await telurModel.findAll()

        /** send data to view */
        let sendData = {
            page: `telur`,
            data: dataTelur,

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
        page: `form-telur`, // page that will be show
        /** set empty data because this is add feature */
        jenis_telur: ``,
        stok: ``,
        harga: ``,
        /** set target route for submit filled data */
        targetRoute: `/telur/add`,

        dataUser: request.session.dataUser
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)
}

/** menampilkan page edit */
exports.showEditPage = async (request, response) => {
    /** read selected ID from URL parameter */
    let selectedID = request.params.id //dari route

    /** store selected ID to object "parameter" */
    let parameter = {
        id: selectedID // 'id' is similar as column's name of table
    }

    /** call function for get data from database based on seleced id */
    let selectedData = await telurModel.findByCriteria(parameter)

    /** prepare data to send to view page  */
    let sendData = {
        page: `form-telur`, // page that will be show
        /** set each data based on data that will be change */
        jenis_telur: selectedData[0].jenis_telur,
        stok: selectedData[0].stok,
        harga: selectedData[0].harga,
        /** set target route for submit filled data */
        targetRoute: `/telur/edit/${selectedID}`,

        dataUser: request.session.dataUser
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)

}

/** proses tambah data */
exports.processInsert = async (request, response) => {
    try {
        /** reading obat's data from user that has sent */
        let newTelur = {
            jenis_telur: request.body.jenis_telur,
            stok: request.body.stok,
            harga: request.body.harga
        }

        /** call function for insert to table of obat */
        await telurModel.add(newTelur)

        /** redirect to obat's page */
        return response.redirect(`/telur`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.processUpdate = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** reading obat's data from user that has sent */
        let newTelur = {
            jenis_telur: request.body.jenis_telur,
            stok: request.body.stok,
            harga: request.body.harga
        }

        /** call function for update to table of obat */
        await telurModel.update(newTelur, parameter)

        /** redirect to obat's page */
        return response.redirect(`/telur`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** untuk menghapus data telur */
exports.processDelete = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** call function for delete data table of obat */
        await telurModel.delete(parameter)

        /** redirect to obat's page */
        return response.redirect(`/telur`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}


