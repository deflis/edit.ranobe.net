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
  dialog_main,
  dialog_panel,
  dialog_title,
} from "../common.module.css";
import { atom, useAtom, useSetAtom } from "jotai";
import { dropzone, icon } from "./OpenFileModal.module.css";
import { HiDocumentText } from "react-icons/hi";

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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                <Dialog.Description className="text-sm text-gray-500">
                  ファイルを開いてエディターに取り込みます。(UTF-8以外のファイルは文字化けします)
                </Dialog.Description>
                <div {...getRootProps({ className: dropzone })}>
                  <input {...getInputProps()} />
                  <HiDocumentText className={icon} />
                  <span>ここをクリックするか、ここにファイルをドロップ。</span>
                </div>

                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
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
