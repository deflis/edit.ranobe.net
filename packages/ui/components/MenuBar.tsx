import { forwardRef, Fragment } from "react";
import clsx from "clsx";
import {
  menubar,
  menuitem,
  items,
  item,
  item_active,
} from "./MenuBar.module.css";
import { BsCheck, BsFileTextFill } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";

export const MenuBar = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
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
                    <button className={clsx(item, active && item_active)}>
                      開く
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button className={clsx(item, active && item_active)}>
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
                    <button className={clsx(item, active && item_active)}>
                      <BsCheck /> プレビューモード
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <span className="flex-grow"></span>
        <span>プレビューモード</span>
      </header>
    );
  }
);
