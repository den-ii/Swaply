import { Colors } from "@/constants/Colors";
import EyeOpen from "@/assets/images/eye-open.svg";
import EyeClose from "@/assets/images/eye-slash.svg";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { UI } from "@/constants/UI";

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

  const [focus, setFocus] = useState(false);

  const handleBlur = () => {
    setFocus(false);
  };

  const handleFocus = () => {
    setFocus(true);
  };
  return (
    <View style={{ position: "relative" }}>
      <Pressable
        onPress={() => setShowPassword((showPassword) => !showPassword)}
        style={{ zIndex: 2 }}
      >
        <View
          style={{
            position: "absolute",
            top: 6,
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
          borderRadius: UI.input.borderRadius,
          borderWidth: UI.input.borderWidth,
          paddingHorizontal: UI.input.horizontalPadding,
          paddingVertical: UI.input.verticalPadding,
          backgroundColor: "white",
          marginTop: 8,
          borderColor: error ? Colors.error : focus ? "#416680" : "#ECEFF1",
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={!showPassword}
        placeholder="********"
      />
    </View>
  );
}
