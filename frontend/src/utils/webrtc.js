// utils/webrtc.js

export const createPeerConnection = (socket, targetSocketId, onTrackCallback) => {
  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
    ],
  });

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", {
        candidate: event.candidate,
        targetSocketId,
      });
    }
  };

  pc.ontrack = (event) => {
    onTrackCallback(event.streams[0]);
  };

  return pc;
};
