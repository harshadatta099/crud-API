const express = require("express");
const productController = require("../controllers/productController");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

router.post("/insertData", productController.insertProduct, errorHandler);
router.get("/getDetails", productController.getProducts, errorHandler);
router.get(
	"/getDetails/:productId",
	productController.getProductById,
	errorHandler
);
router.delete(
	"/deleteProduct/:productId",
	productController.deleteProduct,
	errorHandler
);

router.put(
	"/editProduct/:productId",
	productController.editProduct,
	errorHandler
);

module.exports = router;
