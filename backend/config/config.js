require('dotenv').config({ path: __dirname + '/../.env' });
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_HOST:", process.env.DB_HOST);
module.exports={
  development: {
     username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || "marketplace_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres"
  },
   test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME_TEST || "marketplace_db_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
}
