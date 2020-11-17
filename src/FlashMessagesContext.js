import React from "react";

const FlashMessagesContext = React.createContext({
  messages: [],
  trigger: () => null
});

export default FlashMessagesContext;
