import React from "react";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

export const BookMark = ({ watchlist }) => {
  return <div>{watchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}</div>;
};
