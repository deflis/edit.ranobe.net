import { forwardRef, Fragment, useCallback } from "react";
import clsx from "clsx";
import {
  menubar,
  menuitem,
  items,
  item,
  item_active,
  icon,
} from "./MenuBar.module.css";
import { BsCheck, BsFileTextFill } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";
import { useOpenOpenFileModal } from "./modals/OpenFileModal";
import { useOpenSaveFileModal } from "./modals/SaveFileModal";
import {
  ContainerMode,
  useContainerMode,
  useSetContainerMode,
  useWidthMode,
  useSetWidthMode,
  useFontMode,
  useSetFontMode,
  FontMode,
} from "./containers/Container";
import { useOpenVersionModal } from "./modals/VersionModal";

const resolveContainerMode = (containerMode: ContainerMode) => {
  switch (containerMode) {
    case ContainerMode.Edit:
      return "編集モード";
    case ContainerMode.Preview:
      return "プレビューモード";
  }
};

export const MenuBar = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    const containerMode = useContainerMode();
    const setContainerMode = useSetContainerMode();
    const widthMode = useWidthMode();
    const setWidthMode = useSetWidthMode();
    const fontMode = useFontMode();
    const setFontMode = useSetFontMode();

    const setContainerModeEdit = useCallback(
      () => setContainerMode(ContainerMode.Edit),
      [setContainerMode]
    );
    const setContainerModePreview = useCallback(
      () => setContainerMode(ContainerMode.Preview),
      [setContainerMode]
    );
    const setFontModeSerif = useCallback(
      () => setFontMode(FontMode.Serif),
      [setFontMode]
    );
    const setFontModeSans = useCallback(
      () => setFontMode(FontMode.Sans),
      [setFontMode]
    );
    const toggleWidthMode = useCallback(
      () => setWidthMode((flag) => !flag),
      [setWidthMode]
    );

    const openOpenFileModal = useOpenOpenFileModal();
    const openSaveFileModal = useOpenSaveFileModal();
    const openVersionModal = useOpenVersionModal();

    return (
      <header ref={ref} className={clsx(menubar, className)}>
        <span>
          <BsFileTextFill />
        </span>

        <Menu as="div" className={menuitem}>
          <Menu.Button>ファイル</Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className={items}>
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={clsx(item, active && item_active)}
                      onClick={openOpenFileModal}
                    >
                      開く
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={clsx(item, active && item_active)}
                      onClick={openSaveFileModal}
                    >
                      保存する
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as="div" className={menuitem}>
          <Menu.Button>表示</Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className={items}>
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={clsx(item, active && item_active)}
                      onClick={setContainerModeEdit}
                    >
                      {containerMode === ContainerMode.Edit ? (
                        <BsCheck />
                      ) : (
                        <span className={icon} />
                      )}
                      編集モード
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={clsx(item, active && item_active)}
                      onClick={setContainerModePreview}
                    >
                      {containerMode === ContainerMode.Preview ? (
                        <BsCheck />
                      ) : (
                        <span className={icon} />
                      )}
                      プレビューモード
                    </button>
                  )}
                </Menu.Item>
                <hr />
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={clsx(item, active && item_active)}
                      onClick={setFontModeSans}
                    >
                      {fontMode === FontMode.Sans ? (
                        <BsCheck />
                      ) : (
                        <span className={icon} />
                      )}
                      ゴシック体
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={clsx(item, active && item_active)}
                      onClick={setFontModeSerif}
                    >
                      {fontMode === FontMode.Serif ? (
                        <BsCheck />
                      ) : (
                        <span className={icon} />
                      )}
                      明朝体
                    </button>
                  )}
                </Menu.Item>
                <hr />
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={clsx(item, active && item_active)}
                      onClick={toggleWidthMode}
                    >
                      {widthMode ? <BsCheck /> : <span className={icon} />}
                      横幅を制限する
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as="div" className={menuitem}>
          <Menu.Button>ヘルプ</Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className={items}>
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={clsx(item, active && item_active)}
                      onClick={openVersionModal}
                    >
                      バージョン情報
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <span className="flex-grow"></span>
        <span>{resolveContainerMode(containerMode)}</span>
      </header>
    );
  }
);
