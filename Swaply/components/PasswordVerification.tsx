import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { TextInput, View, StyleSheet } from "react-native";
import FontText from "./FontText";
import Check from "@/assets/images/check.svg";
import { router } from "expo-router";
import Button from "./Button";
import Password from "./Password";
import { useState } from "react";

export default function PasswordVerification({
  action,
  headerText,
  labelText,
  buttonText,
}: {
  action: (password: string) => void;
  headerText: string;
  labelText: string;
  buttonText?: string;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [valid, setValid] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
  });

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setValid({
      length: value.length >= 8,
      lowercase: /[a-z]/.test(value),
      uppercase: /[A-Z]/.test(value),
    });
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setConfirmPasswordError(password !== value);
  };

  const handleAction = () => {
    if (password !== confirmPassword) {
      setShowPasswordError(true);
      setConfirmPasswordError(true);
      return;
    }

    action(password);
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
          {headerText}
        </FontText>
      </View>

      <View style={{ marginTop: 16, marginBottom: 16 }}>
        <FontText>{labelText}</FontText>
        <Password value={password} onChangeText={handlePasswordChange} />
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
        <View
          style={[
            styles.validation,
            { borderColor: valid.length ? Colors.success : "#ECEFF1" },
          ]}
        >
          <Check fill={valid.length ? Colors.success : "#AEB7BF"} />
          <FontText
            color={valid.length ? Colors.success : "#AEB7BF"}
            fontWeight={500}
            fontSize={12}
          >
            At least 8 characters
          </FontText>
        </View>
        <View
          style={[
            styles.validation,
            { borderColor: valid.lowercase ? Colors.success : "#ECEFF1" },
          ]}
        >
          <Check fill={valid.lowercase ? Colors.success : "#AEB7BF"} />
          <FontText
            color={valid.lowercase ? Colors.success : "#AEB7BF"}
            fontWeight={500}
            fontSize={12}
          >
            At least 1 lowercase
          </FontText>
        </View>
        <View
          style={[
            styles.validation,
            { borderColor: valid.uppercase ? Colors.success : "#ECEFF1" },
          ]}
        >
          <Check fill={valid.uppercase ? Colors.success : "#AEB7BF"} />
          <FontText
            color={valid.uppercase ? Colors.success : "#AEB7BF"}
            fontWeight={500}
            fontSize={12}
          >
            At least 1 uppercase
          </FontText>
        </View>
      </View>
      <View style={{ marginTop: 16, marginBottom: 16 }}>
        <FontText>Confirm password</FontText>
        <Password
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          error={confirmPasswordError && showPasswordError}
        />
        <FontText
          fontSize={12}
          color={Colors.error}
          style={{
            marginTop: 8,
            opacity: confirmPasswordError && showPasswordError ? 1 : 0,
          }}
        >
          Passwords do not match, please try again
        </FontText>
      </View>

      <View style={{ marginTop: 16 }}>
        <Button
          text={buttonText ?? "Continue"}
          action={handleAction}
          disabled={
            !valid.length ||
            !valid.lowercase ||
            !valid.uppercase ||
            confirmPassword.length <= 8
          }
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
