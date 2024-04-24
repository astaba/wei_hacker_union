import React from "react";

import Item from "./Item.tsx";
import { Story } from "../types/constants.ts";

type ListProps = {
  stories: Story[];
  onRemove: (item: Story) => void;
};

// React.memo API memoizes incoming props.
const List: React.FC<ListProps> = React.memo((props) => {
  console.log("B: List");
  return (
    <ul>
      {props.stories.map(({ objectID, ...item }) => (
        <Item
          key={objectID}
          story={{ objectID, ...item }}
          onRemove={props.onRemove}
        />
      ))}
    </ul>
  );
});

export default List;
