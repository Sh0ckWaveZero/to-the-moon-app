import { useState } from "react";
import liff from "@line/liff";
import "./App.css";
import useEffectOnce from "./utils/useEffectOnce";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

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
          setMessage(`Login Success.\n Welcome back!`);
          setDisplayName(profile.displayName);
          setPictureUrl(profile.pictureUrl || "");
          setStatusMessage(profile.statusMessage || "");
          await callback(profile);
        }
      })
      .catch((e: Error) => {
        liff.login();
      });
  });

  const callback = async (profile: any) => {
    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_JWT}`,
      },
      body: JSON.stringify(profile),
    };
    return await fetch(
      `${import.meta.env.VITE_API_URL}/line/liff/callback`,
      requestOptions
    )
      .then((response) => response.json())
      .then(async (data) => {
        if (data.statusText) {
          toast.success(await data.statusText);
        } else {
          toast.error(data.message);
        }
        liff.closeWindow();
      });
  };

  const onClose = () => {
    liff.closeWindow();
    window.close();
  };

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
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
          <button onClick={() => onClose()}>
            ปิดหน้าต่างนี้เพื่อดำเนินการต่อ
          </button>
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
