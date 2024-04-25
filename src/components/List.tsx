import React from "react";

import Item from "./Item.tsx";
import { Story } from "../types/constants.ts";

type ListProps = {
  stories: Story[];
  onDismissStory: (item: Story) => void;
};

const List: React.FC<ListProps> = ({ stories, onDismissStory }) => {
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
};

export default List;
