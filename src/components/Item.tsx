/// <reference types="vite-plugin-svgr/client" />

import React from "react";

import { Story } from "../types/constants.ts";
import Button from "./Button.tsx";
import SquareCheckBig from "../assets/square-check-big.svg?react";
import itemStyles from "./Item.module.css";
import btnStyles from "./Button.module.css";

type ItemProps = {
  story: Story;
  onDismissStory: (item: Story) => void;
};

const Item: React.FC<ItemProps> = ({ story, onDismissStory }) => {
  return (
    <li className={itemStyles.item}>
      <span style={{ width: "40%" }}>
        <a href={story.url}>{story.title}</a>
      </span>
      <span style={{ width: "30%" }}>{story.author}</span>
      <span style={{ width: "10%" }}>{story.num_comments}</span>
      <span style={{ width: "10%" }}>{story.points}</span>
      <span style={{ width: "10%" }}>
        <Button
          type="button"
          onClick={() => onDismissStory(story)}
          btnClasses={btnStyles.button_small}
          aria-label="dismiss"
        >
          <SquareCheckBig width={"24"} height={"24"} />
        </Button>
      </span>
    </li>
  );
};

export default Item;
