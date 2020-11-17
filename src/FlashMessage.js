import React, { useEffect } from "react";

function FlashMessage({ id, onMount, onDismount, children }) {
  useEffect(() => {
    console.time("message: " + id);
    onMount();

    return () => {
      console.timeEnd("message: " + id);
      onDismount();
    };
  }, []);

  return (
    <div
      style={{
        background: "#222",
        color: "#fff",
        minWidth: "360px"
      }}
    >
      {children}
    </div>
  );
}

FlashMessage.defaultProps = {
  onMount: () => null,
  onDismount: () => null
};

export default FlashMessage;
