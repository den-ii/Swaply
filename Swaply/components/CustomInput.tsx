import {
  Pressable,
  View,
  StyleSheet,
  TextInput,
  InputModeOptions,
} from "react-native";
import Close from "@/assets/images/close.svg";
import FontText from "./FontText";
import { useRef, useState } from "react";
import { Controller, Control, Noop } from "react-hook-form";
import type { FieldError, RegisterOptions } from "react-hook-form";
import { Colors } from "../constants/Colors";

export default function CustomInput({
  label,
  placeholder,
  inputMode,
  resetField,
  error,
  control,
  name,
  returnKey,
  isValid,
  clearErrors,
  rules,
}: {
  label: string;
  placeholder: string;
  inputMode: InputModeOptions;
  name: string;
  error: FieldError | undefined;
  clearErrors: Function;
  isValid: boolean;
  resetField: Function;
  control: Control<any>;
  returnKey?: boolean;
  rules?: RegisterOptions<any, string> | undefined;
}) {
  const [focus, setFocus] = useState(false);

  const handleBlur = (onBlur: Noop) => {
    setFocus(false);
    onBlur();
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const inputRef = useRef<TextInput>(null);
  const handleReset = () => {
    resetField(name);
    clearErrors(name);
    inputRef.current?.focus();
  };

  return (
    <View style={styles.inputContainer}>
      <FontText>{label}</FontText>
      <View>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                ref={inputRef}
                style={[
                  styles.input,
                  {
                    borderColor:
                      !isValid && error
                        ? Colors.error
                        : focus
                        ? "#416680"
                        : "#ECEFF1",
                  },
                ]}
                placeholder={placeholder}
                placeholderTextColor="#AEB7BF"
                inputMode={inputMode}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType={returnKey ? "done" : undefined}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocus}
                onBlur={() => handleBlur(onBlur)}
              />

              {value?.length > 0 && (
                <Pressable onPress={handleReset} style={styles.cancelContainer}>
                  <View style={styles.cancel}>
                    <Close fill="white" width={12} />
                  </View>
                </Pressable>
              )}
              <FontText
                fontSize={12}
                color={Colors.error}
                style={{ marginTop: 8, opacity: !isValid && error ? 1 : 0 }}
              >
                {!isValid && error ? error.message : "empyy"}
              </FontText>
            </>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 8,
    paddingBottom: 16,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 16,
    position: "relative",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  cancel: {
    width: 16,
    height: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AEB7BF",
  },
  cancelContainer: {
    position: "absolute",
    top: 18,
    width: 20,
    height: 20,
    right: 12,
  },
});
