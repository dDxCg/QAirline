const TimeToDate = (dateValue) => {
  if (!(dateValue instanceof Date) || isNaN(dateValue.getTime())) {
    return dateValue;
  }
  const year = dateValue.getFullYear();
  const month = (dateValue.getMonth() + 1).toString().padStart(2, "0");
  const day = dateValue.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const SeatMapToSeatList = (seatMap) => {
  const result = [];

  for (const rowRange in seatMap) {
    const [start, end] = rowRange.split("-").map(Number);
    const columns = seatMap[rowRange];

    for (let row = start; row <= end; row++) {
      for (const column in columns) {
        result.push({
          row,
          column,
          class: columns[column].class,
        });
      }
    }
  }
  return result;
};

module.exports = {
  TimeToDate,
  SeatMapToSeatList,
};
