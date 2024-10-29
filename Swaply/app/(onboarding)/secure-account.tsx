import FontText from "@/components/FontText";
import Keypad from "@/components/Keypad";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { useState } from "react";
import { View } from "react-native";
import * as Haptics from "expo-haptics";

const PasskeyField = ({ fill, index }: { fill: number; index: number }) => {
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

export default function SecureAccount() {
  const [passkeys, setPasskeys] = useState(new Array(6).fill(""));
  const [fill, setFill] = useState(-1);

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
      <View
        style={{
          flexDirection: "row",
          marginTop: 16,
          justifyContent: "center",
          gap: 16,
        }}
      >
        {passkeys.map((_, index) => (
          <PasskeyField fill={fill} index={index} />
        ))}
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          flex: 1,
          paddingBottom: 100,
          alignItems: "center",
        }}
      >
        <Keypad func={handleKeyPadPress} />
      </View>
    </View>
  );
}
