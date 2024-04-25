import React from "react";

import { Story } from "../types/constants.ts";

type ItemProps = {
  story: Story;
  onDismissStory: (item: Story) => void;
};

const Item: React.FC<ItemProps> = ({ story, onDismissStory }) => {
  return (
    <li>
      <span>
        <a href={story.url}>{story.title}</a>
      </span>
      <span>{story.author}</span>
      <span>{story.num_comments}</span>
      <span>{story.points}</span>
      <button type="button" onClick={() => onDismissStory(story)}>
        Dismiss
      </button>
    </li>
  );
};

export default Item;
