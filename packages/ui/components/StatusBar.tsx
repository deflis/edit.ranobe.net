import { forwardRef } from "react";
import clsx from "clsx";
import { useTextLength, useTextLengthForParse } from "hooks";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsTextLeft } from "react-icons/bs";
import { statusbar } from "./StatusBar.module.css";

export const StatusBar = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    const length = useTextLength();
    const lengthForParse = useTextLengthForParse();
    return (
      <footer ref={ref} className={clsx(statusbar, className)}>
        <span className="flex-grow"></span>
        <span>
          <BsTextLeft />
          {length}
        </span>
        <span>
          <HiOutlineDocumentText />
          {lengthForParse}
        </span>
      </footer>
    );
  }
);
