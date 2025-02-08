const express = require('express');
const passport = require('passport');
const session = require('express-session');
const app = express();
const { sequelize } = require('./models');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

// Example route
app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
