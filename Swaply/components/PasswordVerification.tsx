import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { TextInput, View, StyleSheet } from "react-native";
import FontText from "./FontText";
import Check from "@/assets/images/check.svg";
import { router } from "expo-router";
import Button from "./Button";
import Password from "./Password";

export default function PasswordVerification({
  action,
  headerText,
  labelText,
  buttonText,
}: {
  action: () => void;
  headerText: string;
  labelText: string;
  buttonText?: string;
}) {
  return (
    <View
      style={{
        paddingHorizontal: UI.paddingHorizontal,
        flex: 1,
        backgroundColor: Colors.light.body,
      }}
    >
      <View style={{ paddingBottom: 4, paddingTop: 16 }}>
        <FontText fontFamily="P22" fontWeight={700} fontSize={34}>
          {headerText}
        </FontText>
      </View>

      <View style={{ marginTop: 16, marginBottom: 16 }}>
        <FontText>{labelText}</FontText>
        <Password value={""} onChangeText={() => {}} />
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
      <View style={{ marginTop: 16, marginBottom: 16 }}>
        <FontText>Confirm password</FontText>
        <Password value={""} onChangeText={() => {}} />
      </View>

      <View style={{ marginTop: 32 }}>
        <Button text={buttonText ?? "Continue"} action={action} />
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
