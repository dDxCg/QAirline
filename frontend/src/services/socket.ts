import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to socket.io server:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.warn("Disconnected from socket.io server");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
  }

  return socket;
};
