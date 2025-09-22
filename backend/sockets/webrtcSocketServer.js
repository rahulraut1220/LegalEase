const { Server } = require("socket.io");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const emailMap = new Map(); // socketId -> email

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("join-room", ({ roomId, email }) => {
      socket.join(roomId);
      emailMap.set(socket.id, email);

      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      const otherClientId = clients.find((id) => id !== socket.id);

      console.log(`Socket ${socket.id} joined room ${roomId} as ${email}`);

      if (otherClientId) {
        socket.emit("user-joined", {
          socketId: otherClientId,
          email: emailMap.get(otherClientId),
        });
        socket.remoteSocketId = otherClientId;
      }
    });

    socket.on("offer", ({ sdp, targetRoomId, email }) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(targetRoomId) || []);
      const otherClientId = clients.find((id) => id !== socket.id);

      if (otherClientId) {
        socket.remoteSocketId = otherClientId;
        io.to(otherClientId).emit("offer", {
          sdp,
          callerSocketId: socket.id,
          email,
        });
        console.log("Forwarded offer from", socket.id, "to", otherClientId);
      }
    });

    socket.on("answer", ({ sdp, targetSocketId }) => {
      io.to(targetSocketId).emit("answer", {
        sdp,
        calleeSocketId: socket.id,
      });
      console.log("Forwarded answer from", socket.id, "to", targetSocketId);
    });

    socket.on("ice-candidate", ({ candidate, targetSocketId }) => {
      io.to(targetSocketId).emit("ice-candidate", {
        candidate,
        from: socket.id,
      });
      console.log("Forwarded ICE candidate from", socket.id, "to", targetSocketId);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      emailMap.delete(socket.id);
    });
  });
}

module.exports = { initSocketServer };
