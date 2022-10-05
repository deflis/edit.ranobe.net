import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
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

  const onDrop = useCallback(async ([file]: File[]) => {
    setText(await loadTextAsync(file));
    onFinished();
  }, []);
  return useDropzone({
    accept: {
      "text/plain": [],
    },
    onDrop,
    maxFiles: 1,
  });
};
