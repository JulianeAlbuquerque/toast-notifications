import React from "react";

export function FlashNotificationsText({ children, ...props }) {
  return <p {...props}>{children}</p>;
}

export function FlashNotificationsButton({ children, ...props }) {
  return (
    <button
      style={{
        display: "block",
        width: "100%",
        flexGrow: "1"
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default function FlashNotifications({ children, ...props }) {
  return (
    <div
      style={{
        background: "#222",
        color: "#fff",
        width: "360px",
        display: "flex",
        flexWrap: "nowrap"
      }}
      {...props}
    >
      {children}
    </div>
  );
}
