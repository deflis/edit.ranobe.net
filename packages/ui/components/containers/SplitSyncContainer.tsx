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
import { LexicalEditor } from "lexical";
import { useEffect, useRef } from "react";

export const SplitSyncContainer: React.FC<{ className?: string }> = ({
  className,
}) => {
  const editorRef = useRef<LexicalEditor | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const editorElement = editorRef.current?.getRootElement();
    const previewElement = previewRef.current;

    if (editorElement && previewElement) {
      const handler = function (this: HTMLElement) {
        const thisElement = this;
        const otherElement =
          this === editorElement ? previewElement : editorElement;
        // 他の要素がスクロールイベントをトリガーしないようにする
        otherElement.removeEventListener("scroll", handler);

        console.log(
          `scroll by ${thisElement === editorElement ? "editor" : "preview"}`
        );
        const top =
          (otherElement.scrollHeight * thisElement.scrollTop) /
          thisElement.scrollHeight;
        const left =
          (otherElement.scrollWidth * thisElement.scrollLeft) /
          thisElement.scrollWidth;
        otherElement.scroll({ top, left });
        setTimeout(() => {
          otherElement.addEventListener("scroll", handler, {
            capture: false,
            passive: true,
          });
        }, 0);
      };
      editorElement.addEventListener("scroll", handler, {
        capture: false,
        passive: true,
      });
      previewElement.addEventListener("scroll", handler, {
        capture: false,
        passive: true,
      });
      return () => {
        editorElement.removeEventListener("scroll", handler);
        previewElement.removeEventListener("scroll", handler);
      };
    }
  }, [editorRef, previewRef]);

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
        <TextEditor
          className={split_container_internal}
          editorRef={editorRef}
        />
      </div>
      <div className={split_container}>
        <NovelRenderer className={split_container_internal} ref={previewRef} />
      </div>
    </Split>
  );
};
