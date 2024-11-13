import { SafeAreaView, View } from "react-native";
import NavBack from "./NavBack";
import { useState } from "react";
import { Colors } from "@/constants/Colors";

export function OnboardingHeader({
  currentStage,
  showBack,
}: {
  currentStage: number;
  showBack?: boolean;
}) {
  const [stages, setStages] = useState(5);

  return (
    <View style={{ backgroundColor: Colors.light.body }}>
      {showBack && <NavBack />}
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          paddingBottom: 32,
          paddingTop: !showBack ? 74 : 0,
          paddingHorizontal: 16,
        }}
      >
        {new Array(stages).fill("").map((_, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 7,
              backgroundColor:
                currentStage >= index ? Colors.light.accent : "#ECEFF1",
            }}
          ></View>
        ))}
      </View>
    </View>
  );
}
