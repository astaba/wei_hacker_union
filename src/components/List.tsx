import React from "react";

import Item from "./Item.tsx";
import { Story } from "../types/constants.ts";

type ListProps = {
  stories: Story[];
  onDismissStory: (item: Story) => void;
};

// React.memo API memoizes incoming props.
const List: React.FC<ListProps> = React.memo((props) => {
  // console.log("B: List");
  return (
    <ul>
      {props.stories.map(({ objectID, ...item }) => (
        <Item
          key={objectID}
          story={{ objectID, ...item }}
          onDismissStory={props.onDismissStory}
        />
      ))}
    </ul>
  );
});

export default List;
