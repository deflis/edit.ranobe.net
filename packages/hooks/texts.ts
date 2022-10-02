import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { parse, length, lengthForParse } from "parser";
import { useCallback } from "react";

export const textAtom = atomWithStorage("texts", "");

export const parsedTextAtom = atom((get) => parse(get(textAtom)));
export const textLengthAtom = atom((get) => length(get(textAtom)));
export const textLengthForParseAtom = atom((get) =>
  lengthForParse(get(textAtom))
);

export const useText = () => useAtomValue(textAtom);
export const useHandleChangeText: () => React.ChangeEventHandler<HTMLTextAreaElement> =
  () => {
    const setText = useSetAtom(textAtom);
    return useCallback(
      (e) => {
        setText(e.target.value);
      },
      [setText]
    );
  };
export const useParsedText = () => useAtomValue(parsedTextAtom);
export const useTextLength = () => useAtomValue(textLengthAtom);
export const useTextLengthForParse = () => useAtomValue(textLengthForParseAtom);
