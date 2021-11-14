const express = require("express")
const router = express.Router()
const controller = require("../controllers/doctorController")

//http://localhost:3000/medicos
// GET retorna todos os meus medicos
router.get("/", controller.getAllDoctors)

//http://localhost:3000/medicos
// POST adicionar um novo medico
router.post("/", controller.createDoctor)

//http://localhost:3000/medicos/:id
// GET by id retornar um medico especifico daquele id
router.get("/:id", controller.getDoctor)

//http://localhost:3000/medicos/:id
// PUT altera integralmente o meu medico
router.put("/:id", controller.updateDoctor)

//http://localhost:3000/movies/:id/watched
// PATCH alterar o favorite informando se o medico foi favoritado ou nao
router.patch("/:id/favorite", controller.updateFavorite)

//http://localhost:3000/medicos/:id
//DELETE para deletar o meu medico
router.delete("/:id", controller.deleteDoctor)

module.exports = router