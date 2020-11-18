import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";

import FlashNotificationsContext from "./FlashNotificationsContext";

const FlashNotificationsProvider = ({ children }) => {
  const [isOnStackLimit, setIsOnStackLimit] = useState(false);
  const [primaryQueue, setPrimaryQueue] = useState([]);
  const [secondaryQueue, setSecondaryQueue] = useState([]);

  const removeMessageById = useCallback(
    (messageId) => {
      setPrimaryQueue(primaryQueue.filter(({ id }) => id !== messageId));
    },
    [primaryQueue]
  );

  const setTimerForMessage = useCallback(
    (messageId) => {
      setTimeout(() => removeMessageById(messageId), 5000);
    },
    [removeMessageById]
  );

  const enqueue = useCallback(
    (Component) => {
      if (!Component) return;

      // if (!React.isValidElement(props.children)) return;

      const messageId = Math.floor(Math.random() * Math.floor(9999999));

      const messageProps = { el: Component, id: messageId };

      if (isOnStackLimit) {
        setSecondaryQueue([...secondaryQueue, messageProps]);

        return;
      }

      setPrimaryQueue([...primaryQueue, messageProps]);

      setIsOnStackLimit(() => primaryQueue.length === 4);

      setTimerForMessage(messageId);
    },
    [isOnStackLimit, primaryQueue, setTimerForMessage, secondaryQueue]
  );

  useEffect(() => {
    if (isOnStackLimit && primaryQueue.length < 4 && secondaryQueue.length) {
      let messageId;
      const lastMessageFromQueue = secondaryQueue.shift();
      setPrimaryQueue([...primaryQueue, lastMessageFromQueue]);
      setSecondaryQueue(secondaryQueue);
      setIsOnStackLimit(primaryQueue.length === 4);
      messageId = lastMessageFromQueue.id;

      setTimerForMessage(messageId);
    }
  }, [isOnStackLimit, primaryQueue, secondaryQueue, setTimerForMessage]);

  return (
    <FlashNotificationsContext.Provider
      value={{
        messages: primaryQueue,
        trigger: enqueue
      }}
    >
      {children}
    </FlashNotificationsContext.Provider>
  );
};

FlashNotificationsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default FlashNotificationsProvider;
