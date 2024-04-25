import React from "react";

import Item from "./Item.tsx";
import { Story } from "../types/constants.ts";

type ListProps = {
  stories: Story[];
  onDismissStory: (item: Story) => void;
};

class List extends React.Component<ListProps> {
  constructor(props: ListProps) {
    super(props);
  }

  render() {
    const { stories, onDismissStory } = this.props;
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
  }
}

export default List;
