const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

const isPresent = (value) => {
  if (typeof value === "string") {
    return value.trim() !== "";
  }
  return value !== undefined && value !== null;
};

module.exports = { isValidEmail, isPresent };
