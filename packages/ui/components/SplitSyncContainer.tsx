import Split from "react-split";
import { NovelRenderer } from "./NovelRenderer";
import { TextEditor } from "./TextEditor";
import { gutter } from "./SplitSyncContainer.module.css";
import clsx from "clsx";
import { atom } from "jotai";
import { useScrollPositon } from "hooks";

const scrollAtom = atom(0);

export const SplitSyncContainer: React.FC<{ className?: string }> = ({
  className,
}) => {
  const ref1 = useScrollPositon<HTMLTextAreaElement>(scrollAtom);
  const ref2 = useScrollPositon<HTMLDivElement>(scrollAtom);
  return (
    <Split
      className={clsx("flex w-full h-full", className)}
      gutter={() => {
        const gutterElement = document.createElement("div");
        // ガター幅、ホバー時の挙動、アニメーションを指定
        // ※tailwindcssのクラスについては別途公式等参照ください
        gutterElement.className = gutter;
        return gutterElement;
      }}
      // デフォルトのガター幅を無効にするために指定
      gutterStyle={() => ({})}
      sizes={[50, 50]}
    >
      <div className="h-full">
        <TextEditor className="mx-auto" ref={ref1} />
      </div>
      <div className="h-full mx-auto">
        <NovelRenderer className="mx-auto" ref={ref2} />
      </div>
    </Split>
  );
};
