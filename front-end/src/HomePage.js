import React, { useState } from "react";
import ScanPage from "./ScanPage";
import { Page, Toolbar } from "react-onsenui";
import youtube from "./images/youtube.png";
import qrcode from "./images/qr-code.png";
import "./HomePage.css";

function HomePage(props) {
  const { navigator } = props;
  const [scanURL, setScanURL] = useState("");

  const openYouTube = () => {
    console.log("YouTube...");
    if (window.device) {
      openURL("https://www.youtube.com/watch?v=MNzLdVqEkXc");
    }
  };

  const openScan = () => {
    console.log("Scan...");
    navigator.pushPage({
      component: ScanPage,
      props: { onRecieveValue: onRecieveValue },
    });
  };

  const onRecieveValue = (params) => {
    console.log("URL", params);
    setScanURL(params);
    openURL(params);
  };

  const openURL = (url) => {
    window.cordova.InAppBrowser.open(url, "_blank", "location=yes");
  };

  return (
    <Page
      renderToolbar={() => (
        <Toolbar>
          <div className="box-toolbar">
            <div style={{ paddingLeft: "8px", color: "white" }}>Home</div>
          </div>
        </Toolbar>
      )}
    >
      <div className="container">
        <div>
          <div className="box-row">
            <img
              onClick={openYouTube}
              src={youtube}
              style={{ width: "48px", height: "48px" }}
              alt="Logo"
            />
          </div>
          <div className="box-row">
            <img
              onClick={openScan}
              src={qrcode}
              style={{ width: "48px", height: "48px" }}
              alt="Logo"
            />
          </div>
          <p>{scanURL}</p>
        </div>
      </div>
    </Page>
  );
}

export default HomePage;
