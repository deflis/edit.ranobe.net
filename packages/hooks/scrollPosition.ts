import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useAtom, PrimitiveAtom } from "jotai";

const timeoutMs = 10 as const;

export const useScrollPositon = <T extends Element>(
  atom: PrimitiveAtom<number>
) => {
  const ref = useRef<T | null>(null);
  const [scroll, setScroll] = useAtom(atom);
  const [isScrolled, invokingScroll] = useConcurrency(10);
  const [isMoved, invokingMove] = useConcurrency(10);

  useEffect(() => {
    const handler = () => {
      if (ref.current && !isMoved) {
        const current = ref.current.scrollTop / ref.current.scrollHeight;
        setScroll(current);

        invokingScroll();
      }
    };

    if (ref.current) {
      ref.current.addEventListener("scroll", handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handler);
      }
    };
  }, [ref, isMoved, invokingScroll]);

  useLayoutEffect(() => {
    if (ref.current && !isScrolled) {
      const top = ref.current.scrollHeight * scroll;
      ref.current.scroll({ top });
      invokingMove();
    }
  }, [ref, scroll]);

  return ref;
};

const useConcurrency = (timeoutMs: number) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const invoke = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      timeout.current = undefined;
    }, timeoutMs);
  }, [timeout]);
  return [!!timeout.current, invoke] as const;
};
