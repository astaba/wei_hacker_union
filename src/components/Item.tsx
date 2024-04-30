/// <reference types="vite-plugin-svgr/client" />

import React from "react";
import stylex from "@stylexjs/stylex";

import { Story } from "../types/constants.ts";
import Button from "./Button.tsx";
import SquareCheckBig from "../assets/square-check-big.svg?react";

type ItemProps = {
  story: Story;
  onDismissStory: (item: Story) => void;
};

const Item: React.FC<ItemProps> = ({ story, onDismissStory }) => {
  return (
    <li {...stylex.props(styles.item)}>
      <span {...stylex.props(styles.span, styles.span_40)}>
        <a href={story.url}>{story.title}</a>
      </span>
      <span {...stylex.props(styles.span, styles.span_30)}>{story.author}</span>
      <span {...stylex.props(styles.span, styles.span_10)}>
        {story.num_comments}
      </span>
      <span {...stylex.props(styles.span, styles.span_10)}>{story.points}</span>
      <span {...stylex.props(styles.span, styles.span_10)}>
        <button
          type="button"
          onClick={() => onDismissStory(story)}
          aria-label="dismiss"
          {...stylex.props(styles.button)}
        >
          <SquareCheckBig width={"24"} height={"24"} />
        </button>
      </span>
    </li>
  );
};

export default Item;

const styles = stylex.create({
  item: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "5px",
  },
  span: {
    padding: "0 5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  span_10: { width: "10%" },
  span_30: { width: "30%" },
  span_40: { width: "40%" },
  a: {
    color: "inherit",
  },
  button: {
    color: { default: null, ":hover": "#FFFFFF" },
    background: { default: "transparent", ":hover": "#171212" },
    border: "none",
    borderRadius: "3px",
    paddingInline: "0.25em",
    paddingBlock: "0.25em",
    lineHeight: "0",
    cursor: "pointer",
    transition: "all 0.1s ease-in",
  },
});
