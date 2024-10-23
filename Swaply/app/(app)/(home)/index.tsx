import { useEffect, useCallback, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  StatusBar,
  Modal,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import Close from "@/assets/images/close.svg";
import { Colors } from "@/constants/Colors";
import FontText from "@/components/FontText";

import { UI } from "@/constants/UI";
import { GetCountrySVG } from "@/components/GetCountrySVG";
import Button from "@/components/Button";
import ArrowDown from "@/assets/images/arrow-down.svg";
import HomeHeaderBanner from "@/assets/images/home_header.svg";
import Calc from "@/assets/images/calc.svg";
import CFA_flag from "@/assets/images/CFA_32.svg";
import NGN_flag from "@/assets/images/NGN_32.svg";
import Selected from "@/assets/images/selected.svg";
import { transferStore, transferStoreDefaultValue } from "@/store";
import CustomModal from "@/components/Modals/CustomModal";
import Currency from "@/components/Modals/Currency";

export const CountryRate = {
  CFA: {
    NGN: 160,
  },
  NGN: {
    CFA: 0.024,
  },
};

export const CountryFee = {
  CFA: {
    NGN: 2,
  },
  NGN: {
    CFA: 100,
  },
};

export default function Home() {
  const [sendCountry, setSendCountry] = useState("CFA");
  const [sendValue, setSendValue] = useState("");
  const [receiveValue, setReceiveValue] = useState("");
  const [receiveCountry, setReceiveCountry] = useState("NGN");
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [sendInputActive, setSendInputActive] = useState(false);
  const [receiveInputActive, setReceiveInputActive] = useState(false);
  const [sendIsCFA, setSendIsCFA] = useState(true);
  const [sendIsNGN, setSendIsNGN] = useState(false);
  const [fee, setFee] = useState(CountryFee.CFA.NGN);
  const [sendRate, setSendRate] = useState(160);
  const sendInputRef = useRef<any | null>(null);
  const receiveInputRef = useRef<any | null>(null);
  const [modalActive, setModalActive] = useState(false);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setSendValue("");
      setReceiveValue("");
      setTotalAmount("0.00");
      transferStore.update((store) => transferStoreDefaultValue);
    }, [])
  );

  useEffect(() => {
    if (sendCountry === "CFA") {
      setSendIsCFA(true);
      setSendIsNGN(false);
      setSendRate(CountryRate.CFA.NGN);
      setFee(CountryFee.CFA.NGN);
      handleConversion(sendValue, true);
    } else {
      setSendIsCFA(false);
      setSendIsNGN(true);
      setSendRate(CountryRate.NGN.CFA);
      setFee(CountryFee.NGN.CFA);
      handleConversion(sendValue, true);
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

  const handleContinue = () => {
    transferStore.update((state) => {
      state.cfaAmount = sendCountry === "CFA" ? sendValue : receiveValue;
      state.ngnAmount = sendCountry === "NGN" ? sendValue : receiveValue;
      state.sendingIsCFA = sendCountry === "CFA";
      state.rate = sendRate;
      state.transactionFee = fee;
    });
    router.push("/(home)/choose_receipient");
  };

  const formatNumber = (num: number | string): string => {
    const decimal = num.toString().split(".")[1];
    const numberStr = typeof num === "number" ? num.toString() : num;
    return numberStr
      .split(".")[0]
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      .concat(decimal ? "." + decimal : "");
  };

  const handleConversion = (value: string, sending: boolean) => {
    // if (value.trim() === "") {
    //   console.error("Empty input");
    //   return;
    // }

    const cleanedValue = value.replace(/,/g, ""); // Remove commas from the string
    const numericValue = Number(cleanedValue);

    if (isNaN(numericValue)) {
      console.error("Invalid number input");
      return;
    }

    const rate = CountryRate[sendCountry as keyof typeof CountryRate];
    const conversionRate = rate[receiveCountry as keyof typeof rate];

    const formattedSendValue = formatNumber(numericValue);
    const formattedReceiveValue = formatNumber(
      (numericValue * conversionRate).toFixed(2)
    );

    if (sending) {
      setSendValue(formattedSendValue);
      setReceiveValue(formattedReceiveValue);
    } else {
      setReceiveValue(formatNumber(numericValue));
      setSendValue(formatNumber(numericValue / conversionRate));
    }

    setTotalAmount(formatNumber(numericValue + fee));
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
                    width: 220,
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
                  {`${fee} ${sendCountry === "CFA" ? "CFA" : "NGN"} `}
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
                  {`1 ${sendCountry} = ${sendRate}`}
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
                  {`${formatNumber(
                    Number(totalAmount.replace(/,/g, ""))
                      .toFixed(2)
                      .toLocaleString()
                  )} ${sendCountry}`}
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
                    width: 220,
                  }}
                  ref={receiveInputRef}
                  placeholder="0.00"
                  cursorColor={Colors.light.textDefault}
                  selectionColor={Colors.light.textDefault}
                  placeholderTextColor={Colors.light.textDisabled}
                  inputMode="decimal"
                  keyboardType="decimal-pad"
                  maxLength={15}
                  autoCorrect={false}
                  autoComplete="off"
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
            <Button text={"Continue"} action={handleContinue} />
          </View>
        </View>
      </View>
      <Currency
        modalActive={modalActive}
        setModalActive={setModalActive}
        switchCurrency={switchCurrency}
        sendIsCFA={sendIsCFA}
        sendIsNGN={sendIsNGN}
      />
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
});
