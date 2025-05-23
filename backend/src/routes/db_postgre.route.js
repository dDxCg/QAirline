const express = require("express");
const router = express.Router();
const { DBPostgre } = require("../configs"); // your DB connection pool

router.get("/db_postgre", async (req, res) => {
  try {
    const result = await DBPostgre.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Database connection failed" });
  }
});

module.exports = router;
