import FontText from "@/components/FontText";
import Keypad from "@/components/Keypad";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import usePasskeys from "@/hooks/usePassKey";
import { useState } from "react";
import { View } from "react-native";

export const PasskeyField = ({
  fill,
  index,
}: {
  fill: number;
  index: number;
}) => {
  const filled = fill >= index ? Colors.base : "#AEB7BF";

  return (
    <View
      key={index}
      style={{
        width: 15,
        height: 15,
        backgroundColor: filled,
        borderRadius: 15,
      }}
    ></View>
  );
};

export const PasskeyContainer = ({
  passkeys,
  fill,
  handleKeyPadPress,
}: {
  passkeys: any[];
  fill: number;
  handleKeyPadPress: (value: number | string) => void;
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 16,
          justifyContent: "center",
          gap: 16,
        }}
      >
        {passkeys.map((_, index) => (
          <PasskeyField key={index} fill={fill} index={index} />
        ))}
      </View>
      <View
        style={{
          marginTop: 80,
          alignItems: "center",
        }}
      >
        <Keypad func={handleKeyPadPress} />
      </View>
    </View>
  );
};

export default function SecureAccount() {
  const { passkeys, fill, handleKeyPadPress } = usePasskeys();

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
