import React from "react";

import { Story } from "../types/constants.ts";

type ItemProps = {
  story: Story;
};

const Item: React.FC<ItemProps> = ({
  story: { url, title, author, num_comments, points },
}) => {
  return (
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
    </li>
  );
};

export default Item;
