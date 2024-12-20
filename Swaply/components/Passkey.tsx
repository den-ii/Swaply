import FontText from "@/components/FontText";
import Keypad from "@/components/Keypad";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import usePasskeys from "@/hooks/usePassKey";
import { useState } from "react";
import Identity from "@/assets/images/identity.svg";
import { View } from "react-native";
import Toggle from "./Toggle";

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
      <View style={{ marginTop: 80 }}>
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            backgroundColor: "white",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#ECEFF1",
            marginBottom: 32,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
            <Identity />
            <FontText fontWeight={500}>Use Face Id</FontText>
          </View>
          <Toggle />
        </View>
        <View
          style={{
            // marginTop: 80,
            alignItems: "center",
          }}
        >
          <Keypad func={handleKeyPadPress} />
        </View>
      </View>
    </View>
  );
};
