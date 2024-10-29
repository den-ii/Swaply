import Button from "@/components/Button";
import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import Check from "@/assets/images/check.svg";
import { TextInput, View, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function CreatePassword() {
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
          Create password
        </FontText>
      </View>

      <View style={{ marginTop: 32, marginBottom: 16 }}>
        <FontText>Create password</FontText>
        <TextInput
          placeholderTextColor={"#AEB7BF"}
          style={{
            fontSize: 14,
            fontFamily: "Inter_600SemiBold",
            borderRadius: 12,
            borderColor: "#ECEFF1",
            borderWidth: 1,
            padding: 16,
            marginTop: 8,
          }}
          cursorColor={Colors.light.text}
          secureTextEntry={true}
          selectionColor={Colors.light.text}
          placeholder="********"
        />
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
        <View style={styles.validation}>
          <Check fill="#AEB7BF" />
          <FontText color="#AEB7BF" fontWeight={500} fontSize={12}>
            At least 8 characters
          </FontText>
        </View>
        <View style={styles.validation}>
          <Check fill="#AEB7BF" />
          <FontText color="#AEB7BF" fontWeight={500} fontSize={12}>
            At least 1 lowercase
          </FontText>
        </View>
        <View style={styles.validation}>
          <Check fill="#AEB7BF" />
          <FontText color="#AEB7BF" fontWeight={500} fontSize={12}>
            At least 1 uppercase
          </FontText>
        </View>
      </View>

      <View style={{ marginTop: 32 }}>
        <Button
          text="Continue"
          action={() => router.push("/personal-details")}
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
