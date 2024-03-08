// userRoutes.js

const express = require("express");
const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signupController.signup);
router.post("/login", loginController.login);
router.get("/protected", authMiddleware.authenticate, (req, res) => {
	res.status(200).json({ message: "Protected route accessed successfully" });
});

module.exports = router;
