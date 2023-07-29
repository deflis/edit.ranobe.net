import clsx from "clsx";
import { useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { TextEditor } from "../parts/TextEditor";
import {
  container,
  container_internal,
  serif,
  vertical,
} from "./Container.module.css";
import { SplitSyncContainer } from "./SplitSyncContainer";

export const ContainerMode = {
  Edit: "edit",
  Preview: "preview",
} as const;
export type ContainerMode = typeof ContainerMode[keyof typeof ContainerMode];

export const FontMode = {
  Sans: "sans",
  Serif: "serif",
} as const;
export type FontMode = typeof FontMode[keyof typeof FontMode];

const containerModeAtom = atomWithStorage<ContainerMode>(
  "previewMode",
  ContainerMode.Preview
);
const fontModeAtom = atomWithStorage<FontMode>("fontMode", FontMode.Serif);

export const useContainerMode = () => useAtomValue(containerModeAtom);
export const useSetContainerMode = () => useSetAtom(containerModeAtom);
export const useFontMode = () => useAtomValue(fontModeAtom);
export const useSetFontMode = () => useSetAtom(fontModeAtom);

const widthMode = atomWithStorage("widthLimit", true);

export const useWidthMode = () => useAtomValue(widthMode);
export const useSetWidthMode = () => useSetAtom(widthMode);

const verticalMode = atomWithStorage("verticalMode", false);

export const useVerticalMode = () => useAtomValue(verticalMode);
export const useSetVerticalMode = () => useSetAtom(verticalMode);

export const Container: React.FC<{}> = ({}) => {
  const fontMode = useFontMode();
  const containerMode = useContainerMode();
  const verticalMode = useVerticalMode();

  return (
    <>
      {containerMode == ContainerMode.Edit && (
        <div
          className={clsx(
            container,
            fontMode === FontMode.Serif && serif,
            verticalMode && vertical
          )}
        >
          <TextEditor className={container_internal} />
        </div>
      )}
      {containerMode == ContainerMode.Preview && (
        <SplitSyncContainer
          className={clsx(
            container,
            fontMode === FontMode.Serif && serif,
            verticalMode && vertical
          )}
        />
      )}
    </>
  );
};
