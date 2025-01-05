import { onboardUser } from "@/api/authApi";
import FontText from "@/components/FontText";
import Keypad from "@/components/Keypad";
import { PasskeyContainer } from "@/components/Passkey";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import usePasskeys from "@/hooks/usePassKey";
import { authStore, onboardingStore } from "@/store";
import useSWRMutation from "swr/mutation";
import { router } from "expo-router";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { View } from "react-native";

export default function SecureAccount() {
  const { firstName, lastName, password, phone, token, countryCode } =
    onboardingStore.useState();
  const { trigger, data, isMutating, error } = useSWRMutation(
    "user/onboarding",
    onboardUser,
    {
      onSuccess: (data) => {
        if (data.status) {
          router.push("/(auth)/sign-in");
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const { passkeys, fill, handleKeyPadPress } = usePasskeys(next);
  const {
    passkeys: confirmPasskeys,
    fill: confirmFill,
    handleKeyPadPress: confirmHandleKeyPadPress,
    setError: setConfirmPasskeysError,
    error: confirmPasskeysError,
  } = usePasskeys(confirmNext, isMutating);
  const isFaceIDAuth = authStore.useState((s) => s.isFaceIDAuth);

  const [stage, setStage] = useState(0);
  function next() {
    if (stage === 0) {
      setStage(1);
    }
  }
  async function confirmNext() {
    const joinedPasskeys = passkeys.join("");
    if (joinedPasskeys === confirmPasskeys.join("")) {
      if (isFaceIDAuth) {
        await SecureStore.setItemAsync("passkey", joinedPasskeys);
      }
      trigger({
        firstName,
        lastName,
        pin: joinedPasskeys,
        password,
        token,
        countryCode,
        phone,
      });
    } else {
      setConfirmPasskeysError(true);
    }
  }

  return (
    <View
      style={{
        paddingHorizontal: UI.paddingHorizontal,
        paddingBottom: 16,
        flex: 1,
        backgroundColor: Colors.light.body,
      }}
    >
      <View style={{ paddingBottom: 16 }}>
        <FontText fontFamily="P22" fontWeight={700} fontSize={34}>
          {stage === 0 ? "Secure your account" : "Confirm PIN code"}
        </FontText>
        <FontText color={Colors.light.neutral} style={{ marginTop: 8 }}>
          {stage === 0
            ? " Enable a 6-digit code to protect your account against unauthorized access."
            : ""}
        </FontText>
      </View>
      {stage === 0 ? (
        <PasskeyContainer
          passkeys={passkeys}
          fill={fill}
          showFaceIdToggle
          handleKeyPadPress={handleKeyPadPress}
        />
      ) : (
        <PasskeyContainer
          passkeys={confirmPasskeys}
          fill={confirmFill}
          handleKeyPadPress={confirmHandleKeyPadPress}
          error={confirmPasskeysError}
          loading={isMutating}
        />
      )}
    </View>
  );
}
