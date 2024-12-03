import { Colors } from "@/constants/Colors";
import React from "react";
import { View } from "react-native";

export default function SectionIcon({ Icon }: { Icon: React.ElementType }) {
  return (
    <View
      style={{
        backgroundColor: Colors.base,
        width: 28,
        height: 28,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon />
    </View>
  );
}
