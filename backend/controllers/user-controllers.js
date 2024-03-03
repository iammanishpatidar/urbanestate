const expressAsyncHandler = require('express-async-handler');
const userModel = require('../models/User');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// @desc creating new user
// @route POST /api/users/signup
// @access public
const signup = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new userModel({ name, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = { signup };
