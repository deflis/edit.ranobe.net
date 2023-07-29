import { useHandleChangeText, useSetText, useText } from "hooks";
import { editor, limit } from "./TextEditor.module.css";
import clsx from "clsx";
import {
  MutableRefObject,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useWidthMode } from "../containers/Container";

import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  EditorState,
  LexicalEditor,
} from "lexical";
import { useEffect } from "react";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";

export const TextEditor: React.FC<{
  className?: string;
  editorRef?:
    | React.RefCallback<LexicalEditor | null>
    | MutableRefObject<LexicalEditor | null>;
}> = ({ className, editorRef }) => {
  const text = useText();
  const setText = useSetText();

  const onChange = useCallback(
    (editorState: EditorState) => {
      editorState.read(() => {
        const text = $getRoot().getTextContent();
        setText(text);
      });
    },
    [setText]
  );

  const initialConfig: InitialConfigType = useMemo(
    () => ({
      namespace: "NovelEditor",
      theme: {},
      onError: (error: Error) => {
        console.error(error);
      },
      editorState: () => {
        const paragraph = $createParagraphNode();
        paragraph.append($createTextNode(text));
        $getRoot().append(paragraph);
      },
    }),
    []
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={
          <ContentEditable
            className={clsx(editor, useWidthMode() && limit, className)}
          />
        }
        placeholder={<div>書く…</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      {editorRef ? <EditorRefPlugin editorRef={editorRef as any} /> : ""}
    </LexicalComposer>
  );
};
