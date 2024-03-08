const express = require("express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect routes
app.use("/", productRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
