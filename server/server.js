const express = require("express");
const cors = require("cors");
const db = require("./models"); // Loads models and Sequelize instance from index.js
const session = require("express-session");
const passport = require("./config/passport");
require("dotenv").config();
const authRouter = require("./routes/authRoutes");
// const testRouter = require("./routes/testRoutes")
const questionRouter = require("./routes/questionRoutes");

const {
  getRandomCategoryForUser,
  getRandomFeaturesForCategory,
} = require("./middlewares/questionMiddleware");
const { isLoggedIn } = require("./middlewares/authMiddleware");

const app = express();
const PORT = 3001; // Force port 3001

// Add CORS first, before any other middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  })
);

// Middleware to parse incoming requests
// express.urlencoded() is a middleware that parses incoming
// URL-encoded data in POST requests and stores it in req.body as a JS object
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // `secure: false` for HTTP (use `true` for HTTPS)
  })
);

// Initialize Passport.js and session handling
app.use(passport.initialize());
app.use(passport.session());

console.log("Database Host:", process.env.DB_HOST_DEV);
console.log("Database User:", process.env.DB_USER_DEV);
console.log("Database Password:", process.env.DB_PASSWORD_DEV);
console.log("Database Name:", process.env.DB_NAME_DEV);

// Authenticate database connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Successful connection to the database.");

    // Sync the models before starting the server
    return db.sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Models synced successfully.");

    // Register routes (uncomment and add your routes here)
    app.get("/", async (req, res) => {
      res.send("hello world");
    });
    // app.get('/generate', isLoggedIn, getRandomCategoryForUser, getRandomFeaturesForCategory)
    app.use("/auth", authRouter);
    // app.use('/test', testRouter);
    app.use("/questions", questionRouter);

    // Start the server after confirming the connection and sync
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
