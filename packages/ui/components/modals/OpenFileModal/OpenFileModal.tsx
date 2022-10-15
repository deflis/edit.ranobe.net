import { useCallback, Fragment } from "react";
import { useDrop } from "hooks";
import { Dialog, Transition } from "@headlessui/react";
import {
  animation_enter,
  animation_enterFrom,
  animation_enterTo,
  animation_leave,
  animation_leaveFrom,
  animation_leaveTo,
  backdrop,
  dialog,
  dialog_description,
  dialog_footer,
  dialog_main,
  dialog_panel,
  dialog_title,
} from "../common.module.css";
import { atom, useAtom, useSetAtom } from "jotai";
import { dropzone, icon } from "./OpenFileModal.module.css";
import { HiDocumentText } from "react-icons/hi";
import { Button } from "../../parts/Button";

const isOpenAtom = atom(false);
export const useOpenOpenFileModal = () => {
  const setIsOpen = useSetAtom(isOpenAtom);
  return useCallback(() => setIsOpen(true), [setIsOpen]);
};

export const OpenFileModal = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);

  const { getRootProps, getInputProps } = useDrop(closeModal);

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
                  ファイルを開く
                </Dialog.Title>
                <Dialog.Description className={dialog_description}>
                  ファイルを開いてエディターに取り込みます。(UTF-8以外のファイルは文字化けします)
                </Dialog.Description>
                <div {...getRootProps({ className: dropzone })}>
                  <input {...getInputProps()} />
                  <HiDocumentText className={icon} />
                  <span>ここをクリックするか、ここにファイルをドロップ。</span>
                </div>

                <div className={dialog_footer}>
                  <Button type="button" onClick={closeModal}>
                    キャンセル
                  </Button>
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
