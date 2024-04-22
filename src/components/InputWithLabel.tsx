import React from "react";

type InputWithLaebelProps = {
  id: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  isFocused?: boolean;
};

const InputWithLabel: React.FC<InputWithLaebelProps> = ({
  id,
  type = "text",
  value,
  onChange,
  children,
  isFocused,
}) => {
  return (
    <>
      <label htmlFor={id}>{children}</label>&nbsp;
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoFocus={isFocused}
      />
    </>
  );
};

export default InputWithLabel;
