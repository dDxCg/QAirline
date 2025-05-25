const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

const isPresent = (value) => {
  return (
    value !== undefined && value !== null && value !== "" && value.trim() !== ""
  );
};

module.exports = { isValidEmail, isPresent };
