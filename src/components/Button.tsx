import React from "react";

import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnClasses: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  btnClasses,
  children,
}) => {
  const classes = btnClasses ? `${styles.button} ${btnClasses}` : styles.button;

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
