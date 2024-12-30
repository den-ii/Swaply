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
    <View style={{ position: "relative", marginTop: 8 }}>
      <Pressable
        onPress={() => setShowPassword((showPassword) => !showPassword)}
        style={{
          zIndex: 1,
          position: "absolute",
          justifyContent: "center",
          top: 0,
          bottom: 0,
          right: 16,
          height: "100%",
          alignItems: "flex-end",
        }}
      >
        <View style={{}}>
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
