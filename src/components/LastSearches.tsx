import React from "react";

import Button from "./Button";

interface LastSearchesProps {
  lastSearches: string[];
  onLastSearch: (searchTerm: string) => void;
}

const LastSearches: React.FC<LastSearchesProps> = ({
  lastSearches,
  onLastSearch,
}) => {
  return (
    <div className="mb-2">
      <h2 className="mb-2 text-2xl tracking-wide">Last searches:</h2>
      <span className="inline-flex gap-2">
        {lastSearches.map((searchTerm, index) => (
          <Button
            key={searchTerm + index}
            onClick={() => onLastSearch(searchTerm)}
            btnClasses="btn-small"
          >
            {searchTerm}
          </Button>
        ))}
      </span>
    </div>
  );
};

export default LastSearches;
