import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_SERVER_URL);

function App() {
  const [encryptData, setEncryptData] = useState({});
  const [decryptedData, setDecryptedData] = useState({});
  const [btn, setBtn] = useState("Click to Start Decode");
  const [flag, setFlag] = useState(false);
  const [showDecode, setShowDecode] = useState(false);
  const [status, setStatus] = useState(false)

  function sendFirst() {
    socket.emit("first", "firstMessage");
    setFlag(true);
  }

  function updateEncr() {
    socket.on("mess", (message) => {
      setEncryptData(message);
    });
  }

  function updtDecrypt(dataToBeEncrypted) {
    socket.emit("dataToBeEncrypted", dataToBeEncrypted);
    socket.on("mess2", (message) => {
      setDecryptedData(message);
      setShowDecode(true);
    });
  };
  async function serverStatus(){
    const data = await fetch(process.env.REACT_APP_SERVER_URL);
    const json = await data.json();
    setStatus(json.status)
  }
  useEffect(() => {
    serverStatus()
    updateEncr();
  }, [socket]);

  useEffect(() => {
    if (flag) {
      updtDecrypt(encryptData);
    }
  }, [encryptData]);
  if(!status){
    return <h1>Please Wait Server will take 4 5min to Start...</h1>
  }
  return (
    <>
      <h1>Syook Assignment</h1>
      <div id="container">
        <div className="card">
          <h2>Encrypted String</h2>
          <div>
            {encryptData.name !== undefined ?<>{encryptData.name}|{encryptData.origin}|{encryptData.destination}|
            {encryptData.secret_key}</>:''}
          </div>
        </div>
        <div className="card">
          <h2>Decoded String</h2>
          {showDecode ? (
            <>
              <div>Name: {decryptedData.name}</div>
              <div>Origin: {decryptedData.origin}</div>
              <div>Destination: {decryptedData.destination}</div>
              <div>Secure_key: {decryptedData.secret_key}</div>
            </>
          ) : (
            ""
          )}
        </div>
        <button onClick={sendFirst}>{btn}</button>
      </div>
    </>
  );
}

export default App;
