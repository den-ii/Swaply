import { Platform, Pressable, SafeAreaView, View } from "react-native";
import Back from "@/assets/images/back.svg";
import { useRouter } from "expo-router";
import { Svg, G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import { UI } from "@/constants/UI";
import { Colors } from "@/constants/Colors";

export default function NavBack() {
  const router = useRouter();
  return (
    <View
      style={{
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingHorizontal: UI.paddingHorizontal,
        paddingTop: Platform.OS === "ios" ? 60 : 30,
        paddingBottom: 16,
      }}
    >
      <Pressable onPress={() => router.back()}>
        <View
          style={{
            width: 34,
            height: 34,
            backgroundColor: "#F5F7F8",
            borderRadius: 34,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Back fill="#757D87" />
        </View>
      </Pressable>
    </View>
  );
}
