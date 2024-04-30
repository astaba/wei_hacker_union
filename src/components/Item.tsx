/// <reference types="vite-plugin-svgr/client" />

import React from "react";
import styled from "styled-components";

import { Story } from "../types/constants.ts";
import StyledButton from "../styled/StyledButton.ts";
import SquareCheckBig from "../assets/square-check-big.svg?react";

type ItemProps = {
  story: Story;
  onDismissStory: (item: Story) => void;
};
interface StyledColumnProps {
  width: string;
}

const Item: React.FC<ItemProps> = ({ story, onDismissStory }) => {
  return (
    <StyledItem className={"item"}>
      <StyledColumn width="40%">
        <a href={story.url}>{story.title}</a>
      </StyledColumn>
      <StyledColumn width="30%">{story.author}</StyledColumn>
      <StyledColumn width="10%">{story.num_comments}</StyledColumn>
      <StyledColumn width="10%">{story.points}</StyledColumn>
      <StyledColumn width="10%">
        <StyledBtnSmall
          type="button"
          onClick={() => onDismissStory(story)}
          aria-label="dismiss"
        >
          <SquareCheckBig width={"24"} height={"24"} />
        </StyledBtnSmall>
      </StyledColumn>
    </StyledItem>
  );
};

export default Item;

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;

const StyledColumn = styled.span<StyledColumnProps>`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: ${(props) => props.width};

  a {
    color: inherit;
  }
`;

const StyledBtnSmall = styled(StyledButton)`
  --pad-inl: var(--pad);
  border: none;
  line-height: 0;
`;
