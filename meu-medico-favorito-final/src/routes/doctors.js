const express = require("express");
const router = express.Router();
const controller = require("../controllers/doctorController");

router.post("/", controller.createDoctor);
router.get("/", controller.getAllDoctors);
router.get("/:id", controller.getDoctor);
router.patch("/:id/favorite", controller.updateFavorite);
router.delete("/:id", controller.deleteDoctor);

module.exports = router;
