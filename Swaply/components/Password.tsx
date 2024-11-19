import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

export default function Password({
  value,
  onChangeText,
}: {
  value: number | string;
  onChangeText: (value: string | number) => void;
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
            top: 22,
            right: 20,
            width: 30,
          }}
        >
          {showPassword && <Entypo name="eye" size={22} color="#AEB7BF" />}
          {!showPassword && (
            <MaterialCommunityIcons name="eye-off" size={22} color="#AEB7BF" />
          )}
        </View>
      </Pressable>

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
        secureTextEntry={!showPassword}
        selectionColor={Colors.light.text}
        placeholder="********"
      />
    </View>
  );
}
