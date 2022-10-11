import { useCallback, Fragment, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import {
  animation_enter,
  animation_enterFrom,
  animation_enterTo,
  animation_leave,
  animation_leaveFrom,
  animation_leaveTo,
  backdrop,
  button,
  dialog,
  dialog_description,
  dialog_main,
  dialog_panel,
  dialog_title,
} from "../common.module.css";
import { atom, useAtom, useSetAtom } from "jotai";
import {
  radio_group,
  radio_item,
  radio_item_active,
  radio_item_checked,
  radio_item_description,
  radio_item_checkmark,
  radio_item_container,
  radio_item_text_container,
  radio_item_label,
  radio_item_text,
} from "./SaveFileModal.module.css";
import {
  ExportType,
  useHotKey,
  useSaveToClipboard,
  useSaveToFile,
} from "hooks";
import { BsCheck } from "react-icons/bs";
import clsx from "clsx";

const isOpenAtom = atom(false);
export const useOpenSaveFileModal = () => {
  const setIsOpen = useSetAtom(isOpenAtom);
  return useCallback(() => setIsOpen(true), [setIsOpen]);
};

const exportTypeNotation: {
  [type in ExportType]: {
    title: React.ReactNode;
    description: React.ReactNode;
  };
} = {
  [ExportType.Raw]: {
    title: "そのまま出力",
    description: "加工せず出力します。",
  },
  [ExportType.Narou]: {
    title: "なろう形式で出力",
    description: (
      <>
        ルビを《》で括って出力します。
        <br />
        傍点は1文字づつ中黒のルビが付きます。
      </>
    ),
  },
  [ExportType.Kakuyomu]: {
    title: "カクヨム形式で出力",
    description: (
      <>
        ルビを《》で括って出力します。
        <br />
        傍点は《《》》で括って出力します。
      </>
    ),
  },
  [ExportType.Pixiv]: {
    title: "pixiv形式で出力",
    description: (
      <>
        ルビを[rb: ]で括って出力します。
        <br />
        傍点は1文字づつ中黒のルビが付きます。
      </>
    ),
  },
};

export const SaveFileModal = () => {
  const [exportType, setExportType] = useState(ExportType.Raw);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);
  const saveToClipboard = useSaveToClipboard(closeModal, exportType);
  const saveToFile = useSaveToFile(closeModal, exportType);
  useHotKey();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={dialog} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter={animation_enter}
          enterFrom={animation_enterFrom}
          enterTo={animation_enterTo}
          leave={animation_leave}
          leaveFrom={animation_leaveFrom}
          leaveTo={animation_leaveTo}
        >
          <div className={backdrop} />
        </Transition.Child>

        <div className={dialog_main}>
          <div>
            <Transition.Child
              as={Fragment}
              enter={animation_enter}
              enterFrom={animation_enterFrom}
              enterTo={animation_enterTo}
              leave={animation_leave}
              leaveFrom={animation_leaveFrom}
              leaveTo={animation_leaveTo}
            >
              <Dialog.Panel className={dialog_panel}>
                <Dialog.Title as="h3" className={dialog_title}>
                  保存する
                </Dialog.Title>
                <Dialog.Description className={dialog_description}>
                  現在編集中のテキストを各形式で出力できます
                </Dialog.Description>
                <RadioGroup
                  value={exportType}
                  onChange={setExportType}
                  className={radio_group}
                >
                  {(Object.keys(exportTypeNotation) as ExportType[]).map(
                    (exportType) => (
                      <RadioGroup.Option
                        key={exportType}
                        value={exportType}
                        className={({ active, checked }) =>
                          clsx(
                            radio_item,
                            active && radio_item_active,
                            checked && radio_item_checked
                          )
                        }
                      >
                        {({ checked }) => (
                          <div className={radio_item_container}>
                            <div className={radio_item_text_container}>
                              <div className={radio_item_text}>
                                <RadioGroup.Label
                                  as="p"
                                  className={radio_item_label}
                                >
                                  {exportTypeNotation[exportType].title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className={radio_item_description}
                                >
                                  {exportTypeNotation[exportType].description}
                                </RadioGroup.Description>
                              </div>
                            </div>
                            {checked && (
                              <div className={radio_item_checkmark}>
                                <BsCheck />
                              </div>
                            )}
                          </div>
                        )}
                      </RadioGroup.Option>
                    )
                  )}
                </RadioGroup>
                <div>
                  <button
                    type="button"
                    className={button}
                    onClick={saveToClipboard}
                  >
                    クリップボードにコピー
                  </button>
                  <button type="button" className={button} onClick={saveToFile}>
                    ファイルに保存
                  </button>
                  <button type="button" className={button} onClick={closeModal}>
                    キャンセル
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
  return <div></div>;
};
