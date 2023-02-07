/** load model for `admin's` table */
const adminModel = require(`../models/index`).admin

/** load Operation from Sequelize */
const Op = require(`sequelize`).Op

const md5 = require(`md5`) 
let password = md5(`password`)
/** result: 5f4dcc3b5aa765d61d8327deb882cf99 */


/** create function for read all data */
exports.getAllAdmin = async (request, response) => {
    /** call findAll() to get all data */
    let admins = await adminModel.findAll()
    return response.json({
        success: true,
        data: admins,
        message: `All Admin have been loaded`
    })
}

/** create function for filter */
exports.findAdmin = async (request, response) => {
/** define keyword to find data */ 
let keyword = request.body.keyword

    /** call findAll() within where clause and operation
    * to find data based on keyword */
    let admins = await adminModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { gender: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: admins,
        message: `All Admins have been loaded`
    })
}

/** create function for add new admin */
exports.addAdmin = (request, response) => {
/** prepare data from request */ let newAdmin = {
        name: request.body.name,
        contact: request.body.contact,
        address: request.body.address,
        username: request.body.username,
        password: md5 (request.body.password)

    }

    /** execute inserting data to admin's table */
    adminModel.create(newAdmin)
        .then(result => {
            /** if insert's process success */
            return response.json({
                success: true, data: result,
                message: `New admin has been inserted`
            })
        })
        .catch(error => {
            /** if insert's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** create function for update admin */
exports.updateAdmin = (request, response) => {
    /** prepare data that has been changed */
    let dataAdmin = {
        name: request.body.name,
        contact: request.body.contact,
        address: request.body.address,
        username: request.body.username,
        password: request.body.password
    }

    /** define id admin that will be update */
    let idAdmin = request.params.id

    /** execute update data based on defined id admin */
    adminModel.update(dataAdmin, { where: { id: idAdmin } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data admin has been updated`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false, message: error.message
            })
        })
}

/** create function for delete data */
exports.deleteAdmin = (request, response) => {
    /** define id admin that will be update */
    let idAdmin = request.params.id

    /** execute delete data based on defined id admin */
    adminModel.destroy({ where: { id: idAdmin } })
        .then(result => {
    /** if update's process success */ return response.json({
            success: true,
            message: `Data admin has been updated`
        })
        })
        .catch(error => {
    /** if update's process fail */ return response.json({
            success: false,
            message: error.message
        })
        })
}








