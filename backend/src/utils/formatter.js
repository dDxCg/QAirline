const formateTimeToDate = (dateValue) => {
  if (!(dateValue instanceof Date) || isNaN(dateValue.getTime())) {
    return dateValue;
  }
  const year = dateValue.getFullYear();
  const month = (dateValue.getMonth() + 1).toString().padStart(2, "0");
  const day = dateValue.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

module.exports = {
  formateTimeToDate,
};
