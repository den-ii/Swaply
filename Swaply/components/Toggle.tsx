import { Colors } from "@/constants/Colors";
import { Children, ReactDOM, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import InsetShadow from "react-native-inset-shadow";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export default function Toggle({
  on,
  toggleOn,
  withShadow,
}: {
  on: boolean;
  toggleOn: () => void;
  withShadow?: boolean;
}) {
  const position = useSharedValue(on ? 17 : 3);
  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    position.value = withTiming(on ? 17 : 3);
  }, [on]);

  return (
    <Pressable onPress={toggleOn}>
      <View
        style={{
          width: 36,
          backgroundColor: on ? Colors.light.textDefault : "#ECEFF1",
          height: 22,
          borderRadius: 100,
          // paddingHorizontal: 3,
          zIndex: 100,
          justifyContent: withShadow ? "flex-start" : "center",
        }}
      >
        {withShadow && (
          <InsetShadow
            containerStyle={{
              width: 36,
              borderRadius: 10,
              justifyContent: "center",
            }}
            shadowRadius={3}
            shadowOffset={5}
            shadowBlur={5}
            elevation={5}
            shadowOpacity={0.05}
            color="rgba(101, 96, 123, 0.05)"
            right={true}
            bottom={true}
          >
            <Animated.View
              style={{
                width: 16,
                height: 16,
                transform: [{ translateX: position }],
                shadowColor: "#2c3137",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.08,
                shadowRadius: 5,
                elevation: 5,
                backgroundColor: "white",
                borderRadius: 100,
              }}
            ></Animated.View>
          </InsetShadow>
        )}
        {!withShadow && (
          <Animated.View
            style={{
              width: 16,
              height: 16,
              transform: [{ translateX: position }],
              backgroundColor: "white",
              borderRadius: 100,
            }}
          ></Animated.View>
        )}
      </View>
    </Pressable>
  );
}
