const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cors = require("cors");
const http = require("http");

const dotenv = require("dotenv");
const { testDbConnection } = require("./utils");
const { initSocket } = require("./utils/socketServices");
const {
  AuthRoute,
  ProfileRoute,
  SeatRoute,
  PlaneRoute,
  FlightRoute,
  BookingRoute,
} = require("./routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend's origin
  })
);

//routes
app.get("/api/ping", (req, res) => {
  res.send("pong");
});
app.use("/api/auth", AuthRoute);
app.use("/api/profile", ProfileRoute);
app.use("/api/seat", SeatRoute);
app.use("/api/plane", PlaneRoute);
app.use("/api/flight", FlightRoute);
app.use("/api/ticket", BookingRoute);

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

  const server = http.createServer(app);
  const io = initSocket(server);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
