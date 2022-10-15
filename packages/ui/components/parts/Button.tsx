import React from "react";
import styles, { button } from "./Button.module.css";
import clsx from "clsx";

type ButtonColorType = "primary";
type ButtonColorProps = {
  color?: ButtonColorType;
};
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonColorProps;

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  color,
  ...props
}) => (
  <button
    className={clsx(button, className, color && styles[color])}
    {...props}
  >
    {children}
  </button>
);
