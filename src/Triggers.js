import React, { useContext } from "react";
import FlashNotificationsContext from "./FlashNotificationsContext";
import {
  FlashNotificationsText,
  FlashNotificationsButton
} from "./FlashNotifications";

function useFlashNotifications(component) {
  const { trigger } = useContext(FlashNotificationsContext);
  return {
    display: () => trigger(component),
    dismiss: () => console.log("dismiss")
  };
}

export default function Trigger() {
  const { display, dismiss } = useFlashNotifications(
    <>
      <FlashNotificationsText>Added to wishlist</FlashNotificationsText>
      <FlashNotificationsButton onClick={dismiss}>
        View
      </FlashNotificationsButton>
    </>
  );

  return <button onClick={() => display()}>Trigger</button>;
}
