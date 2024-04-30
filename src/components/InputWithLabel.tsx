import React, { useEffect, useRef } from "react";
import stylex from "@stylexjs/stylex";

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
      <label htmlFor={id} {...stylex.props(styles.label)}>
        {children}
      </label>
      &nbsp;
      <input
        id={id}
        type={type}
        value={value}
        onChange={onSearchChange}
        ref={inputRef}
        {...stylex.props(styles.input)}
      />
    </>
  );
};

export default InputWithLabel;

const styles = stylex.create({
  label: {
    borderBottom: "1px solid #171212",
    borderLeft: "1px solid #171212",
    borderBottomLeftRadius: "3px",
    paddingLeft: "5px",
    fontSize: "24px",
  },
  input: {
    border: "none",
    paddingBottom: "4px",
    borderBottom: "1px solid #171212",
    backgroundColor: "transparent",
    fontSize: "24px",
  },
});
