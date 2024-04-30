import React, { useEffect, useRef } from "react";
import styled from "styled-components";

type InputWithLaebelProps = {
  id: string;
  type?: string;
  value: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  isFocused?: boolean;
};

const InputWithLabel: React.FC<InputWithLaebelProps> = ({
  id,
  type = "text",
  value,
  onSearchChange,
  children,
  isFocused,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isFocused && inputRef.current) inputRef.current.focus();
  }, [isFocused]);

  return (
    <>
      <StyledLabel htmlFor={id} className={"label"}>
        {children}
      </StyledLabel>
      &nbsp;
      <StyledInput
        id={id}
        type={type}
        value={value}
        onChange={onSearchChange}
        ref={inputRef}
        className={"input"}
      />
    </>
  );
};

export default InputWithLabel;

const StyledLabel = styled.label`
  border-bottom: 1px solid #171212;
  border-left: 1px solid #171212;
  border-bottom-left-radius: 3px;
  padding-left: 5px;
  font-size: 24px;
`;

const StyledInput = styled.input`
  border: none;
  padding-bottom: 4px;
  border-bottom: 1px solid #171212;
  background-color: transparent;
  font-size: 24px;
`;
