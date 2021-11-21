const express = require("express")
const router = express.Router()
const controller = require("../controllers/doctorController")

//http://localhost:3000/doctors
// POST adicionar um novo medico
router.post("/", controller.createDoctor)

//http://localhost:3000/doctors
// GET retorna todos os meus medicos
router.get("/", controller.getAllDoctors)

//http://localhost:3000/doctors/:id
// GET by id retornar um medico especifico daquele id
router.get("/:id", controller.getDoctor)

//http://localhost:3000/doctors/:id
// PUT altera integralmente o meu medico
router.put("/:id", controller.updateDoctor)

//http://localhost:3000/doctors/:id/favorite
// PATCH alterar o favorite informando se o medico foi favoritado ou nao
router.patch("/:id/favorite", controller.updateFavorite)

//http://localhost:3000/doctors/:id
//DELETE para deletar o meu medico
router.delete("/:id", controller.deleteDoctor)

module.exports = router