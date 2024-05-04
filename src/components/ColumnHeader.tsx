import Button from "./Button";
import { ColumnDetails } from "../types/constants.ts";
import ChevronDown from "../assets/chevron-down.svg?react";

interface ColumnHeaderProps {
  column: ColumnDetails;
  onSort: (sortKey: string) => void;
  sort: {
    sortingKey: string;
    isReverse: boolean;
  };
}
const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  column,
  onSort,
  sort,
}) => {
  const iconOpacity = sort.sortingKey === column.sortkey ? "" : "opacity-0";
  const iconRotation = sort.isReverse ? "rotate-180" : "";

  return (
    <span key={column.sortkey} className={`ulHeadItem ${column.width}`}>
      {column.sortkey ? (
        <Button
          type="button"
          onClick={() => onSort(column.sortkey)}
          btnClasses="btn-col"
        >
          {column.label}
          <ChevronDown
            className={`size-[22px] flex-shrink-0 ${iconRotation} ${iconOpacity} transition-all`}
          />
        </Button>
      ) : undefined}
    </span>
  );
};

export default ColumnHeader;
