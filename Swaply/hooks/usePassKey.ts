import { useEffect, useState } from "react";

export default function usePasskeys(doneFunction: () => void) {
  const [passkeys, setPasskeys] = useState(new Array(6).fill(""));
  const [fill, setFill] = useState(-1);

  useEffect(() => {
    if (fill === 5) doneFunction();
  }, [fill]);

  const handleKeyPadPress = (value: number | string) => {
    if (value === "backspace") {
      if (fill === -1) return;
      const newFill = fill - 1;
      setPasskeys(passkeys.map((key, index) => (index === fill ? "" : key)));
      setFill(newFill);
      return;
    }
    if (fill === 5) return;
    const newFill = fill + 1;
    setPasskeys(
      passkeys.map((key, index) => (index === newFill ? value : key))
    );
    setFill(newFill);
  };
  return { passkeys, fill, handleKeyPadPress };
}
