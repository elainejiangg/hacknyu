const bcrypt = require('bcryptjs');
const { User } = require('../models');
const passport = require('passport');

// Register a user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      // Respond with the new user's info (but avoid sending the password)
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error registering user' });
    }
  }

// Login a user
exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // If there is an error during authentication, return it
            console.error('Authentication error:', err); // Log the error for debugging
            return res.status(500).json({ error: 'Internal server error during authentication.' });
        }

        if (!user) {
            // If no user was found (e.g., invalid credentials), return a 400 with an error message
            return res.status(400).json({ message: info.message });
        }

        // If authentication is successful, store the user in session
        req.logIn(user, (err) => {
            if (err) {
                // If there is an error during login (session management), return it
                console.error('Login error:', err); // Log the error for debugging
                return res.status(500).json({ error: 'Internal server error during login.' });
        }

        // Redirect to the home page after successful login
        // console.log('User', user)
        console.log('User ID in session:', req.session.passport.user);
        return res.status(200).json({ message: 'Logged in successfully', user });
        });
    })(req, res, next);
};

// Logout a user
exports.logoutUser = (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  }
