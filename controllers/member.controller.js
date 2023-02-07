const { request, response } = require('express')

/** load model dari tabel member */
const memberModel = require('../models/index').member

/** load operation dari sequelize */
const Op = require('sequelize').Op

/** load library 'path' and 'filestream' */
const path = require(`path`)
const fs = require(`fs`)
const { dirname } = require('path')

/** load function from `upload-cover`
*	single(`cover`) means just upload one file
*	with request name `cover`
*/
const upload = require(`./upload-image`).single(`image`)



/** membuat function for untuk membaca semua data */
exports.getAllMember = async (request, response) => {
    /** memanggil findAll() to get all data */
    let member = await memberModel.findAll()
    return response.json({
        success: true,
        data: member,
        message: 'All Member have been loaded'
    })
}

/** membuat function for filter */
exports.findMember = async (request, response) => {
    /** define keyword to find data */
    let keyword = request.body.keyword

    /** memanggil findAll() within where clause and operasi
     * to find database on keyword */
    let members = await memberModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { gender: { [Op.substring]: keyword } },
                { contact: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } }
            ]
        }
    })

    return response.json({
        success: true,
        data: members,
        message: 'All Member have been loaded'
    })
}

/** membuat function dari add new member */
exports.addMember = (request, response) => {
    /** run function upload */
    upload(request, response, async error => {
        /** check if there are errorwhen upload */
        if (error) {
            return response.json({ message: error })
        }

        /** check if file is empty */
        if (!request.file) {
            return response.json({
                message: `Nothing to Upload`
            })
        }

        /** siapkankan data dari request */
        let newMember = {
            name: request.body.name,
            address: request.body.address,
            gender: request.body.gender,
            contact: request.body.contact,
            image: request.file.filename
        }

        /**eksekusi inserting data to member table */
        memberModel.create(newMember)
            .then(result => {
                /** if insert's process success */
                return response.json({
                    success: true,
                    data: result,
                    message: `New member has been inserted`
                })
            })
            .catch(error => {
                /** if insert's process fail */
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })

}

/** create function for update member */
exports.updateMember = (request, response) => {
    /** run upload function */
    upload(request, response, async error => {
        /** check if there are error when upload */
        if (error) {
            return response.json({ message: error })
        }

        /** store selected book ID that will update */
        let id = request.params.id

        /** prepare data that has been changed */
        let dataMember = {
            name: request.body.name,
            address: request.body.address,
            gender: request.body.gender,
            contact: request.body.contact
            
        }

        /** check if file is not empty,
* it means update data within reupload file
*/
        if (request.file) {
            /** get selected book's data */
            const selectedMember = await memberModel.findOne({
                where: { id: id }
            })

            /** get old filename of cover file */
            const oldImage = selectedMember.image  ? selectedMember.image : ""

            /** prepare path of old cover to delete file */
            const pathImage = path.join(dirname, `../image`, oldImageMember)

            /** check file existence */
            if (fs.existsSync(pathImage)) {
                /** delete old cover file */
                fs.unlink(pathImage, error =>
                    console.log(error))
            }
            /** add new cover filename to book object */
            member.image = request.file.filename
        }

        /** execute update data based on defined id member */
        memberModel.update(dataMember, { where: { id: id } })
            .then(result => {
                /** if update's process success */
                return response.json({
                    success: true,
                    message: `Data member has been updated`
                })
            })
            .catch(error => {
                /** if update's process fail */
                return response.json({
                    success: false, 
                    message: error.message
                })
            })
    })
}

/** create function for delete data */
exports.deleteMember = async(request, response) => {
    /** define id member that will be update */
    const id = request.params.id

    /** -- delete cover file -- */
    /** get selected book's data */
    const member = await memberModel.findOne({ where: { id: id } })
    /** get old filename of cover file */
    const oldImageMember = member.image ? member.image : ""

    /** prepare path of old cover to delete file */
    const pathImage = path.join(__dirname, `../image`, oldImageMember)

    /** check file existence */
    if (fs.existsSync(pathImage)) {
        /** delete old cover file */
        fs.unlink(pathImage, error => console.log(error))
    }
    /** -- end of delete cover file -- */


    /** execute delete data based on defined id member */
    memberModel.destroy({ where: { id: id } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data member has been deleted`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}



