const jwt = require("jsonwebtoken");
require("dotenv").config();
const { DBPostgre } = require("../configs");

const {
  getProfileById,
  updateProfile,
  deleteAccount,
  getAccountByEmail,
} = require("../models");
const { isPresent, TimeToDate } = require("../utils");

const user_info = async (req, res) => {
  const { account_uuid } = req.body;
  if (!isPresent(account_uuid)) {
    return res.status(400).json({ message: "Account UUID is required" });
  }
  try {
    const profile = await getProfileById(account_uuid);
    profile.date_of_birth = TimeToDate(profile.date_of_birth);
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
    const updatedProfile = await updateProfile(
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
    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Update Profile Fail" });
  }
};

const deleteAccountController = async (req, res) => {
  const { account_uuid } = req.body;
  if (!isPresent(account_uuid)) {
    return res.status(400).json({ message: "Account UUID is required" });
  }
  const client = await DBPostgre.connect();
  try {
    await deleteAccount(client, account_uuid);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Delete Account Fail" });
  }
};

const getAccountByEmailController = async (req, res) => {
  const { email } = req.body;
  try {
    const account = await getAccountByEmail(email);
    if (!account) {
      throw new Error("Account not found");
    }
    return res.status(200).json(account);
  } catch (error) {
    console.error("Error fetching account by email:", error);
    throw new Error("Failed to fetch account by email");
  }
};

module.exports = {
  user_info,
  update,
  deleteAccountController,
  getAccountByEmailController,
};
