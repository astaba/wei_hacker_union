import React from "react";

type InputWithLaebelProps = {
  id: string;
  type?: string;
  value: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputWithLabel: React.FC<InputWithLaebelProps> = ({
  id,
  type = "text",
  value,
  label,
  onChange,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}: </label>&nbsp;
      <input id={id} type={type} value={value} onChange={onChange} />
    </>
  );
};

export default InputWithLabel;
