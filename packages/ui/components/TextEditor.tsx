import { useHandleChangeText, useText } from "hooks";
import { editor } from "./TextEditor.module.css";

export const TextEditor: React.FC = () => {
  const text = useText();
  const handleChangeText = useHandleChangeText();
  return (
    <textarea
      value={text}
      onChange={handleChangeText}
      className={editor}
      placeholder="書く…"
    ></textarea>
  );
};
