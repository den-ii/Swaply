import {
  Pressable,
  View,
  StyleSheet,
  TextInput,
  InputModeOptions,
  Dimensions,
  Keyboard,
  TextInputProps,
} from "react-native";
import Close from "@/assets/images/close.svg";
import FontText from "./FontText";
import { useRef, useState } from "react";
import { Controller, Control, Noop, set } from "react-hook-form";
import type { FieldError, RegisterOptions } from "react-hook-form";
import { Colors } from "../constants/Colors";
import { UI } from "@/constants/UI";

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
  errorSize,
  rules,
  setDisableAction,
  success,
  successMessage,
  ...props
}: {
  label: string;
  placeholder: string;
  inputMode: InputModeOptions;
  name: string;
  error: FieldError | undefined;
  clearErrors: Function;
  isValid: boolean;
  errorSize?: number;
  resetField: Function;
  control: Control<any>;
  returnKey?: boolean;
  rules?: RegisterOptions<any, string> | undefined;
  success?: boolean;
  successMessage?: string;
  setDisableAction?: Function;
} & TextInputProps) {
  const [focus, setFocus] = useState(false);
  const inputContainerRef = useRef<View | null>(null);

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

  const handleOnChange = (text: string, onChange: (text: string) => void) => {
    onChange(text);
    if (!setDisableAction) return;
    if (text.length > 0) {
      setDisableAction(false);
    } else setDisableAction(true);
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
              <View>
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
                  onChangeText={(text) => handleOnChange(text, onChange)}
                  value={value}
                  onFocus={handleFocus}
                  onBlur={() => handleBlur(onBlur)}
                  {...props}
                />

                {value?.length > 0 && focus ? (
                  <Pressable
                    onPress={handleReset}
                    style={styles.cancelContainer}
                  >
                    <View style={styles.cancel}>
                      <Close fill="white" width={12} />
                    </View>
                  </Pressable>
                ) : null}
              </View>
              <FontText
                fontSize={errorSize ?? 12}
                color={
                  !isValid && error
                    ? Colors.error
                    : success
                    ? Colors.success
                    : "#fff"
                }
                style={{
                  marginTop: 4,
                  opacity: (!isValid && error) || success ? 1 : 0,
                }}
              >
                {!isValid && error
                  ? error.message
                  : success
                  ? successMessage
                  : "empyy"}
              </FontText>
            </>
          )}
        />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  inputContainer: {
    paddingBottom: 16,
    gap: 8,
  },
  input: {
    backgroundColor: "white",
    borderRadius: UI.input.borderRadius,
    borderWidth: UI.input.borderWidth,
    paddingHorizontal: UI.input.horizontalPadding,
    paddingVertical: UI.input.verticalPadding,
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
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    right: 16,
  },
});
