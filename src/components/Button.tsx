import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  className,
  children,
}) => {
  const classes = className ? ` ${className}` : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn${classes}`}
    >
      {children}
    </button>
  );
};

export default Button;

//const ButtonInline = ({ children, ...props }) => {
//  return (
//    <Button className="inline-button" {...props}>
//      {children}
//    </Button>
//  );
//};
