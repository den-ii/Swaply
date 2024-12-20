import { Colors } from "@/constants/Colors";
import EyeOpen from "@/assets/images/eye-open.svg";
import EyeClose from "@/assets/images/eye-slash.svg";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

export default function Password({
  value,
  onChangeText,
  error,
}: {
  value: string;
  onChangeText: (value: string) => void;
  error?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={{ position: "relative" }}>
      <Pressable
        onPress={() => setShowPassword((showPassword) => !showPassword)}
        style={{ zIndex: 2 }}
      >
        <View
          style={{
            position: "absolute",
            top: 8,
            right: 0,
            padding: 16,
          }}
        >
          {showPassword && <EyeOpen />}
          {!showPassword && <EyeClose />}
        </View>
      </Pressable>

      <TextInput
        placeholderTextColor={"#AEB7BF"}
        value={value}
        onChangeText={(value) => onChangeText(value)}
        style={{
          fontSize: 14,
          fontFamily: "Inter_400Regular",
          borderRadius: 12,
          borderColor: error ? Colors.error : "#ECEFF1",
          borderWidth: 1,
          padding: 16,
          marginTop: 8,
        }}
        secureTextEntry={!showPassword}
        placeholder="********"
      />
    </View>
  );
}
