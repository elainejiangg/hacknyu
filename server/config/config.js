require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  'development': {
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_NAME_DEV,
    host: process.env.DB_HOST_DEV,
    dialect: "postgres",
    port: process.env.DB_PORT_DEV || 5432,
    define: {
      underscored: true, // Enforces snake_case globally
    },
  },
  'test': {
    username: process.env.DB_USER_CLOUD,
    password: process.env.DB_PASSWORD_CLOUD,
    database: process.env.DB_NAME_CLOUD,
    host: process.env.DB_HOST_CLOUD,
    dialect: "postgres",
    port: process.env.DB_PORT_CLOUD || 5432
  },
  'production': {
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
