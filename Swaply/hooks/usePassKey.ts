import { toastStore, ToastType } from "@/store";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";

export default function usePasskeys(
  doneFunction: () => void,
  loading: boolean = false
) {
  const [passkeys, setPasskeys] = useState(new Array(6).fill(""));
  const [error, setError] = useState(false);
  const [fill, setFill] = useState(-1);
  useEffect(() => {
    if (fill === 5) doneFunction();
  }, [fill]);

  useEffect(() => {
    if (error) {
      setPasskeys(new Array(6).fill(""));
      setFill(-1);
      toastStore.update((s) => {
        s.active = true;
        s.message = "Invalid code, please try again.";
        s.type = ToastType.ERROR;
      });
    }
  }, [error]);

  const fillPasskeysWithFaceID = async () => {
    const auth = await LocalAuthentication.authenticateAsync({
      biometricsSecurityLevel: "strong",
    });
    if (!auth.success) return;
    const passkey = await SecureStore.getItemAsync("passkey");
    if (passkey) {
      setPasskeys(passkey.split(""));
      setFill(5);
    } else {
      toastStore.update((s) => {
        s.active = true;
        s.message = "Face ID not set up, please enter code manually.";
        s.type = ToastType.ERROR;
      });
    }
  };

  const handleKeyPadPress = (value: number | string) => {
    if (error) setError(false);
    if (loading) return;
    if (value === "backspace") {
      if (fill === -1) return;
      const newFill = fill - 1;
      setPasskeys(passkeys.map((key, index) => (index === fill ? "" : key)));
      setFill(newFill);
      return;
    }
    if (value === "*") {
      fillPasskeysWithFaceID();
      return;
    }
    if (fill === 5) return;
    const newFill = fill + 1;
    setPasskeys(
      passkeys.map((key, index) => (index === newFill ? value : key))
    );
    setFill(newFill);
  };
  return { passkeys, fill, handleKeyPadPress, error, setError };
}
