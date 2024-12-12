import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { Pressable, View } from "react-native";

import { useState } from "react";
import { PasskeyContainer } from "@/components/Passkey";
import usePasskeys from "@/hooks/usePassKey";

export default function CodeChange() {
  const {
    passkeys: currentCode,
    fill: currentCodeFill,
    handleKeyPadPress: handleCurrentCodeKeyPadPress,
  } = usePasskeys();
  const {
    passkeys: newCode,
    fill: newCodeFill,
    handleKeyPadPress: handleNewCodeKeyPadPress,
  } = usePasskeys();
  const {
    passkeys: verifyNewCode,
    fill: verifyNewCodeFill,
    handleKeyPadPress: handleVerifyNewCodeKeyPadPress,
  } = usePasskeys();

  const [step, setStep] = useState(0);
  return (
    <View
      style={{
        flex: 1,
        padding: UI.paddingHorizontal,
        backgroundColor: Colors.light.background,
      }}
    >
      <View style={{ gap: 8, paddingBottom: 20 }}>
        <FontText fontFamily="P22" fontSize={34} fontWeight={700}>
          {step === 0
            ? "Enter current code"
            : step === 1
            ? "Enter new code"
            : "Confirm new code"}
        </FontText>
        <FontText color={Colors.light.neutral} fontWeight={400}>
          Enter your current 6-digit code
        </FontText>
      </View>
      <View style={{ marginTop: 24 }}>
        {step === 0 ? (
          <PasskeyContainer
            passkeys={currentCode}
            fill={currentCodeFill}
            handleKeyPadPress={handleCurrentCodeKeyPadPress}
          />
        ) : step === 1 ? (
          <PasskeyContainer
            passkeys={newCode}
            fill={newCodeFill}
            handleKeyPadPress={handleNewCodeKeyPadPress}
          />
        ) : (
          <PasskeyContainer
            passkeys={verifyNewCode}
            fill={verifyNewCodeFill}
            handleKeyPadPress={handleVerifyNewCodeKeyPadPress}
          />
        )}
      </View>
    </View>
  );
}
