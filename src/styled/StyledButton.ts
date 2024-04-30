import styled from "styled-components";

const StyledButton = styled.button`
  --pad: 0.25em;
  background: transparent;
  border: 1px solid #171212;
  border-radius: 3px;
  padding-inline: var(--pad-inl, calc(var(--pad) * 2.5));
  padding-block: var(--pad-blo, calc(var(--pad) * 1));
  cursor: pointer;
  transition: all 0.1s ease-in;

  &:hover {
    background: #171212;
    color: #ffffff;
  }
`;

export default StyledButton;
