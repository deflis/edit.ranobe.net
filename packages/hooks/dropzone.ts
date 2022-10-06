import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useSetText } from "./texts";

const loadTextAsync = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const { result } = reader;
      if (typeof result !== "string")
        throw TypeError("Reader did not return string.");
      resolve(result);
    });

    reader.addEventListener("error", () => {
      reject(reader.error);
    });

    reader.readAsText(file);
  });

export const useDrop = (onFinished: () => void) => {
  const setText = useSetText();

  const onDrop = useCallback(([file]: File[]) => {
    toast.promise(
      (async () => {
        setText(await loadTextAsync(file));
        onFinished();
      })(),
      {
        loading: "読み込み中",
        success: "読み込みに成功しました",
        error: "読み込みに失敗しました",
      }
    );
  }, []);
  return useDropzone({
    accept: {
      "text/plain": [],
    },
    onDrop,
    maxFiles: 1,
  });
};
