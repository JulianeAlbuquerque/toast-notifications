import FlashMessagesContext from "./FlashMessagesContext";
import PropTypes from "prop-types";
import React, { Component, useCallback, useEffect, useState } from "react";

const FlashMessagesProvider = ({ children }) => {
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

  const setStateToArray = (prop, newValue) => (state) => {
    const previousState = state[prop];
    const newState = [...previousState, newValue];

    return {
      [prop]: newState
    };
  };

  const enqueue = useCallback(
    (props) => {
      if (!props) return;

      const messageId = Math.floor(Math.random() * Math.floor(9999999));

      if (typeof props === "function") {
        const onDismiss = () => this.removeMessageById(messageId);
        props = props({ onDismiss });
      }

      if (!React.isValidElement(props.children)) return;

      const messageProps = { ...props, id: messageId };

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
    window.events.on("triggerFlashMessage", enqueue);
  }, [enqueue]);

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
    <FlashMessagesContext.Provider
      value={{
        messages: primaryQueue,
        trigger: enqueue
      }}
    >
      {children}
    </FlashMessagesContext.Provider>
  );
};

FlashMessagesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default FlashMessagesProvider;
