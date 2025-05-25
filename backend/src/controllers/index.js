const { register, login } = require("./authController");
const { user_info, update } = require("./profileController");

module.exports = {
  register,
  login,
  user_info,
  update,
};
