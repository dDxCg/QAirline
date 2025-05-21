const express = require("express");

const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");

const dotenv = require("dotenv");
const dbRouter = require("./routes/db_postgre.route");
const testDbConnection = require("./utils/test_db_postgre");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//routes
app.use("/api", dbRouter);

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
