
const bcrypt = require("bcryptjs");
const pool = require("../db/dbConfig");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
	try {
		const { username, password } = req.body;
		const newUser = new User(username, password);

		if (!User.isValid(newUser)) {
			return res.status(400).json({ error: "Invalid user data" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Insert user into the database
		const request = pool.request();
		const result = await request.query`
            INSERT INTO Users (username, password)
            VALUES (${username}, ${hashedPassword});
        `;

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
