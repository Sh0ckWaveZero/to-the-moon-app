import { useState } from "react";
import liff from "@line/liff";
import "./App.css";
import useEffectOnce from "./utils/useEffectOnce";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");

  useEffectOnce(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
      })
      .then(async () => {
        const isFriend = await liff.getFriendship();
        if (!isFriend) {
          liff.openWindow({ url: import.meta.env.VITE_LINE_OA });
        } else {
          // TO DO: connect to server and get user info
          const profile = await liff.getProfile();
          console.log(
            "🚀 ~ file: App.tsx ~ line 22 ~ .then ~ profile",
            profile
          );
          setMessage("Login Success.\nWelcome back! 🎉");
          setDisplayName(profile.displayName);
          setPictureUrl(profile.pictureUrl || "");
          setStatusMessage(profile.statusMessage || "");
          setUserId(profile.userId);
        }
      })
      .catch((e: Error) => {
        liff.login();
      });
  });

  return (
    <div className="App">
      <h1>To The Moon App</h1>
      {message && (
        <div>
          <img
            src={pictureUrl}
            alt={displayName}
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              margin: "0 auto",
              display: "block",
            }}
          />
          <p>{displayName}</p>
          <p>{statusMessage}</p>
          <p>{message}</p>
        </div>
      )}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
    </div>
  );
}

export default App;
