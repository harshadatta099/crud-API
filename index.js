const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect routes
app.use("/", productRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
