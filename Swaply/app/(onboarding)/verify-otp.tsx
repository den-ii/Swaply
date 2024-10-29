import Button from "@/components/Button";
import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { router } from "expo-router";
import { TextInput, View } from "react-native";

export default function VerifyOtp() {
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
          Verify OTP
        </FontText>
      </View>
      <View>
        <FontText color={"#757D87"}>We just sent a 6-digit OTP to</FontText>
        <FontText fontWeight={600}>danielayomidesolomon@gmail.com</FontText>
      </View>
      <View style={{ marginVertical: 32 }}>
        <TextInput
          placeholderTextColor={"#AEB7BF"}
          style={{
            fontSize: 34,
            textAlign: "center",
            fontFamily: "Inter_600SemiBold",
          }}
          cursorColor={Colors.light.text}
          keyboardType="number-pad"
          selectionColor={Colors.light.text}
          placeholder="000-000"
          maxLength={7}
        />
      </View>
      <FontText style={{ textAlign: "center" }}>Resend OTP (20s)</FontText>

      <View style={{ marginTop: 16 }}>
        <Button
          text="Verify OTP"
          action={() => router.push("/create-password")}
        />
      </View>
    </View>
  );
}
