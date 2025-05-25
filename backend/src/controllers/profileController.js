const jwt = require("jsonwebtoken");
require("dotenv").config();

const { getProfileById, updateProfile } = require("../models");
const { isPresent, formateTimeToDate } = require("../utils");

const user_info = async (req, res) => {
  const { account_uuid } = req.body;
  if (!isPresent(account_uuid)) {
    return res.status(400).json({ message: "Account UUID is required" });
  }
  try {
    const profile = await getProfileById(account_uuid);
    profile.date_of_birth = formateTimeToDate(profile.date_of_birth);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Get Profile Fail" });
  }
};

const update = async (req, res) => {
  const {
    full_name,
    date_of_birth,
    gender,
    nationality,
    id_number,
    passport_number,
    passport_expiry_date,
    phone_number,
    account_uuid,
  } = req.body;
  if (!isPresent(account_uuid)) {
    return res.status(400).json({ message: "Account UUID is required" });
  }
  const profile = await getProfileById(account_uuid);
  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }
  try {
    await updateProfile(
      full_name,
      date_of_birth,
      gender,
      nationality,
      id_number,
      passport_number,
      passport_expiry_date,
      phone_number,
      account_uuid
    );
    const token = jwt.sign({ uuid: account_uuid }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    res.status(200).json({
      message: "Profile updated successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Update Profile Fail" });
  }
};

module.exports = { user_info, update };
