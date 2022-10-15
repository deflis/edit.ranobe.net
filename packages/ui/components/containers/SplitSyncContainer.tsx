import Split from "react-split";
import { NovelRenderer } from "../parts/NovelRenderer";
import { TextEditor } from "../parts/TextEditor";
import {
  container,
  split_container,
  split_container_internal,
  gutter,
} from "./SplitSyncContainer.module.css";
import clsx from "clsx";
import { atom } from "jotai";
import { useScrollPosition } from "hooks";

const scrollAtom = atom(0);

export const SplitSyncContainer: React.FC<{ className?: string }> = ({
  className,
}) => {
  const ref1 = useScrollPosition<HTMLTextAreaElement>(scrollAtom);
  const ref2 = useScrollPosition<HTMLDivElement>(scrollAtom);
  return (
    <Split
      className={clsx(container, className)}
      gutter={() => {
        const gutterElement = document.createElement("div");
        gutterElement.className = gutter;
        return gutterElement;
      }}
      // デフォルトのガター幅を無効にするために指定
      gutterStyle={() => ({})}
      sizes={[50, 50]}
    >
      <div className={split_container}>
        <TextEditor className={split_container_internal} ref={ref1} />
      </div>
      <div className={split_container}>
        <NovelRenderer className={split_container_internal} ref={ref2} />
      </div>
    </Split>
  );
};
