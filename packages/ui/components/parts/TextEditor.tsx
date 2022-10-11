import { useHandleChangeText, useText } from "hooks";
import { editor, limit } from "./TextEditor.module.css";
import clsx from "clsx";
import { forwardRef } from "react";
import { useWidthMode } from "../containers/Container";

export const TextEditor = forwardRef<
  HTMLTextAreaElement,
  { className?: string }
>(({ className }, ref) => {
  const text = useText();
  const handleChangeText = useHandleChangeText();
  return (
    <textarea
      ref={ref}
      value={text}
      onChange={handleChangeText}
      className={clsx(editor, useWidthMode() && limit, className)}
      placeholder="書く…"
    ></textarea>
  );
});
