import React from "react";

import { Story } from "../types/constants.ts";

type ItemProps = {
  story: Story;
  onDismissStory: (item: Story) => void;
};

const Item: React.FC<ItemProps> = ({ story, onDismissStory }) => {
  return (
    <li className={"item"}>
      <span style={{ width: "40%" }}>
        <a href={story.url}>{story.title}</a>
      </span>
      <span style={{ width: "30%" }}>{story.author}</span>
      <span style={{ width: "10%" }}>{story.num_comments}</span>
      <span style={{ width: "10%" }}>{story.points}</span>
      <span style={{ width: "10%" }}>
        <button
          type="button"
          onClick={() => onDismissStory(story)}
          className={"button button_small"}
        >
          Dismiss
        </button>
      </span>
    </li>
  );
};

export default Item;
