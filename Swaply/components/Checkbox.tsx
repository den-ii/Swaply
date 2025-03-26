import { View } from "react-native";
import CheckIcon from "@/assets/images/check2.svg";

export default function Checkbox({ check }: { check: boolean }) {
  return (
    <View
      style={{
        height: 16,
        width: 16,
        borderRadius: 4,
        borderColor: "#ECEFF1",
        borderWidth: check ? 0 : 1,
        backgroundColor: check ? "#2C3137" : "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CheckIcon />
    </View>
  );
}
