import { useRef, useCallback, useEffect } from "react";

const useDebounce = () => {
  const debounceSeed = useRef<null | ReturnType<typeof setTimeout>>(null);
  const latestFunc = useRef<() => void>(() => {});

  const debounceFunction = useCallback((func: () => void, delay = 200) => {
    // Update the latest function reference
    latestFunc.current = func;

    if (debounceSeed.current) {
      clearTimeout(debounceSeed.current);
    }

    debounceSeed.current = setTimeout(() => {
      latestFunc.current();
    }, delay);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceSeed.current) {
        clearTimeout(debounceSeed.current);
      }
    };
  }, []);

  return debounceFunction;
};

export default useDebounce;
