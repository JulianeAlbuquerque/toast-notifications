import React, { useContext, useCallback, useEffect, useState } from "react";
import FlashMessagesContext from "./FlashMessagesContext";

export function TriggerA() {
  const { trigger } = useContext(FlashMessagesContext);
  const onDismount = useCallback(() => console.log("tracking dismount A"), []);
  const onMount = useCallback(() => console.log("tracking mount A"), []);

  return (
    <div>
      <button
        onClick={() =>
          trigger({
            onDismount,
            onMount,
            children: (
              <>
                <p>Added to wishlist</p>
                <button
                  onClick={() => console.log("do something on view all click")}
                >
                  Click Me
                </button>
              </>
            )
          })
        }
      >
        TriggerA
      </button>
    </div>
  );
}

export function TriggerB() {
  const { trigger } = useContext(FlashMessagesContext);
  const onDismount = useCallback(() => console.log("tracking dismount B"), []);
  const onMount = useCallback(() => console.log("tracking mount B"), []);
  const Message = <p>Removed from bag</p>;

  return (
    <div>
      <button
        onClick={() =>
          trigger({
            onDismount,
            onMount,
            children: Message
          })
        }
      >
        TriggerB
      </button>
    </div>
  );
}

export function TriggerD() {
  const trigger = (params) => window.events.emit("triggerFlashMessage", params);

  return (
    <div>
      <button
        onClick={() =>
          trigger({
            children: <p>Added to Wishlist</p>
          })
        }
      >
        Trigger Without useContext
      </button>
    </div>
  );
}

function Clock() {
  const [timer, setTimer] = useState(new Date());

  useEffect(() => {
    const tick = setInterval(() => {
      setTimer(new Date());
    }, 1000);

    return () => {
      clearInterval(tick);
    };
  }, []);

  const leftPad = (val) => {
    if (val < 10) {
      return `0${val}`;
    }
    return `${val}`;
  };

  const hours = leftPad(timer.getHours());
  const minutes = leftPad(timer.getMinutes());
  const seconds = leftPad(timer.getSeconds());

  return (
    <>
      <span>{hours > 12 ? hours - 12 : hours}:</span>
      <span>{minutes}:</span>
      <span>{seconds}</span>
    </>
  );
}

export function TriggerC() {
  const { trigger } = useContext(FlashMessagesContext);

  return (
    <div>
      <button
        onClick={() =>
          trigger(({ onDismiss }) => ({
            children: (
              <>
                <Clock /> <Clock />
                <button onClick={onDismiss}>Close</button>
              </>
            )
          }))
        }
      >
        TriggerC
      </button>
    </div>
  );
}
