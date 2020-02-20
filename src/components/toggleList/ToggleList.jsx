import React from "react";

export const ToggleList = ({ handleClick, children }) => {
  return (
    <button type="button" className="custom-button" onClick={handleClick}>
      {children}
    </button>
  );
};
