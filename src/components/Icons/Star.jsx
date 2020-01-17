import React from "react";
import StarIcon from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";

export const Star = ({ favorite }) => {
  return <div>{favorite ? <StarIcon /> : <StarBorder />}</div>;
};
