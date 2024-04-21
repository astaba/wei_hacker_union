import React from "react";

import { Story } from "../types/constants.ts";

type ItemProps = {
  story: Story;
};

const Item: React.FC<ItemProps> = ({ story }) => {
  return (
    <li key={story.objectID}>
      <span>
        <a href={story.url}>{story.title}</a>
      </span>
      <span>{story.author}</span>
      <span>{story.num_comments}</span>
      <span>{story.points}</span>
    </li>
  );
};

export default Item;
