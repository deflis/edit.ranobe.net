import { useCallback, Fragment } from "react";
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
import { Button } from "../../parts/Button";

const isOpenAtom = atom(false);
export const useOpenVersionModal = () => {
  const setIsOpen = useSetAtom(isOpenAtom);
  return useCallback(() => setIsOpen(true), [setIsOpen]);
};

export const VersionModal: React.FC<{ version: string }> = ({ version }) => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);

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
                  バージョン情報
                </Dialog.Title>
                <Dialog.Description className={dialog_description}>
                  らのべねっと小説エディター
                  <br />
                  {version}
                  <br />
                  <a href="https://github.com/deflis/edit.ranobe.net">
                    https://github.com/deflis/edit.ranobe.net
                  </a>
                </Dialog.Description>

                <div className={dialog_footer}>
                  <Button type="button" onClick={closeModal}>
                    閉じる
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
