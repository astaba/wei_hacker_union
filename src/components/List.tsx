import React from "react";
import { sortBy } from "lodash";

import Item from "./Item.tsx";
import { Story, Columns } from "../types/constants.ts";

type ListProps = {
  stories: Story[];
  onDismissStory: (item: Story) => void;
};
interface Sorters {
  [key: string]: (list: Story[]) => Story[];
}

const columns: Columns = {
  title: { label: "Title", sortkey: "TITLE", width: "w-5/12" },
  author: { label: "Author", sortkey: "AUTHOR", width: "w-2/12" },
  num_comments: { label: "Comments", sortkey: "COMMENTS", width: "w-2/12" },
  points: { label: "Points", sortkey: "POINTS", width: "w-2/12" },
  action: { label: "Actions", sortkey: "", width: "w-1/12" },
};

const sorters: Sorters = {
  NONE: (list: Story[]) => list,
  TITLE: (list: Story[]) => sortBy(list, "title"),
  AUTHOR: (list: Story[]) =>
    sortBy(list, (category) => category["author"].toLowerCase()),
  COMMENTS: (list: Story[]) => sortBy(list, "num_comments").reverse(),
  POINTS: (list: Story[]) => sortBy(list, "points").reverse(),
};

const List: React.FC<ListProps> = ({ stories, onDismissStory }) => {
  const [sort, setSort] = React.useState("NONE");

  const handleSort = (sortKey: string) => {
    setSort(sortKey);
  };

  const sortFunction = sorters[sort];
  const sortedStories = sortFunction(stories);

  return (
    <ul>
      <li className={"flex"}>
        {Object.keys(columns).map((column) => (
          <span
            key={columns[column].sortkey}
            className={`listTitle ${columns[column].width}`}
          >
            {columns[column].sortkey ? (
              <button
                type="button"
                onClick={() => handleSort(columns[column].sortkey)}
              >
                {columns[column].label}
              </button>
            ) : undefined}
          </span>
        ))}
      </li>
      {sortedStories.map((story) => (
        <Item
          key={story.objectID}
          story={story}
          onDismissStory={onDismissStory}
          columns={columns}
        />
      ))}
    </ul>
  );
};

export default List;
