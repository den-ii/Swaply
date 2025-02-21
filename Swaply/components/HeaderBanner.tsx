import { Colors } from "@/constants/Colors";
import { ImageBackground } from "expo-image";
import { View } from "react-native";

export default function HeaderBanner() {
  return (
    <View
      style={{
        height: 114,
        backgroundColor: Colors.base,
      }}
    >
      <ImageBackground
        source={require("../assets/images/curve.png")}
        style={{ width: "100%", height: 114 }}
      />
    </View>
  );
}
