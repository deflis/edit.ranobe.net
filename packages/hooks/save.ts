import { useParsedText, useText } from "./texts";
import {
  exportForKakuyomu,
  exportForNarou,
  exportForPixiv,
  NovelLines,
} from "parser";
import { useCallback } from "react";
import toast from "react-hot-toast";

export const ExportType = {
  Raw: "raw",
  Narou: "narou",
  Kakuyomu: "kakuyomu",
  Pixiv: "pixiv",
} as const;

export type ExportType = typeof ExportType[keyof typeof ExportType];

export const useSaveToClipboard = (
  onFinished: () => void,
  type: ExportType
) => {
  const raw = useText();
  const parsed = useParsedText();
  return useCallback(() => {
    navigator.clipboard.writeText(saveByType(parsed, raw, type));
    toast.success("クリップボードにコピーしました");
    onFinished();
  }, [parsed, raw, type]);
};

export const useSaveToFile = (onFinished: () => void, type: ExportType) => {
  const raw = useText();
  const parsed = useParsedText();
  return useCallback(() => {
    const blob = new Blob([saveByType(parsed, raw, type)], {
      type: "text/plain;charset=utf-8",
    });

    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    onFinished();
  }, [parsed, raw, type]);
};

function saveByType(
  novelLines: NovelLines,
  rawText: string,
  type: ExportType
): string {
  switch (type) {
    case ExportType.Raw:
      return rawText;
    case ExportType.Kakuyomu:
      return exportForKakuyomu(novelLines);
    case ExportType.Narou:
      return exportForNarou(novelLines);
    case ExportType.Pixiv:
      return exportForPixiv(novelLines);
  }
}
