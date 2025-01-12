import Button from "@/components/Button";
import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

export default function Otp({
  title,
  email,
  action,
  actionText,
  loading,
}: {
  title: string;
  email: string;
  action: (val: any) => void;
  resetAction?: () => void;
  actionText: string;
  loading?: boolean;
}) {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(20);
  const [interval, handleInterval] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (otp.length < 7) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [otp]);

  useEffect(() => {
    if (time <= 0) return;
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    handleInterval(interval);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(interval);
      return;
    }
  }, [time]);

  const resendOTP = () => {
    setTime(20);
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    handleInterval(interval);
  };

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

  const handleVerification = () => {
    action({
      code: otp
        .split("")
        .filter((v) => v !== "-")
        .join(""),
    });
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
          keyboardType="number-pad"
          inputMode="numeric"
          returnKeyType="done"
          onKeyPress={({ nativeEvent }) => handleOtpText(nativeEvent)}
          placeholder="000-000"
          value={otp}
          maxLength={7}
        />
      </View>
      <Pressable>
        <FontText
          style={{ textAlign: "center" }}
          fontWeight={600}
          color={time > 0 ? Colors.light.textDisabled : Colors.light.text}
        >
          {time > 0 ? `Resend OTP (${time}s)` : "Resend OTP"}
        </FontText>
      </Pressable>

      <View style={{ marginTop: 16 }}>
        <Button
          text="Verify OTP"
          loading={loading}
          disabled={disabled}
          action={handleVerification}
        />
      </View>
    </View>
  );
}
