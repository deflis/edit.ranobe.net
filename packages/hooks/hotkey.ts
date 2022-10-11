import { useKey } from "react-use";
import toast from "react-hot-toast";

export const useHotKey = () => {
  useKey(
    ({ ctrlKey, key, shiftKey }) => ctrlKey && key === "s" && !shiftKey,
    (e) => {
      e.preventDefault();

      toast("自動保存されています");
    }
  );
};
