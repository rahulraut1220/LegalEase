import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = async () => {
    if (!email || !roomId) {
      alert("Please enter email and room ID");
      return;
    }

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }

    peerRef.current = new RTCPeerConnection();
    localStream
      .getTracks()
      .forEach((track) => peerRef.current.addTrack(track, localStream));

    peerRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    peerRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          targetSocketId: peerRef.current.remoteSocketId,
        });
      }
    };

    socket.emit("join-room", roomId);

    socket.on("user-joined", async ({ socketId }) => {
      peerRef.current.remoteSocketId = socketId;

      const offer = await peerRef.current.createOffer();
      await peerRef.current.setLocalDescription(offer);
      socket.emit("offer", { sdp: offer, targetSocketId: socketId });
    });

    socket.on("offer", async ({ sdp, callerSocketId }) => {
      peerRef.current.remoteSocketId = callerSocketId;

      await peerRef.current.setRemoteDescription(
        new RTCSessionDescription(sdp)
      );
      const answer = await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);

      socket.emit("answer", { sdp: answer, targetSocketId: callerSocketId });
    });

    socket.on("answer", async ({ sdp }) => {
      await peerRef.current.setRemoteDescription(
        new RTCSessionDescription(sdp)
      );
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      try {
        await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error("❌ Error adding ICE candidate:", error);
      }
    });

    setJoined(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      {!joined && (
        <div className="bg-white shadow-lg p-6 rounded-lg mb-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Join Video Call
          </h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg"
          />
          <button
            onClick={handleJoin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Join Call
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-center font-semibold mb-2">📹 Local Video</h3>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-72 h-48 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-center font-semibold mb-2">📺 Remote Video</h3>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-72 h-48 border border-red-400 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
