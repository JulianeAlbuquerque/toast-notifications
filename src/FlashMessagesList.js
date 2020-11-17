import React, { useContext, useEffect, useState } from "react";
import FlashMessagesContext from "./FlashMessagesContext";
import FlashMessage from "./FlashMessage";

export default function FlashMessaList() {
  const { messages } = useContext(FlashMessagesContext);

  return (
    <div
      style={{
        position: "absolute",
        top: "90%",
        left: "50%",
        transform: "translate(-50%, -90%)"
      }}
    >
      {messages.map(({ id, ...props }) => (
        <FlashMessage key={id} id={id} {...props} />
      ))}
    </div>
  );
}
