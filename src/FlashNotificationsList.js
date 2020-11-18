import React, { useContext } from "react";
import FlashNotificationsContext from "./FlashNotificationsContext";
import FlashNotifications from "./FlashNotifications";

export default function FlashNotificationsList() {
  const { messages } = useContext(FlashNotificationsContext);

  return (
    <ul
      style={{
        position: "absolute",
        top: "90%",
        left: "50%",
        transform: "translate(-50%, -90%)"
      }}
    >
      {messages.map(({ id, el }) => (
        <FlashNotifications key={id}>{el}</FlashNotifications>
      ))}
    </ul>
  );
}
