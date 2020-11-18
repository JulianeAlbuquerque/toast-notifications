import React from "react";

const FlashNotificationsContext = React.createContext({
  messages: [],
  trigger: () => null
});

export default FlashNotificationsContext;
