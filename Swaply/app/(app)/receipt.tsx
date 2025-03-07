import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { View } from "react-native";

export default function Receipt() {
  return (
    <View
      style={{
        flex: 1,
        padding: UI.paddingHorizontal,
        backgroundColor: Colors.light.body,
      }}
    ></View>
  );
}
