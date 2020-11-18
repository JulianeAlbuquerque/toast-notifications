import FlashNotificationsContext from "./FlashNotificationsContext";
import PropTypes from "prop-types";
import React, { Component } from "react";

class FlashMessagesProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOnStackLimit: false,
      primaryQueue: [],
      secondaryQueue: []
    };
  }

  componentDidUpdate() {
    if (
      this.state.isOnStackLimit &&
      this.state.primaryQueue.length < 4 &&
      this.state.secondaryQueue.length
    ) {
      let messageId;

      this.setState(
        (prevState) => {
          const lastMessageFromQueue = prevState.secondaryQueue.shift();
          const primaryQueue = [
            ...prevState.primaryQueue,
            lastMessageFromQueue
          ];
          const secondaryQueue = prevState.secondaryQueue;
          messageId = lastMessageFromQueue.id;

          return {
            primaryQueue,
            secondaryQueue,
            isOnStackLimit: primaryQueue.length === 4
          };
        },
        () => this.setTimerForMessage(messageId)
      );
    }
  }

  render() {
    const { children } = this.props;
    const { primaryQueue } = this.state;

    return (
      <FlashNotificationsContext.Provider
        value={{
          messages: primaryQueue,
          dismissMessage: this.removeMessageById,
          trigger: this.enqueue
        }}
      >
        {children}
      </FlashNotificationsContext.Provider>
    );
  }

  removeMessageById = (messageId) => {
    this.setState(({ primaryQueue }) => ({
      primaryQueue: primaryQueue.filter(({ id }) => id !== messageId)
    }));
  };

  setTimerForMessage = (messageId) => {
    setTimeout(() => this.removeMessageById(messageId), 5000);
  };

  pullSecondaryQueue = () => {};

  setStateToArray = (prop, newValue) => (state) => {
    const previousState = state[prop];
    const newState = [...previousState, newValue];

    return {
      [prop]: newState
    };
  };

  enqueue = (Component) => {
    if (!Component) return;

    const messageId = Math.floor(Math.random() * Math.floor(9999999));

    /*if (typeof props === "function") {
      const onDismiss = () => this.removeMessageById(messageId);
      props = props({ onDismiss });
    }*/

    //if (!React.isValidElement(props.children)) return;

    const messageProps = { el: Component, id: messageId };

    if (this.state.isOnStackLimit) {
      this.setState(this.setStateToArray("secondaryQueue", messageProps));

      return;
    }

    this.setState(
      (prevState) => {
        const primaryQueue = [...prevState.primaryQueue, messageProps];
        return { primaryQueue, isOnStackLimit: primaryQueue.length === 4 };
      },
      () => this.setTimerForMessage(messageId)
    );
  };
}

FlashMessagesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default FlashMessagesProvider;
