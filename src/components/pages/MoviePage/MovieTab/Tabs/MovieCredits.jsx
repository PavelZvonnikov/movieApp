import React from "react";
import Gallery from "react-grid-gallery";

export const MovieCredits = ({ cast }) => {
  return (
    <div className="creditsWrapper mt-5">
      <Gallery images={cast} enableImageSelection={false} />
    </div>
  );
};
