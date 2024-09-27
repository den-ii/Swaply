import FontText from "@/components/FontText";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  StatusBar,
  Modal,
} from "react-native";
import Close from "@/assets/images/close.svg";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { useEffect, useRef, useState } from "react";
import { GetCountrySVG } from "@/components/GetCountrySVG";
import Button from "@/components/Button";
import ArrowDown from "@/assets/images/arrow-down.svg";
import HomeHeaderBanner from "@/assets/images/home_header.svg";
import Calc from "@/assets/images/calc.svg";
import CFA_flag from "@/assets/images/CFA_32.svg";
import NGN_flag from "@/assets/images/NGN_32.svg";
import Selected from "@/assets/images/selected.svg";

const CountryRate = {
  CFA: {
    NGN: 160,
  },
  NGN: {
    CFA: 0.024,
  },
};

export default function Home() {
  const [sendCountry, setSendCountry] = useState("CFA");
  const [sendValue, setSendValue] = useState("");
  const [receiveValue, setReceiveValue] = useState("");
  const [receiveCountry, setReceiveCountry] = useState("NGN");
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [sendInputActive, setSendInputActive] = useState(false);
  const [receiveInputActive, setReceiveInputActive] = useState(false);
  const [sendIsCFA, setSendIsCFA] = useState(true);
  const [sendIsNGN, setSendIsNGN] = useState(false);
  const fee = 2;
  const [sendRate, setSendRate] = useState(160);
  const sendInputRef = useRef<any | null>(null);
  const receiveInputRef = useRef<any | null>(null);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    if (sendCountry === "CFA") {
      setSendIsCFA(true);
      let rate = CountryRate.CFA.NGN;
      setSendRate(rate);
      setReceiveValue((Number(sendValue) * rate).toFixed(2));
      setSendIsNGN(false);
    } else {
      setSendIsCFA(false);
      let rate = CountryRate.NGN.CFA;
      setSendRate(rate);
      setReceiveValue((Number(sendValue) * rate).toFixed(2));
      setSendIsNGN(true);
    }
  }, [sendCountry]);

  const handleSendInputActive = () => {
    if (sendInputRef.current) {
      sendInputRef.current.focus();
    }
  };

  const switchCurrency = (send: string) => {
    if (send === "CFA") {
      setSendCountry("CFA");
      setReceiveCountry("NGN");
    } else {
      setSendCountry("NGN");
      setReceiveCountry("CFA");
    }
  };

  const formatNumber = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Regular expression to add commas
  };

  const handleConversion = (value: string, sending: boolean) => {
    const rate = CountryRate[sendCountry as keyof typeof CountryRate];
    const conversionRate = rate[receiveCountry as keyof typeof rate];
    if (sending) {
      setSendValue(value);
      setReceiveValue((Number(value) * conversionRate).toFixed(2));
    } else {
      setReceiveValue(value);
      setSendValue((Number(value) * conversionRate).toFixed(2));
    }
    // const totalAmount = sending
    setTotalAmount(Number(value) + fee);
  };

  const handleRecieveInputActive = () => {
    if (receiveInputRef.current) {
      receiveInputRef.current.focus();
    }
  };
  return (
    <>
      <StatusBar barStyle={"light-content"} />

      <View
        style={{
          flex: 1,
        }}
      >
        <View>
          <HomeHeaderBanner />
        </View>
        <View
          style={{
            paddingHorizontal: UI.paddingHorizontal,
            paddingTop: 16,
            flex: 1,
            backgroundColor: Colors.light.body,
          }}
        >
          <FontText fontSize={34} fontWeight={700} fontFamily="P22">
            Send Money
          </FontText>

          <FontText color={Colors.light.neutral} style={{ marginTop: 10 }}>
            Enter the amount and select the currency you want to send money to
          </FontText>

          <Pressable onPress={handleSendInputActive}>
            <View
              style={{
                ...styles.sendValueContainer,
                padding: sendInputActive ? 14 : 16,
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
                    fontFamily: "P22Mackinac_Bold",
                    color: Colors.light.textDefault,
                    width: 180,
                  }}
                  placeholder="0.00"
                  cursorColor={Colors.light.textDefault}
                  selectionColor={Colors.light.textDefault}
                  placeholderTextColor={Colors.light.textDisabled}
                  maxLength={15}
                  inputMode="decimal"
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                  onChangeText={(value) => handleConversion(value, true)}
                  value={sendValue}
                  blurOnSubmit={true}
                  onFocus={() => setSendInputActive(true)}
                  onBlur={() => setSendInputActive(false)}
                />
              </View>
              <Pressable
                onPress={() => setModalActive((modalActive) => !modalActive)}
              >
                <View
                  style={{
                    width: 100,
                    padding: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#F5F7F8",
                    borderRadius: 100,
                    gap: 8,
                  }}
                >
                  <View>
                    <GetCountrySVG country={sendCountry} />
                  </View>
                  <FontText fontWeight={600} fontSize={16}>
                    {sendCountry}
                  </FontText>
                  <ArrowDown />
                </View>
              </Pressable>
            </View>
          </Pressable>
          <View
            style={{ flexDirection: "row", paddingHorizontal: 16, gap: 18 }}
          >
            <Calc />
            <View>
              <View style={{ flexDirection: "row", gap: 6 }}>
                <FontText
                  style={{ marginTop: 32 }}
                  fontWeight={600}
                  fontSize={14}
                >
                  2 CFA
                </FontText>
                <FontText
                  style={{ marginTop: 32 }}
                  fontWeight={500}
                  fontSize={14}
                  color={Colors.light.textPrimary}
                >
                  Fee
                </FontText>
              </View>
              <View style={{ flexDirection: "row", gap: 6, marginTop: 17.75 }}>
                <FontText fontSize={14} fontWeight={600}>
                  {`1 CFA = ${sendRate}`}
                </FontText>
                <FontText
                  fontSize={14}
                  fontWeight={500}
                  color={Colors.light.neutral}
                >
                  Rate
                </FontText>
              </View>
              <View style={{ flexDirection: "row", gap: 6, marginTop: 17.75 }}>
                <FontText
                  fontSize={14}
                  fontWeight={600}
                  style={{ maxWidth: 200 }}
                >
                  {`${totalAmount.toFixed(2).toLocaleString()} ${sendCountry}`}
                </FontText>
                <FontText
                  fontSize={14}
                  fontWeight={500}
                  color={Colors.light.neutral}
                >
                  Total Amount
                </FontText>
              </View>
            </View>
          </View>
          <Pressable onPress={handleRecieveInputActive}>
            <View
              style={{
                ...styles.sendValueContainer,
                padding: receiveInputActive ? 14 : 16,
                marginTop: 0,
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
                  RECEIVER GETS
                </FontText>
                <TextInput
                  style={{
                    fontSize: 24,
                    fontFamily: "P22Mackinac_Bold",
                    color: Colors.light.textDefault,
                    width: 180,
                  }}
                  ref={receiveInputRef}
                  placeholder="0.00"
                  cursorColor={Colors.light.textDefault}
                  selectionColor={Colors.light.textDefault}
                  placeholderTextColor={Colors.light.textDisabled}
                  inputMode="decimal"
                  keyboardType="number-pad"
                  maxLength={15}
                  returnKeyType="done"
                  onChangeText={(value) => handleConversion(value, false)}
                  value={receiveValue}
                  blurOnSubmit={true}
                  onFocus={() => setReceiveInputActive(true)}
                  onBlur={() => setReceiveInputActive(false)}
                />
              </View>
              <Pressable onPress={() => setModalActive(true)}>
                <View
                  style={{
                    width: 100,
                    padding: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#F5F7F8",
                    gap: 8,
                    borderRadius: 100,
                  }}
                >
                  <View>
                    <GetCountrySVG country={receiveCountry} />
                  </View>
                  <FontText fontWeight={600} fontSize={16}>
                    {receiveCountry}
                  </FontText>
                  <ArrowDown />
                </View>
              </Pressable>
            </View>
          </Pressable>
          <View style={{ marginTop: 16 }}>
            <Button text={"Continue"} />
          </View>
        </View>
      </View>
      <Modal visible={modalActive} transparent={true} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.overlay2}>
            <Pressable
              style={{ flex: 1 }}
              onPress={() => setModalActive(false)}
            >
              <View style={{ flex: 1 }}></View>
            </Pressable>
            <View style={styles.modal}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Pressable onPress={() => setModalActive(false)}>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: "#F5F7F8",
                      borderRadius: 32,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Close fill="#757D87" />
                  </View>
                </Pressable>
              </View>
              <View>
                <FontText fontFamily="P22" fontWeight={700} fontSize={24}>
                  Send Currency
                </FontText>
                <FontText
                  color={Colors.light.neutral}
                  fontSize={14}
                  style={{ marginTop: 8 }}
                >
                  Choose the preferred currency you’ll like to send money in
                </FontText>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#F5F7F8",
                  borderRadius: 16,
                  marginTop: 24,
                }}
              >
                <Pressable onPress={() => switchCurrency("CFA")}>
                  <View style={styles.options}>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 16,
                        alignItems: "center",
                      }}
                    >
                      <CFA_flag />
                      <View style={{ gap: 6 }}>
                        <FontText fontWeight={500} fontSize={16}>
                          West African CFA fran
                        </FontText>
                        <FontText color={Colors.light.neutral} fontSize={14}>
                          CFA
                        </FontText>
                      </View>
                    </View>
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 16,
                        borderWidth: sendIsCFA ? 0 : 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: Colors.light.neutral,
                      }}
                    >
                      {sendIsCFA && <Selected />}
                    </View>
                  </View>
                </Pressable>
                <View style={{ paddingHorizontal: 16 }}>
                  <View
                    style={{ height: 2, backgroundColor: "#F2F6F6" }}
                  ></View>
                </View>
                <Pressable onPress={() => switchCurrency("NGN")}>
                  <View style={styles.options}>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 16,
                        alignItems: "center",
                      }}
                    >
                      <NGN_flag />
                      <View style={{ gap: 6 }}>
                        <FontText fontWeight={500} fontSize={16}>
                          Nigerian Naira
                        </FontText>
                        <FontText color={Colors.light.neutral} fontSize={14}>
                          NGN
                        </FontText>
                      </View>
                    </View>
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 16,
                        borderWidth: sendIsNGN ? 0 : 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: Colors.light.neutral,
                      }}
                    >
                      {sendIsNGN && <Selected />}
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "rgba(44, 49, 55, 0.5)",
  },
  overlay2: {
    flex: 1,
    justifyContent: "space-between",
  },
  modal: {
    backgroundColor: "#FAFBFB",
    zIndex: 50,
    height: 342,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: 16,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
});
