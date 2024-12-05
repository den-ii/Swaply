import { View, Text } from "react-native";
import FontText from "./FontText";
import ShieldStar from "@/assets/images/shield-star.svg";
import { Colors } from "@/constants/Colors";

export default function DataSecure() {
  return (
    <View
      style={{
        backgroundColor: Colors.light.lightAccent,
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      <View>
        <ShieldStar />
      </View>
      <View>
        <FontText fontSize={12} style={{ flexWrap: "wrap", marginRight: 16 }}>
          The data provided will only be used for verification and stored
          securely
        </FontText>
      </View>
    </View>
  );
}
