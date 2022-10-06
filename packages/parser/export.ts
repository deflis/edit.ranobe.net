import { NovelLines, NovelLineElement } from "./types";

export const exportForKakuyomu = (novel: NovelLines) => {
  novel.map((line) => line.map(lineElementRenderForKakuyomu).join()).join("\n");
};
export const exportForNarou = (novel: NovelLines) => {
  novel.map((line) => line.map(lineElementRenderForNarou).join()).join("\n");
};

export const exportForPixiv = (novel: NovelLines) => {
  novel.map((line) => line.map(lineElementRenderForPixiv).join()).join("\n");
};

function lineElementRenderForKakuyomu(lineElement: NovelLineElement): string {
  if (typeof lineElement === "string") {
    return lineElement;
  }

  switch (lineElement.type) {
    case "ruby":
      return rubyForNarou(lineElement.text, lineElement.yomi);
    case "bouten":
      return `《《${lineElement.text}》》`;
  }
}

function lineElementRenderForNarou(lineElement: NovelLineElement): string {
  if (typeof lineElement === "string") {
    return lineElement;
  }

  switch (lineElement.type) {
    case "ruby":
      return rubyForNarou(lineElement.text, lineElement.yomi);
    case "bouten":
      return Array.from(lineElement.text)
        .map((s) => rubyForNarou(s, "・"))
        .join();
  }
}

function rubyForNarou(text: string, yomi: string) {
  return `|${text}《${yomi}》`;
}

function lineElementRenderForPixiv(lineElement: NovelLineElement): string {
  if (typeof lineElement === "string") {
    return lineElement;
  }

  switch (lineElement.type) {
    case "ruby":
      return rubyForPixiv(lineElement.text, lineElement.yomi);
    case "bouten":
      return Array.from(lineElement.text)
        .map((s) => rubyForPixiv(s, "・"))
        .join();
  }
}

function rubyForPixiv(text: string, yomi: string) {
  return `[[rb:${text} > ${yomi}]]`;
}
