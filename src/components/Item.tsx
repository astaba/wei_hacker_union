/// <reference types="vite-plugin-svgr/client" />

import React from "react";

import { Story, Columns } from "../types/constants.ts";
import Button from "./Button.tsx";
import SquareCheckBig from "../assets/square-check-big.svg?react";

type ItemProps = {
  story: Story;
  onDismissStory: (item: Story) => void;
  columns: Columns;
};

const Item: React.FC<ItemProps> = ({ story, onDismissStory, columns }) => {
  return (
    <li className={"flex items-center my-1.5 *:px-1"}>
      <span className={`column ${columns.title.width}`}>
        <a href={story.url} className="text-inherit hover:underline">
          {story.title}
        </a>
      </span>
      <span className={`column ${columns.author.width}`}>{story.author}</span>
      <span className={`column text-right ${columns.num_comments.width}`}>
        {story.num_comments}
      </span>
      <span className={`column text-right ${columns.points.width}`}>
        {story.points}
      </span>
      <span
        className={`column inline-flex justify-center ${columns.action.width} `}
      >
        <Button
          type="button"
          onClick={() => onDismissStory(story)}
          className="btn-svg"
          aria-label="dismiss"
        >
          <SquareCheckBig width={"24"} height={"24"} />
        </Button>
      </span>
    </li>
  );
};

export default Item;
