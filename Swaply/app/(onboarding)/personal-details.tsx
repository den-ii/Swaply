import Button from "@/components/Button";
import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import Check from "@/assets/images/check.svg";
import { TextInput, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { PhoneNumberInput } from "@/components/PhoneNumberInput";

export default function PersonalDetails() {
  return (
    <View
      style={{
        paddingHorizontal: UI.paddingHorizontal,
        flex: 1,
        backgroundColor: Colors.light.body,
      }}
    >
      <View style={{ paddingBottom: 16 }}>
        <FontText fontFamily="P22" fontWeight={700} fontSize={34}>
          Personal details
        </FontText>
      </View>

      <View style={{ marginTop: 32, marginBottom: 16 }}>
        <FontText>First name</FontText>
        <TextInput
          placeholderTextColor={"#AEB7BF"}
          style={{
            fontSize: 14,
            fontFamily: "Inter_400Regular",
            borderRadius: 12,
            borderColor: "#ECEFF1",
            borderWidth: 1,
            padding: 16,
            marginTop: 8,
          }}
          cursorColor={Colors.light.text}
          selectionColor={Colors.light.text}
          placeholder="John"
        />
      </View>
      <View style={{ marginBottom: 16 }}>
        <FontText>Last name</FontText>
        <TextInput
          placeholderTextColor={"#AEB7BF"}
          style={{
            fontSize: 14,
            fontFamily: "Inter_400Regular",
            borderRadius: 12,
            borderColor: "#ECEFF1",
            borderWidth: 1,
            padding: 16,
            marginTop: 8,
          }}
          cursorColor={Colors.light.text}
          selectionColor={Colors.light.text}
          placeholder="Doe"
        />
      </View>
      <PhoneNumberInput />
      <View style={{ marginTop: 32 }}>
        <Button
          text="Create an account"
          action={() => router.push("/secure-account")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  validation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ECEFF1",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 100,
    gap: 4,
  },
});
