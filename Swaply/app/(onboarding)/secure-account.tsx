import FontText from "@/components/FontText";
import Keypad from "@/components/Keypad";
import { PasskeyContainer } from "@/components/Passkey";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import usePasskeys from "@/hooks/usePassKey";
import { useState } from "react";
import { View } from "react-native";

export default function SecureAccount() {
  const { passkeys, fill, handleKeyPadPress } = usePasskeys();
  const {
    passkeys: confirmPasskeys,
    fill: confirmFill,
    handleKeyPadPress: confirmHandleKeyPadPress,
  } = usePasskeys();

  const [stage, setStage] = useState(0);
  function next() {
    if (stage === 0) {
      setStage(1);
    }
  }
  function confirmNext() {
    if (stage === 1) {
      c;
    }
  }

  return (
    <View
      style={{
        paddingHorizontal: UI.paddingHorizontal,
        flex: 1,
        backgroundColor: Colors.light.body,
      }}
    >
      <View style={{ paddingBottom: 16 }}>
        <FontText fontFamily="P22" fontWeight={700} fontSize={34}>
          Secure your account
        </FontText>
        <FontText color={Colors.light.neutral} style={{ marginTop: 8 }}>
          Enable a 6-digit code to protect your account against unauthorized
          access.
        </FontText>
      </View>
      <PasskeyContainer
        passkeys={passkeys}
        fill={fill}
        handleKeyPadPress={handleKeyPadPress}
      />
    </View>
  );
}
