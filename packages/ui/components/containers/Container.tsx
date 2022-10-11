import { TextEditor } from "../parts/TextEditor";
import { SplitSyncContainer } from "./SplitSyncContainer";
import { container, container_internal } from "./Container.module.css";

import { atomWithStorage } from "jotai/utils";
import { useAtomValue } from "jotai";
import { useSetAtom } from "jotai";

export const ContainerMode = {
  Edit: "edit",
  Preview: "preview",
} as const;
export type ContainerMode = typeof ContainerMode[keyof typeof ContainerMode];

const containerModeAtom = atomWithStorage<ContainerMode>(
  "previewMode",
  ContainerMode.Edit
);

export const useContainerMode = () => useAtomValue(containerModeAtom);
export const useSetContainerMode = () => useSetAtom(containerModeAtom);

const widthMode = atomWithStorage("widthLimit", false);

export const useWidthMode = () => useAtomValue(widthMode);
export const useSetWidthMode = () => useSetAtom(widthMode);

export const Container: React.FC<{}> = ({}) => {
  const containerMode = useContainerMode();
  return (
    <>
      {containerMode == ContainerMode.Edit && (
        <div className={container}>
          <TextEditor className={container_internal} />
        </div>
      )}
      {containerMode == ContainerMode.Preview && <SplitSyncContainer />}
    </>
  );
};
