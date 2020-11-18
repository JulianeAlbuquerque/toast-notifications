import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import FlashNotificationsProvider from "./FlashNotificationsProviderOld";
import FlashNotificationsList from "./FlashNotificationsList";

import Trigger from "./Triggers";

function App() {
  return (
    <FlashNotificationsProvider>
      <Trigger />
      <FlashNotificationsList />
    </FlashNotificationsProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
