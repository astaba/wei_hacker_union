import React from "react";

interface InputWithLaebelProps {
  id: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLaebelProps>(
  ({ id, type = "text", value, onChange, children }, ref) => {
    return (
      <>
        <label htmlFor={id}>{children}</label>&nbsp;
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          ref={ref}
        />
      </>
    );
  },
);

export default InputWithLabel;
