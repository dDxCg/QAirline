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

const deletePlaneSafe = async (plane_id) => {
  const res = await DBPostgre.query(`DELETE FROM planes WHERE id = $1;`, [
    plane_id,
  ]);
  return res.rows[0];
};

const deletePlaneForce = async (client, plane_id) => {
  try {
    await client.query("BEGIN");

    //delete all tickets of flights that use this plane
    await client.query(
      `DELETE FROM tickets WHERE flight_uuid IN (SELECT flight_uuid FROM flights WHERE plane_id = $1);`,
      [plane_id]
    );

    //delete all flights that use this plane
    await client.query(`DELETE FROM flights WHERE plane_id = $1;`, [plane_id]);

    //finally delete the plane
    const res = await client.query(
      `DELETE FROM planes WHERE id = $1 RETURNING *;`,
      [plane_id]
    );

    await client.query("COMMIT");
    return res.rows[0];
  } catch (error) {
    console.error("Error deleting plane:", error);
    await client.query("ROLLBACK");
    throw error; // rethrow the error for handling in the calling function
  } finally {
    if (client) {
      client.release();
    }
  }
};

const getAllPlanes = async () => {
  const res = await DBPostgre.query(`SELECT * FROM planes;`);
  return res.rows;
};

module.exports = {
  createPlane,
  updatePlane,
  getPLaneById,
  deletePlaneForce,
  deletePlaneSafe,
};
