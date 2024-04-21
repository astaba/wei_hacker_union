import Item from "./Item.tsx";
import { Story } from "../types/constants.ts";

type ListProps = {
  stories: Story[];
};

const List: React.FC<ListProps> = ({ stories }) => {
  return (
    <ul>
      {stories.map((story) => (
        <Item key={story.objectID} story={story} />
      ))}
    </ul>
  );
};

export default List;
