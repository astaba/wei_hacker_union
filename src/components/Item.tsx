/// <reference types="vite-plugin-svgr/client" />

import React from "react";

import { Story } from "../types/constants.ts";
import Button from "./Button.tsx";
import SquareCheckBig from "../assets/square-check-big.svg?react";

type ItemProps = {
  story: Story;
  onDismissStory: (item: Story) => void;
};

const Item: React.FC<ItemProps> = ({ story, onDismissStory }) => {
  return (
    <li className={"flex items-center my-1.5 *:px-1"}>
      <span className={"column w-5/12"}>
        <a href={story.url} className="text-inherit hover:underline">
          {story.title}
        </a>
      </span>
      <span className={"column w-3/12"}>{story.author}</span>
      <span className={"column w-1/12"}>{story.num_comments}</span>
      <span className={"column w-1/12"}>{story.points}</span>
      <span className={"column inline-flex justify-center w-2/12"}>
        <Button
          type="button"
          onClick={() => onDismissStory(story)}
          btnClasses={"border-none leading-none p-0.5"}
          aria-label="dismiss"
        >
          <SquareCheckBig width={"24"} height={"24"} />
        </Button>
      </span>
    </li>
  );
};

export default Item;
