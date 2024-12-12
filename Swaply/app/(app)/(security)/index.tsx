import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { Pressable, View } from "react-native";
import ChevronRight from "@/assets/images/chevron-right.svg";

import { useState } from "react";
import { router } from "expo-router";

export default function Security() {
  return (
    <View
      style={{
        flex: 1,
        padding: UI.paddingHorizontal,
        backgroundColor: Colors.light.body,
      }}
    >
      <View style={{ gap: 8, paddingBottom: 20 }}>
        <FontText fontFamily="P22" fontSize={34} fontWeight={700}>
          Security
        </FontText>
        <FontText color={Colors.light.neutral} fontWeight={400}>
          Select your security preferences
        </FontText>
      </View>
      <View
        style={{
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#F5F7F8",
          borderRadius: 16,
        }}
      >
        <Pressable>
          <View
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderColor: "#F5F7F8",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FontText fontWeight={500}>Change password</FontText>
            <ChevronRight fill={Colors.light.neutral} />
          </View>
        </Pressable>
        <Pressable onPress={() => router.push("/code-change")}>
          <View
            style={{
              padding: 16,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FontText fontWeight={500}>Change swaply code</FontText>
            <ChevronRight fill={Colors.light.neutral} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
