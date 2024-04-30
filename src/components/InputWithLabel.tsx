import React, { useEffect, useRef } from "react";

import styles from "./InputWithLabel.module.css";

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
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
      &nbsp;
      <input
        id={id}
        type={type}
        value={value}
        onChange={onSearchChange}
        ref={inputRef}
        className={styles.input}
      />
    </>
  );
};

export default InputWithLabel;
