import React from "react";

import Item from "./Item.tsx";
import { Story } from "../types/constants.ts";

type ListProps = {
  stories: Story[];
  onDismissStory: (item: Story) => void;
};

// React.memo API memoizes incoming props.
const List: React.FC<ListProps> = React.memo(({ stories, onDismissStory }) => {
  // console.log("B: List");
  return (
    <ul>
      {stories.map((story) => (
        <Item
          key={story.objectID}
          story={story}
          onDismissStory={onDismissStory}
        />
      ))}
    </ul>
  );
});

export default List;
