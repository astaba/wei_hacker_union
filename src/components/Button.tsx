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
  const classes = btnClasses ? ` ${btnClasses}` : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-xl transition-all border border-solid border-[#171212] rounded-[3px] hover:bg-[#171212] hover:text-white${classes}`}
    >
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
