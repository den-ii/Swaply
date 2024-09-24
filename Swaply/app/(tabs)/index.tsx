import FontText from "@/components/FontText";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { useRef, useState } from "react";
import { GetCountrySVG } from "@/components/GetCountrySVG";
import ArrowDown from "@/assets/images/arrow-down.svg";

export default function Home() {
  const [country, setCountry] = useState("CFA");
  const [sendInputActive, setSendInputActive] = useState(false);
  const [receiveInputActive, setReceiveInputActive] = useState(false);
  const sendInputRef = useRef<any | null>(null);
  const receiveInputRef = useRef<any | null>(null);

  const handleSendInputActive = () => {
    if (sendInputRef.current) {
      sendInputRef.current.focus();
    }
  };

  const handleRecieveInputActive = () => {
    if (receiveInputRef.current) {
      receiveInputRef.current.focus();
    }
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.banner}></View>
      <View
        style={{
          paddingHorizontal: UI.paddingHorizontal,
          paddingTop: 16,
          flex: 1,
          backgroundColor: Colors.light.body,
        }}
      >
        <FontText fontSize={34} fontWeight={700}>
          Send Money
        </FontText>

        <FontText color={Colors.light.neutral} style={{ marginTop: 10 }}>
          Enter the amount and select the currency you want to send money to
        </FontText>

        <Pressable onPress={handleSendInputActive}>
          <View
            style={{
              ...styles.sendValueContainer,
              borderWidth: sendInputActive ? 2 : 0,
            }}
          >
            <View
              style={{
                gap: 8,
              }}
            >
              <FontText
                color={Colors.light.neutral}
                fontSize={12}
                fontWeight={600}
              >
                YOU SEND
              </FontText>
              <TextInput
                ref={sendInputRef}
                style={{
                  fontSize: 24,
                  fontFamily: "Inter_700Bold",
                  color: Colors.light.textDefault,
                  width: 150,
                }}
                placeholder="0.00"
                cursorColor={Colors.light.textDefault}
                selectionColor={Colors.light.textDefault}
                placeholderTextColor={Colors.light.textDisabled}
                inputMode="decimal"
                keyboardType="number-pad"
                onFocus={() => setSendInputActive(true)}
                onBlur={() => setSendInputActive(false)}
              />
            </View>
            <View
              style={{
                width: 100,
                padding: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F5F7F8",
                borderRadius: 100,
              }}
            >
              <View>
                <GetCountrySVG country={country} />
              </View>
              <FontText fontWeight={600} fontSize={16}>
                {country}
              </FontText>
              <ArrowDown />
            </View>
          </View>
        </Pressable>

        <Pressable onPress={handleRecieveInputActive}>
          <View
            style={{
              ...styles.sendValueContainer,
              borderWidth: receiveInputActive ? 2 : 0,
            }}
          >
            <View
              style={{
                gap: 8,
              }}
            >
              <FontText
                color={Colors.light.neutral}
                fontSize={12}
                fontWeight={600}
              >
                RECIEVER GETS
              </FontText>
              <TextInput
                style={{
                  fontSize: 24,
                  fontFamily: "Inter_700Bold",
                  color: Colors.light.textDefault,
                  width: 150,
                }}
                ref={receiveInputRef}
                placeholder="0.00"
                cursorColor={Colors.light.textDefault}
                selectionColor={Colors.light.textDefault}
                placeholderTextColor={Colors.light.textDisabled}
                inputMode="decimal"
                keyboardType="number-pad"
                onFocus={() => setReceiveInputActive(true)}
                onBlur={() => setReceiveInputActive(false)}
              />
            </View>
            <View
              style={{
                width: 100,
                padding: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F5F7F8",
                borderRadius: 100,
              }}
            >
              <View>
                <GetCountrySVG country={country} />
              </View>
              <FontText fontWeight={600} fontSize={16}>
                {country}
              </FontText>
              <ArrowDown />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    height: 115,
    backgroundColor: "#039AFF",
  },
  sendValueContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginTop: 32,
    borderColor: "#416680",
  },
});
