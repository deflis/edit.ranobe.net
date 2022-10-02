import { useParsedText } from "hooks";
import { NovelLineElement } from "parser";
import { Fragment } from "react";
import { container } from "./NovelRenderer.module.css";

export const NovelRenderer: React.FC = () => {
  const story = useParsedText();
  return (
    <div className={container}>
      {story.map((line, lineIndex) => (
        <p key={lineIndex}>
          {line.map((element, elementIndex) => (
            <LineElementRender
              lineElement={element}
              key={`${lineIndex}-${elementIndex}`}
            />
          ))}
          {line.length === 0 && "\u00A0"}
        </p>
      ))}
    </div>
  );
};

const LineElementRender: React.VFC<{
  lineElement: NovelLineElement;
}> = ({ lineElement }) => {
  if (typeof lineElement === "string") {
    return <>{spToNbsp(lineElement)}</>;
  }

  switch (lineElement.type) {
    case "ruby":
      return (
        <ruby>
          <rp>|</rp>
          {spToNbsp(lineElement.text)}
          <rp>《</rp>
          <rt>{spToNbsp(lineElement.yomi)}</rt>
          <rp>》</rp>
        </ruby>
      );
    case "bouten":
      return (
        <ruby>
          <rp>《《</rp>
          {Array.from(spToNbsp(lineElement.text)).map((char, i) => (
            <Fragment key={i}>
              {char}
              <rt>・</rt>
            </Fragment>
          ))}
          <rp>》》</rp>
        </ruby>
      );
  }
};

function spToNbsp(str: string): string {
  return str.replace(/ /g, "\u00A0");
}
