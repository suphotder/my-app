import React, { useEffect } from "react";
import { BackButton, Page, Toolbar } from "react-onsenui";
import Ons from "onsenui";
import "./ScanPage.css";

function ScanPage(props) {
  const { navigator, onRecieveValue } = props;
  useEffect(() => {
    if (window.device) {
      var permissions = window.cordova.plugins.permissions;
      permissions.checkPermission(permissions.CAMERA, function (status) {
        if (status.hasPermission) {
          console.log("Yes :D ");
          handleScane();
        } else {
          console.warn("No :( ");
          permissions.requestPermission(permissions.CAMERA, success, error);
          function error() {
            console.warn("Camera permission is not turned on");
          }
          function success(status) {
            if (!status.hasPermission) error();
            handleScane();
          }
        }
      });
    }
  }, []);

  const handleScane = () => {
    if (window.QRScanner && window.QRScanner.scan) {
      window.QRScanner.scan(function (err, result) {
        if (err) {
          console.error(err);
          Ons.notification.alert(err._message);
        } else {
          window.QRScanner.hide();
          window.QRScanner.destroy();

          if (typeof onRecieveValue === "function") {
            onRecieveValue(result);
          }
          navigator.popPage();
        }
      });
      window.QRScanner.show();
    } else {
      Ons.notification.alert("Cannot open camera");
    }
  };

  return (
    <Page
      renderToolbar={() => (
        <Toolbar>
          <div className="box-toolbar">
            <BackButton style={{ fill: "white" }} />
            <div style={{ paddingLeft: "8px", color: "white" }}>Scan</div>
          </div>
        </Toolbar>
      )}
    ></Page>
  );
}

export default ScanPage;
