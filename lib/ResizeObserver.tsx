import { useEffect, useRef } from "react";

type Callback = (entry: ResizeObserverEntry) => void;

function useResizeObserver(
  callback: Callback,
  ref: React.RefObject<HTMLElement>
) {
  const observer = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (ref.current) {
      observer.current = new ResizeObserver((entries) => {
        if (entries.length > 0) {
          callback(entries[0]);
        }
      });

      observer.current.observe(ref.current);

      return () => {
        if (observer.current && ref.current) {
          observer.current.unobserve(ref.current);
        }
      };
    }
  }, [ref, callback]);
}

export default useResizeObserver;
