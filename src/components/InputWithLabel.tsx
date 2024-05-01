import React, { useEffect, useRef } from "react";

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
    <div className="text-2xl px-3 py-1 border-b border-l border-solid border-[#171212] rounded-es">
      <label
        htmlFor={id}
        className="text-2xl"
      >
        {children}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onSearchChange}
        ref={inputRef}
        className={"bg-transparent p-1"}
      />
    </div>
  );
};

export default InputWithLabel;
