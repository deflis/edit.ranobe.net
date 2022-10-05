import { useHandleChangeText, useText } from "hooks";
import { editor } from "./TextEditor.module.css";
import clsx from "clsx";
import { forwardRef } from "react";

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
      className={clsx(editor, className)}
      placeholder="書く…"
    ></textarea>
  );
});
