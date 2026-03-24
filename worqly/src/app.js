require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { initializeDatabase } = require("./config/database");
const routes = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");
const config = require("./config");

const startServer = async () => {
  const sequelize = await initializeDatabase();

  // Load models
  require("./models/Employee");
  require("./models/Attendance");
  require("./models/Leave");

  try {
    await sequelize.sync();
    console.log("Database synced");
  } catch (err) {
    console.error("Error syncing database:", err);
    throw err;
  }

  const app = express();
  const PORT = config.appPort;

  // ✅ Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));

  // ✅ Health Check
  app.get("/health", (req, res) => {
    res.json({
      success: true,
      message: "Worqly API is running 🚀",
    });
  });

  // ✅ API Routes
  app.use("/api", routes);

  // ❗ 404 Handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      payload: null,
      message: "Route not found",
    });
  });

  // ❗ Global Error Handler
  app.use(errorHandler);

  // ✅ Start server
  app.listen(PORT, () => {
    console.log(`Worqly server is running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
