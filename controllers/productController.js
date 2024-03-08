const pool = require("../db/dbConfig");
const sql = require("mssql/msnodesqlv8");
const Product = require("../models/productModel");
const { authenticate } = require("../middlewares/authMiddleware");

exports.insertProduct = async (req, res, next) => {
	try {
		// Authenticate user with JWT token
		authenticate(req, res, async () => {
			const { ProductName, Price, Quantity } = req.body;
			const newProduct = new Product(ProductName, Price, Quantity);

			if (!Product.isValid(newProduct)) {
				return res.status(400).json({ error: "Invalid product data" });
			}

			const request = pool.request();

			const result = await request.query`
                INSERT INTO userProducts (ProductName, Price, Quantity)
                VALUES (${newProduct.ProductName}, ${newProduct.Price}, ${newProduct.Quantity});
            `;
			console.log(result);

			res.status(201).json({
				message: "Product inserted successfully",
			});
		});
	} catch (err) {
		next(err);
		console.error("Error inserting product:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.getProducts = async (req, res, next) => {
	try {
		// Authenticate user with JWT token
		authenticate(req, res, async () => {
			const request = pool.request();

			const result = await request.query("SELECT * FROM userProducts ");
			res.json(result.recordset);
		});
	} catch (err) {
		next(err);
		console.error("Error executing query:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.getProductById = async (req, res, next) => {
	try {
		// Authenticate user with JWT token
		authenticate(req, res, async () => {
			const { productId } = req.params;
			const request = pool.request();

			const result = await request
				.input("productId", sql.Int, parseInt(productId))
				.query("SELECT * FROM userProducts WHERE ProductID = @productId");

			if (result.recordset.length === 0) {
				res.status(404).json({ error: "Product not found" });
			} else {
				res.json(result.recordset[0]);
			}
		});
	} catch (err) {
		next(err);
		console.error("Error executing query:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.deleteProduct = async (req, res, next) => {
	try {
		// Authenticate user with JWT token
		authenticate(req, res, async () => {
			const { productId } = req.params;

			if (!parseInt(productId)) {
				return res.status(400).json({ error: "Invalid productId" });
			}

			const request = pool.request();

			const result = await request.query`
                DELETE FROM userProducts
                WHERE ProductID = ${parseInt(productId)};
            `;

			if (result.rowsAffected[0] === 0) {
				return res.status(404).json({ error: "Product not found" });
			}

			res.status(200).json({ message: "Product deleted successfully" });
		});
	} catch (err) {
		next(err);
		console.error("Error deleting product:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.editProduct = async (req, res, next) => {
	try {
		// Authenticate user with JWT token
		authenticate(req, res, async () => {
			const { productId } = req.params;
			const { ProductName, Price, Quantity } = req.body;
			const updatedProduct = new Product(ProductName, Price, Quantity);

			if (!Product.isValid(updatedProduct)) {
				return res.status(400).json({ error: "Invalid product data" });
			}

			const request = pool.request();

			const result = await request.query`
                UPDATE userProducts
                SET ProductName = ${updatedProduct.ProductName}, Price = ${
				updatedProduct.Price
			}, Quantity = ${updatedProduct.Quantity}
                WHERE ProductID = ${parseInt(productId)};
            `;

			if (result.rowsAffected[0] === 0) {
				return res.status(404).json({ error: "Product not found" });
			}

			res.status(200).json({ message: "Product updated successfully" });
		});
	} catch (err) {
		next(err);
		console.error("Error updating product:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};
