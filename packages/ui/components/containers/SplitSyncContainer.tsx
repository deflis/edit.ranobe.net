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
import { atom, useAtom } from "jotai";
import { useConcurrency, useScrollPosition } from "hooks";
import { LexicalEditor } from "lexical";
import { useEffect, useLayoutEffect, useRef } from "react";

const scrollAtom = atom(0);

export const SplitSyncContainer: React.FC<{ className?: string }> = ({
  className,
}) => {
  const editorRef = useRef<LexicalEditor | null>(null);
  const [scroll, setScroll] = useAtom(scrollAtom);
  const [isScrolled, invokingScroll] = useConcurrency(10);
  const [isMoved, invokingMove] = useConcurrency(10);

  useEffect(() => {
    const handler = () => {
      const rootElement = editorRef.current?.getRootElement();
      if (rootElement && !isMoved) {
        const current = rootElement.scrollTop / rootElement.scrollHeight;
        setScroll(current);

        invokingScroll();
      }
    };
    const rootElement = editorRef.current?.getRootElement();

    if (rootElement) {
      rootElement.addEventListener("scroll", handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      if (rootElement) {
        rootElement.removeEventListener("scroll", handler);
      }
    };
  }, [editorRef, isMoved, invokingScroll]);

  useLayoutEffect(() => {
    const rootElement = editorRef.current?.getRootElement();
    if (rootElement && !isScrolled) {
      const top = rootElement.scrollHeight * scroll;
      rootElement.scroll({ top });
      invokingMove();
    }
  }, [editorRef, scroll]);

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
        <TextEditor
          className={split_container_internal}
          editorRef={editorRef}
        />
      </div>
      <div className={split_container}>
        <NovelRenderer className={split_container_internal} ref={ref2} />
      </div>
    </Split>
  );
};
