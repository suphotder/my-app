import React, { useState } from "react";
import ScanPage from "./ScanPage";
import { Page } from "react-onsenui";
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
    <Page>
      <div className="container">
        <div>
          <button onClick={openYouTube}>YouTube</button>
        </div>
        <div>
          <button onClick={openScan}>Scan</button>
          <div>URL:{scanURL}</div>
        </div>
      </div>
    </Page>
  );
}

export default HomePage;
