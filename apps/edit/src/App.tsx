import { useCallback, useState } from "react";
import { Button } from "ui/components/Button";

import Split from "react-split";
import { TextEditor } from "ui/components/TextEditor";
import { NovelRenderer } from "ui/components/NovelRenderer";

function App() {
  return (
    <Split
      className="flex w-full h-full"
      gutter={() => {
        const gutterElement = document.createElement("div");
        // ガター幅、ホバー時の挙動、アニメーションを指定
        // ※tailwindcssのクラスについては別途公式等参照ください
        gutterElement.className = `w-[2px] bg-indigo-500 hover:cursor-col-resize hover:w-4 hover:border-x hover:bg-indigo-700 transition-all delay-300 duration-300 ease-in-out`;
        return gutterElement;
      }}
      // デフォルトのガター幅を無効にするために指定
      gutterStyle={() => ({})}
      sizes={[50, 50]}
    >
      <div className="w-full h-full">
        <TextEditor />
      </div>
      <div className="w-full h-full overflow-auto">
        <NovelRenderer />
      </div>
    </Split>
  );
}

export default App;
