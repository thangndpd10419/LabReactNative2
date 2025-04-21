const Plantpot = require("../models/plantPot.model"); // Lưu ý tên biến phải khớp

exports.getAllPlantpot = async (req, res) => {
  try {
    const plantPots = await Plantpot.find({}); // Sửa tên biến thành số nhiều cho rõ nghĩa
    res.status(200).json(plantPots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlantpotById = async (req, res) => {
  try {
    const { id } = req.params;
    const plantPot = await Plantpot.findById(id);
    if (!plantPot) {
      return res.status(404).json({ message: "Plantpot not found" });
    }
    res.status(200).json(plantPot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPlantpot = async (req, res) => {
  try {
    const plantPot = await Plantpot.create(req.body);
    res.status(201).json(plantPot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePlantpot = async (req, res) => {
  try {
    const { id } = req.params;
    const plantPot = await Plantpot.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!plantPot) {
      return res.status(404).json({ message: "Plantpot not found" });
    }
    res.status(200).json(plantPot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePlantpot = async (req, res) => {
  try {
    const { id } = req.params;
    const plantPot = await Plantpot.findByIdAndDelete(id);
    if (!plantPot) {
      return res.status(404).json({ message: "Plantpot not found" });
    }
    res.status(200).json({ message: "Plantpot deleted successfully" }); // Sửa chữ hoa cho nhất quán
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
