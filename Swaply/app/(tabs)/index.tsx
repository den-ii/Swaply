import FontText from "@/components/FontText";
import { Text, View } from "react-native";
import { Colors } from "@/constants/Colors";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontText color={Colors.light.neutral}>
        Enter the amount and select the currency you want to send money to
      </FontText>
    </View>
  );
}
