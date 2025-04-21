const express = require("express");
const router = express.Router();
const {
  getAllPlantpot,
  getPlantpotById,
  createPlantpot,
  updatePlantpot,
  deletePlantpot,
} = require("../controllers/plantPotController");

router.get("/", getAllPlantpot);

router.get("/:id", getPlantpotById);

router.post("/", createPlantpot);

router.put("/:id", updatePlantpot);

router.delete("/:id", deletePlantpot);

module.exports = router;
