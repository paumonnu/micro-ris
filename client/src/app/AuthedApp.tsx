import { useState } from "react";
import "./AuthedApp.scss";
import AuthedNavigation from "./AuthedNavigation";

function AuthedApp() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div id="authed-app">
        <div id="authed-sidebar">
          <AuthedNavigation />
        </div>
        <div id="authed-app-main"></div>
      </div>
    </>
  );
}

export default AuthedApp;
