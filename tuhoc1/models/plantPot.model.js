const mongoose = require("mongoose");

const PlantpotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter plantpot name"], // Thêm "Please" cho message rõ ràng hơn
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Quantity cannot be negative"], // Thêm validation
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Price cannot be negative"], // Thêm validation
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Sửa từ "Timestamp" thành "timestamps" (viết thường)
  }
);

const Plantpot = mongoose.model("Plantpot", PlantpotSchema);
module.exports = Plantpot;
