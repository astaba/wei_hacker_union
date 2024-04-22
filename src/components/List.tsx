import Item from "./Item.tsx";
import { Story } from "../types/constants.ts";

type ListProps = {
  stories: Story[];
  onRemove: (item: Story) => void;
};

const List: React.FC<ListProps> = (props) => {
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
};

export default List;
