import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnClasses: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  btnClasses,
  children,
}) => {
  const classes = btnClasses ? `button ${btnClasses}` : "button";

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;

//const ButtonInline = ({ children, ...props }) => {
//  return (
//    <Button btnClasses="inline-button" {...props}>
//      {children}
//    </Button>
//  );
//};
