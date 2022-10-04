import { forwardRef } from "react";
import clsx from "clsx";
import { menubar } from "./MenuBar.module.css";
import { BsFileTextFill } from "react-icons/bs";

export const MenuBar = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    return (
      <header ref={ref} className={clsx(menubar, className)}>
        <span>
          <BsFileTextFill />
        </span>
        <span>File</span>
        <span>View</span>
        <span className="flex-grow"></span>
        <span></span>
      </header>
    );
  }
);
