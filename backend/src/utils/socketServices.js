const {
  getTotalBookingsByDate,
  getTotalFlightsByDate,
} = require("../models/Statistic");
const { DBPostgre } = require("../configs");

let io;

module.exports = {
  initSocket(server) {
    const { Server } = require("socket.io");
    io = new Server(server, {
      cors: {
        origin: "*", // Consider restricting this to your frontend origin
      },
    });

    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);

      socket.on("adminReady", async () => {
        console.log("Admin identified. Sending dashboard data.");

        const client = await DBPostgre.connect();
        try {
          const today = new Date();
          const [bookingStats, flightStats] = await Promise.all([
            getTotalBookingsByDate(client, today),
            getTotalFlightsByDate(client, today),
          ]);

          const dashboard = {
            booking_today: bookingStats.total_bookings,
            revenue_today: bookingStats.revenue,
            active_flights_today: flightStats.total_flights,
            booking_change: bookingStats.change_bookings,
            revenue_change: bookingStats.change_revenue,
            active_flights_change: flightStats.change_flights,
          };

          socket.emit("dashboardUpdate", dashboard);
        } catch (error) {
          console.error("Failed to emit stats:", error);
          socket.emit("stats:error", { message: "Unable to fetch stats." });
        } finally {
          client.release();
        }
      });
    });

    return io;
  },

  getIO() {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
