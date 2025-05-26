const { DBPostgre } = require("../configs");

const createPlane = async (model, capacity, manufacturer, seat_map) => {
  const res = await DBPostgre.query(
    `INSERT INTO planes (model, capacity, manufacturer, seat_map) 
         VALUES ($1, $2, $3, $4) RETURNING *;`,
    [model, capacity, manufacturer, seat_map]
  );
  return res.rows[0];
};

const updatePlane = async (
  plane_id,
  model,
  capacity,
  manufacturer,
  seat_map
) => {
  const res = await DBPostgre.query(
    `UPDATE planes 
         SET model = $1, capacity = $2, manufacturer = $3, seat_map = $4 
         WHERE id = $5 RETURNING *;`,
    [model, capacity, manufacturer, seat_map, plane_id]
  );
  return res.rows[0];
};

const getPLaneById = async (plane_id) => {
  const res = await DBPostgre.query(`SELECT * FROM planes WHERE id = $1;`, [
    plane_id,
  ]);
  return res.rows[0];
};

module.exports = {
  createPlane,
  updatePlane,
  getPLaneById,
};
