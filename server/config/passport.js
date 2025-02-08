const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { Op } = require('sequelize');

passport.use(new LocalStrategy({
  usernameField: 'usernameOrEmail',  // Allow the user to provide either username or email
}, async (usernameOrEmail, password, done) => {
  try {
    // Check if the provided input is an email or username
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: usernameOrEmail },  // Check for username
          { email: usernameOrEmail },     // Check for email
        ]
      }
    });

    if (!user) {
      return done(null, false, { message: 'No user with that username or email' });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password' });
    }

    // If passwords match, return the user object
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Serialize user information into session
passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  done(null, user.id);  // Store the user ID in the session (assuming 'id' is the primary key)
});

// Deserialize user information from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);  // Retrieve user by ID from the database
    done(null, user);  // Attach the user to `req.user`
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
