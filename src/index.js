import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import FlashMessagesProvider from "./FlashMessagesProvider";
import FlashMessagesList from "./FlashMessagesList";

import { TriggerA, TriggerB, TriggerC, TriggerD } from "./Triggers";

window.events = {
  _events: {},
  on: function (eventId, handler) {
    this._events[eventId] = handler;
  },
  emit: function (eventId, params) {
    if (this._events[eventId]) {
      this._events[eventId](params);
    }
  }
};

function App() {
  return (
    <>
      <FlashMessagesProvider>
        <TriggerA />
        <TriggerB />
        <TriggerC />
        <div
          style={{
            background: "#222",
            color: "#fff",
            width: "360px",
            display: "flex",
            flexWrap: "nowrap"
          }}
        >
          <p>
            Added to
            wishlistwishlistwishlistwishlistwishlistwishlistwishlistwishlistwishlistwishlist
          </p>
          <button
            style={{
              display: "block",
              width: "100%",
              flexGrow: "1"
            }}
            onClick={() => console.log("do something on view all click")}
          >
            Click Me
          </button>
        </div>
        <FlashMessagesList />
      </FlashMessagesProvider>
      <TriggerD />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
