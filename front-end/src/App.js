import React from "react";
import { Navigator } from "react-onsenui";

import "./App.css";
import HomePage from "./HomePage";

function App() {
  const renderPages = (route, navigator) => {
    let props = route.props || {};
    props.navigator = navigator;
    return React.createElement(route.component, props);
  };

  return (
    <Navigator
      renderPage={renderPages}
      initialRoute={{
        component: HomePage,
      }}
    />
  );
}

export default App;
