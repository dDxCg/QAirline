const {
  createPlane,
  updatePlane,
  getPLaneById,
  deletePlaneSafe,
  deletePlaneForce,
} = require("../models");

const { DBPostgre } = require("../configs");
const { getAllPlanes } = require("../models/Plane");
const { getIO } = require("../utils/socketServices");

const createPlaneController = async (req, res) => {
  const { model, capacity, manufacturer, seat_map } = req.body;

  if (!model || !capacity || !manufacturer || !seat_map) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }
  const client = await DBPostgre.connect();
  try {
    const newPlane = await createPlane(model, capacity, manufacturer, seat_map);

    // Get updated aircraft list
    const allPlanes = await getAllPlanes(client);

    // Emit update to all connected clients
    const io = getIO();
    io.emit("aircraftUpdate", allPlanes);

    return res.status(200).json({
      success: true,
      message: "Plane created successfully.",
      plane: newPlane,
    });
  } catch (error) {
    console.error("Error creating plane:", error);
    client.release();
    return res.status(500).json({
      success: false,
      message: "Failed to create plane.",
    });
  }
};

const updatePlaneController = async (req, res) => {
  const { plane_id, model, capacity, manufacturer, seat_map } = req.body;

  if (!model || !capacity || !manufacturer || !seat_map) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    const updatedPlane = await updatePlane(
      plane_id,
      model,
      capacity,
      manufacturer,
      seat_map
    );
    return res.status(200).json({
      success: true,
      message: "Plane updated successfully.",
      plane: updatedPlane,
    });
  } catch (error) {
    console.error("Error updating plane:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update plane.",
    });
  }
};

const getPlaneByIdController = async (req, res) => {
  const { plane_id } = req.params;

  if (!plane_id) {
    return res.status(400).json({
      success: false,
      message: "Plane ID is required.",
    });
  }

  try {
    const plane = await getPLaneById(plane_id);
    if (!plane) {
      return res.status(404).json({
        success: false,
        message: "Plane not found.",
      });
    }
    return res.status(200).json({
      success: true,
      plane,
    });
  } catch (error) {
    console.error("Error fetching plane by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch plane.",
    });
  }
};

const deletePlaneSafeController = async (req, res) => {
  const { plane_id } = req.params;

  if (!plane_id) {
    return res.status(400).json({
      success: false,
      message: "Plane ID is required.",
    });
  }

  try {
    await deletePlaneSafe(plane_id);
    return res.status(200).json({
      success: true,
      message: "Plane deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting plane:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete plane.",
    });
  }
};

const deletePlaneForceController = async (req, res) => {
  const { plane_id } = req.params;

  if (!plane_id) {
    return res.status(400).json({
      success: false,
      message: "Plane ID is required.",
    });
  }
  const client = await DBPostgre.connect();
  try {
    await deletePlaneForce(client, plane_id);
    return res.status(200).json({
      success: true,
      message: "Plane deleted successfully.",
    });
  } catch (error) {
    console.error("Error force deleting plane:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to force delete plane.",
    });
  }
};

module.exports = {
  createPlaneController,
  updatePlaneController,
  getPlaneByIdController,
  deletePlaneForceController,
  deletePlaneSafeController,
};
