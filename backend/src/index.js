const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");

const dotenv = require("dotenv");
const { testDbConnection } = require("./utils");
const { AuthRoute } = require("./routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());

//routes
app.get("/ping", (req, res) => {
  res.send("pong");
});
app.use("/api/auth", AuthRoute);

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const startServer = async () => {
  const test_db = await testDbConnection();
  if (!test_db) {
    console.error("Database connection failed");
    process.exit(1);
  } else {
    console.log("Database connection successful");
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
