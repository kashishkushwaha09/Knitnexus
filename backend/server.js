require('dotenv').config({ path: __dirname + '/../.env' });
const express=require('express');
const app=express();
const { sequelize } = require('./models');
const errorMiddleware=require('./middlewares/errorHandler');
const authRoutes = require("./routes/authRoute");
const profileRoutes=require("./routes/profileRoutes");
const jobRoutes = require('./routes/jobRoute');

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile",profileRoutes);
app.use('/api/jobs', jobRoutes);

app.use(errorMiddleware);
const connectToPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL successfully!");
    await sequelize.sync({ alter: true });
    console.log("Models synchronized with database!");
    app.listen(4000, () => {
      console.log("App listening on 4000");
    });
  } catch (error) {
    console.error("PostgreSQL connection error:", error);
  }
};

connectToPostgres();