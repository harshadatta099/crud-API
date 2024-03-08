const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/dbConfig");
const User = require("../models/userModel");

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const loginUser = new User(username, password);
		console.log(loginUser);
		if (!User.isValid(loginUser)) {
			return res.status(400).json({ error: "Invalid user data" });
		}

		// Retrieve user from the database
		const request = pool.request();
		const result = await request.query`
            SELECT * FROM Users WHERE username = ${username};
        `;

		const user = result.recordset[0];
		console.log(user);
		if (!user) {
			return res.status(401).json({ error: "Invalid username or password" });
		}

		// Compare passwords
		// const passwordMatch = await bcrypt.compare(password, user.password);
		// console.log(passwordMatch);
		// if (!passwordMatch) {
		// 	return res.status(401).json({ error: "Invalid username or password" });
		// }

		// Generate JWT token
		const token = jwt.sign(
			{ userId: user.userId, username: user.username },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.status(200).json({ token });
	} catch (error) {
		console.error("Error logging in:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
