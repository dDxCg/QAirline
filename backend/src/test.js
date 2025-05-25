require("dotenv").config({ path: "../.env" });

console.log("DB ENV from test_func.js:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const { SeatMapToSeatList } = require("./utils");
const pool = require("./configs/db_postgre");

const testQuerySeatMap = async () => {
  try {
    const res = await pool.query(
      `SELECT seat_map FROM planes WHERE id = $1;`,
      [1] // test with plane_id = 1
    );

    const seatMapJson = res.rows[0].seat_map;
    console.log("Raw seat_map:", seatMapJson);

    const seatList = SeatMapToSeatList(seatMapJson);
    console.log("Converted seat list:", seatList);
  } catch (err) {
    console.error("Error:", err);
  }
};

testQuerySeatMap();
