import Button from "@/components/Button";
import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

export default function Otp({
  title,
  email,
  action,
  actionText,
}: {
  title: string;
  email: string;
  action: () => void;
  actionText: string;
}) {
  const [otp, setOtp] = useState("");

  const handleOtpText = ({ key }: { key: string }) => {
    console.log("key:", key);
    if (otp.length >= 7 && key !== "Backspace") return;
    else if (otp.length === 3 && key !== "Backspace")
      setOtp((otp) => otp + "-" + key);
    else if (otp.length === 5 && key === "Backspace")
      setOtp((otp) => otp.slice(0, 3));
    else if (key === "Backspace") setOtp((otp) => otp.slice(0, -1));
    else setOtp((otp) => otp + key);
  };

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
          {title}
        </FontText>
      </View>
      <View>
        <FontText color={"#757D87"}>We just sent a 6-digit OTP to</FontText>
        <FontText fontWeight={600}>{email}</FontText>
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
          onKeyPress={({ nativeEvent }) => handleOtpText(nativeEvent)}
          selectionColor={Colors.light.text}
          placeholder="000-000"
          value={otp}
          maxLength={7}
        />
      </View>
      <FontText style={{ textAlign: "center" }}>Resend OTP (20s)</FontText>

      <View style={{ marginTop: 16 }}>
        <Button text="Verify OTP" action={action} />
      </View>
    </View>
  );
}
