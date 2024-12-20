import { View } from "react-native";
import Error from "@/assets/images/error-toast.svg";
import Check from "@/assets/images/check-toast.svg";

import FontText from "./FontText";
import { toastStore, ToastType } from "@/store";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect } from "react";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function Toast() {
  const message = toastStore.useState((state) => state.message);
  const type = toastStore.useState((state) => state.type);
  const active = toastStore.useState((state) => state.active);
  const postiton = useSharedValue(-100);

  useEffect(() => {
    if (type === ToastType.ERROR) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else if (type === ToastType.SUCCESS) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    postiton.value = withSpring(50);
    const timeout = setTimeout(() => {
      postiton.value = withSpring(-100);
    }, 2000);

    const secondTimeout = setTimeout(() => {
      toastStore.update((s) => {
        s.active = false;
      });
    }, 4000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(secondTimeout);
    };
  }, []);

  // useEffect(() => {}, [active]);

  return (
    <Animated.View
      style={{
        flexDirection: "row",
        position: "absolute",
        top: postiton,
        zIndex: 100,
        width: "90%",
        left: "5%",
        gap: 8,
        borderRadius: 4,
        alignItems: "center",
        padding: 12,
        backgroundColor:
          type === ToastType.ERROR
            ? "#F23C57"
            : type === ToastType.SUCCESS
            ? "#DAF1E2"
            : "#FFC107",
      }}
    >
      {type === ToastType.ERROR ? (
        <Error />
      ) : type === ToastType.SUCCESS ? (
        <Check />
      ) : (
        <View></View>
      )}
      <FontText
        fontSize={14}
        fontWeight={500}
        color={
          type === ToastType.ERROR
            ? "white"
            : type === ToastType.SUCCESS
            ? "#0D9013"
            : "#000"
        }
      >
        {message}
      </FontText>
    </Animated.View>
  );
}
