import React from "react";

import { Story } from "../types/constants.ts";

type ItemProps = {
  story: Story;
};

const Item: React.FC<ItemProps> = (props) => {
  return (
    <li key={props.story.objectID}>
      <span>
        <a href={props.story.url}>{props.story.title}</a>
      </span>
      <span>{props.story.author}</span>
      <span>{props.story.num_comments}</span>
      <span>{props.story.points}</span>
    </li>
  );
};

export default Item;
