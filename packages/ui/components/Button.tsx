import { button } from "./Button.module.css";

export const Button: React.FC<{ children?: string }> = ({ children }) => {
  return <button className={button}>{children}</button>;
};
