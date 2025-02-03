import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { Pressable, SafeAreaView, View, Text } from "react-native";

import { useState } from "react";
import { PasskeyContainer } from "@/components/Passkey";
import usePasskeys from "@/hooks/usePassKey";
import { router } from "expo-router";

export default function CodeChange() {
  const {
    passkeys: currentCode,
    fill: currentCodeFill,
    handleKeyPadPress: handleCurrentCodeKeyPadPress,
    error: currentCodeError,
  } = usePasskeys(currentCodeDone);
  const {
    passkeys: newCode,
    fill: newCodeFill,
    handleKeyPadPress: handleNewCodeKeyPadPress,
  } = usePasskeys(newCodeDone);
  const {
    passkeys: verifyNewCode,
    fill: verifyNewCodeFill,
    handleKeyPadPress: handleVerifyNewCodeKeyPadPress,
  } = usePasskeys(verifyCodeDone);

  const [step, setStep] = useState(0);
  function currentCodeDone() {
    setStep(1);
  }
  function newCodeDone() {
    setStep(2);
  }
  function verifyCodeDone() {
    router.push("/code-change-success");
  }
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: UI.paddingHorizontal,
        flex: 1,
        backgroundColor: Colors.light.body,
        // justifyContent: "center",
      }}
    >
      <View style={{ marginTop: 8, gap: 8 }}>
        <Text
          style={{
            fontFamily: "P22Mackinac_Bold",
            fontSize: 34,
          }}
        >
          Enter current code
        </Text>
        <FontText color={Colors.light.neutral}>
          Enter your current 6-digit code
        </FontText>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View style={{ height: "75%", minHeight: 500, maxHeight: 600 }}>
          <PasskeyContainer
            passkeys={currentCode}
            fill={currentCodeFill}
            handleKeyPadPress={handleCurrentCodeKeyPadPress}
            error={currentCodeError}
            // loading={isMutating}
            errorMsg="Incorrect code, you have 5 more attempts."
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
