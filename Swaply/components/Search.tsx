import { Colors } from "@/constants/Colors";
import { Pressable, TextInput, View, StyleSheet } from "react-native";
import SearchIcon from "@/assets/images/search.svg";
import Close from "@/assets/images/close.svg";
import { useState } from "react";

export default function Search({
  value,
  setValue,
}: {
  value: string;
  setValue: Function;
}) {
  const [showBorder, setShowBorder] = useState(false);
  return (
    <View style={{ position: "relative" }}>
      <View style={{ position: "absolute", top: 16, left: 12, zIndex: 2 }}>
        <SearchIcon />
      </View>
      <View style={{ height: 50 }}>
        <TextInput
          placeholder="Search..."
          style={{
            paddingLeft: 32,
            paddingRight: 16,
            paddingVertical: 16,
            backgroundColor: !showBorder ? "#ECEFF1" : "#fff",
            borderRadius: 100,
            borderWidth: showBorder ? 1 : 0,
            borderColor: "#416680",
            fontSize: 14,
            fontFamily: "Inter_600SemiBold",
            color: Colors.light.textDefault,
          }}
          onFocus={() => setShowBorder(true)}
          onBlur={() => setShowBorder(false)}
          cursorColor={Colors.light.textDefault}
          selectionColor={Colors.light.textDefault}
          placeholderTextColor={Colors.light.textDisabled}
          value={value}
          onChangeText={(value) => setValue(value)}
        />
        <View style={styles.cancelContainer}>
          <Pressable onPress={() => setValue("")}>
            <View style={styles.cancel}>
              <Close fill="white" width={12} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
