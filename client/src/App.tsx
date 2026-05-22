import { useEffect, useState, useRef } from "react";
import { io ,type Socket} from "socket.io-client";
import './App.css'
import YouTube from "react-youtube";

function App() {
  const [connected, setConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null);
  const [lastEvent, setLastEvent]= useState("No event yet")
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState("");

  useEffect(()=>{
  const socket = io("http://localhost:3000");
  socketRef.current = socket;
  socket.on("connect", () => {
  setConnected(true);
  });
  socket.on("disconnect", () =>{
    setConnected(false);
  });
  socket.on("play", (data) => {
  setLastEvent(`Play received from ${data.from}`)
});

  socket.on("pause", (data) => {
    setLastEvent(`Pause received from ${data.from}`)
  });

socket.on("change-video", (data) => {
  setCurrentVideoId(data.videoId);
  setLastEvent(`${data.from} changed the video to ${data.videoId}`);
});

  return () => {
      socket.disconnect();
    };
  },[]);

function handlePlay() {
  socketRef.current?.emit("play", {
    nickname,
    roomId: currentRoom,
  });
}
  function handleJoinRoom() {
    socketRef.current?.emit("join-room", {
    roomId,
    nickname,
  });

  setCurrentRoom(roomId);
  }

  function handlePause () {
    socketRef.current?.emit("pause",{
      nickname,
      roomId: currentRoom
  })
  }
  
  function handleChangeVideo() {
  const extractedVideoId = extractVideoId(videoURL);

  if (extractedVideoId === null) {
    return;
  }

  setCurrentVideoId(extractedVideoId);

  socketRef.current?.emit("change-video", {
    nickname,
    roomId: currentRoom,
    videoId: extractedVideoId,
  });
}

function extractVideoId(url: string): string | null {
  const parsedUrl = new URL(url);
  return parsedUrl.searchParams.get("v");
}
  
  return (
    <main>
      <h1>Sync Music App</h1>
      <input
      value={nickname}
      onChange={(event)=>setNickname(event.target.value)}
      placeholder="Choose a nickname" 
      />
      <p>
        Status:{" "}
        {connected ? "Connected to server" : "Disconnected from server"}
      </p>
      <input
      value={roomId}
      onChange={(event)=>setRoomId(event.target.value)}
      placeholder="Type your room ID" 
      />
      <button onClick={handleJoinRoom}>Join room</button>
      <p>Last event: {lastEvent}</p>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <p>Current room: {currentRoom || "No room joined"}</p>
      <input
      value={videoURL}
      onChange={(event) => setVideoURL(event.target.value)}
      placeholder="URL Youtube"
      />
      <button onClick={handleChangeVideo}>Change video</button>
      {currentVideoId && (
      <YouTube videoId={currentVideoId} />
)}
    </main>
  )
}
export default App
