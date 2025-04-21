// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const Product = require("./models/product.model.js");

// app.use(express.json());

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

// app.get("/api/products", async (req, res) => {
//   try {
//     const product = await Product.find({});
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// app.get("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post("/api/products", async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// app.put("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByIdAndUpdate(id, req.body, {
//       new: true, // Trả về sản phẩm đã được cập nhật
//     });

//     if (!product) {
//       return res.status(400).json({ message: "Product not found" });
//     }

//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.delete("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findByIdAndDelete(id);

//     if (!product) {
//       return res.status(400).json({ message: "product not found" });
//     }
//     res.status(200).json({ message: "product deleted succesfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// mongoose
//   .connect(
//     "mongodb+srv://thangndpd10419:rSxpcUIQ0JXThtb1@backenddb.mek6q.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB"
//   )
//   .then(() => console.log("Connected to MongoDB!"))
//   .catch((err) => console.error("Error connecting to MongoDB: ", err));

// app.listen(3000, () => {
//   console.log("Serve is running on port 3000");
// });
// app.js

const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routers/productRoutes");
const plantPotRouters = require("./routers/plantPotRouters");

const app = express();

// Middleware để xử lý JSON body
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(
    "mongodb+srv://thangndpd10419:rSxpcUIQ0JXThtb1@backenddb.mek6q.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Error connecting to MongoDB: ", err));

//  route cho sản phẩm
app.use("/api/products", productRoutes);

// Sử dụng router cho các endpoint /api/plantpots
app.use("/api/plantpots", plantPotRouters);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
