const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "enter product name"] },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    image: { type: String, required: false },
    description: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
