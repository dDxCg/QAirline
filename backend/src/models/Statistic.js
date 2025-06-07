const getTotalBookingsByDate = async (client, date) => {
  const query = `
    SELECT 
      COUNT(*) AS total_bookings,
      COALESCE(SUM(price), 0) AS revenue
    FROM tickets
    WHERE book_at::date = $1;
  `;
  const dateStr = date.toLocaleDateString("en-CA"); // Format date as YYYY-MM-DD
  const res = await client.query(query, [dateStr]);

  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toLocaleDateString("en-CA"); // Format yesterday's date as YYYY-MM-DD

  const yesterdayRes = await client.query(query, [yesterdayStr]);
  const change_bookings =
    parseInt(res.rows[0].total_bookings) -
    parseInt(yesterdayRes.rows[0].total_bookings);
  const change_revenue =
    parseInt(res.rows[0].revenue) - parseInt(yesterdayRes.rows[0].revenue);
  return {
    total_bookings: parseInt(res.rows[0].total_bookings),
    revenue: parseInt(res.rows[0].revenue),
    change_bookings: change_bookings,
    change_revenue: change_revenue,
  };
};

const getTotalFlightsByDate = async (client, date) => {
  const query = `
      SELECT
        COUNT(*) AS total_flights
      FROM
        flights
      WHERE
        departure_time::date = $1;
    `;
  const dateStr = date.toLocaleDateString("en-CA"); // Format date as YYYY-MM-DD
  const res = await client.query(query, [dateStr]);

  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toLocaleDateString("en-CA"); // Format yesterday's date as YYYY-MM-DD
  const yesterdayRes = await client.query(query, [yesterdayStr]);
  const change_flights =
    parseInt(res.rows[0].total_flights) -
    parseInt(yesterdayRes.rows[0].total_flights);
  return {
    total_flights: parseInt(res.rows[0].total_flights),
    change_flights: change_flights,
  };
};

module.exports = {
  getTotalBookingsByDate,
  getTotalFlightsByDate,
};
