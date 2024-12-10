import {
  Pressable,
  View,
  StyleSheet,
  TextInput,
  InputModeOptions,
} from "react-native";
import Close from "@/assets/images/close.svg";
import FontText from "./FontText";

export default function CustomInput({
  label,
  placeholder,
  inputMode,
  value,
  setValue,
  returnKey,
  error,
  valid,
}: {
  label: string;
  placeholder: string;
  inputMode: InputModeOptions;
  value: string;
  setValue: Function;
  returnKey?: boolean;
  error?: boolean;
  valid?: boolean;
}) {
  return (
    <View style={styles.inputContainer}>
      <FontText>{label}</FontText>
      <View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#AEB7BF"
          inputMode={inputMode}
          autoCorrect={false}
          returnKeyType={returnKey ? "done" : undefined}
          onChangeText={(value) => setValue(value)}
          value={value}
        />
        {value.length > 0 && (
          <View style={styles.cancelContainer}>
            <Pressable onPress={() => setValue("")}>
              <View style={styles.cancel}>
                <Close fill="white" width={12} />
              </View>
            </Pressable>
          </View>
        )}
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
    borderWidth: 1,
    padding: 16,
    borderColor: "#ECEFF1",
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
    right: 16,
  },
});
