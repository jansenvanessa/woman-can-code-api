const Doctor = require("../models/Doctor")

const createDoctor = async (req, res) => {
    const { name, crm, specialty, clinic, phone, favorite } = req.body
    try {
        const doctor = await Doctor.create({ name, crm, specialty, clinic, phone, favorite })
        console.log(`Seu médico ${doctor.name} foi cadastrado`)
        res.status(201).send(doctor)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getAllDoctors = async (req, res) => {
    const { favorite = false } = req.query
    try {
        const where = favorite ? { where: { favorite } } : {}
        const doctors = await Doctor.findAll({
            where,
            order: [['id', 'ASC']] // para o inverso trocar ASC por DESC
        })
        if (doctors && doctors.length > 0) {
            res.status(200).send(doctors)
        } else {
            res.status(204).send()
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getDoctor = async (req, res) => {
    const doctorId = req.params.id
    try {
        const doctor = await Doctor.findOne({
            where: { id: doctorId }
        })
        if (doctor) {
            res.status(200).send(doctor)
        } else {
            res.status(404).send({ message: `medico de id ${doctorId} nao foi encontrado na base` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

}

const updateDoctor = async (req, res) => {
    const doctorId = req.params.id
    const { name, crm, specialty, clinic, phone, favorite } = req.body
    try {
        const rowsUpdated = await Doctor.update({ name, crm, specialty, clinic, phone, favorite }, {
            where: { id: doctorId }
        })
        if (rowsUpdated && rowsUpdated[0] > 0) {
            res.status(200).send({ message: "Medico alterado com sucesso" })
        } else {
            res.status(404).send({ message: "Medico nao encontrado para alterar" })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const updateFavorite = async (req, res) => {
    const doctorId = req.params.id
    const favorite = req.body.favorite
    try {
        const updatedRows = await Doctor.update({ favorite }, { where: { id: doctorId }})
        if (updatedRows && updatedRows[0] > 0){
            res.status(200).send({ message: `${updatedRows[0]} médico(s) foi atualizado com a informação de favorito.` })
        } else {
            res.status(404).send({ message: `Médico com o id ${doctorId} não encontrado.`})
        }
    } catch(error){
        res.status(500).send({message: error.message})
    }
}

const deleteDoctor = async (req, res) => {
    const doctorId = req.params.id
    try {
        const rowDeleted = await Doctor.destroy( { where: { id: doctorId }})
        if (rowDeleted){
            res.status(200).send( { message: `${rowDeleted} médico deletado com sucesso.`} )
        } else {
            res.status(404).send({ message: `Médico com o id ${doctorId} não encontrado` })
        }
    } catch(error){
        res.status(500).send({ message: error.message})
    }
}

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctor,
    updateDoctor,
    updateFavorite,
    deleteDoctor
}