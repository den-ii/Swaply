import { useEffect, useCallback, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  StatusBar,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import Close from "@/assets/images/close.svg";
import { Colors } from "@/constants/Colors";
import FontText from "@/components/FontText";
import useSWRMutation from "swr/mutation";
import { UI } from "@/constants/UI";
import { GetCountrySVG } from "@/components/GetCountrySVG";
import Button from "@/components/Button";
import ArrowDown from "@/assets/images/arrow-down.svg";
import HomeHeaderBanner from "@/assets/images/home_header.svg";
import Calc from "@/assets/images/calc.svg";
import CFA_flag from "@/assets/images/CFA_32.svg";
import NGN_flag from "@/assets/images/NGN_32.svg";
import Selected from "@/assets/images/selected.svg";
import { authStore, transferStore, transferStoreDefaultValue } from "@/store";
import CustomModal from "@/components/modals/CustomModal";
import Currency from "@/components/modals/Currency";
import { Country } from "@/types/country";
import convertCurrency from "@/api/paymentAPI";
import useDebounce from "@/hooks/useDebounce";
import Minus from "@/assets/images/minus.svg";
import Times from "@/assets/images/times.svg";
import Equals from "@/assets/images/equals.svg";
import Entypo from "@expo/vector-icons/Entypo";
import DismissKeyboard from "@/components/DismissKeyboard";

export default function Home() {
  const debounceFunc = useDebounce();
  const profileImage = authStore.useState((state) => state.profileImage);
  const country = authStore.useState((state) => state.country);
  const [sendCountry, setSendCountry] = useState<Country>(Country.BENIN);
  const [sendValue, setSendValue] = useState("");
  const [receiveValue, setReceiveValue] = useState("");
  const [receiveCountry, setReceiveCountry] = useState(Country.NIGERIA);
  const [totalAmount, setTotalAmount] = useState<string | null>(null);
  const [disableContinue, setDisableContinue] = useState(true);
  const [sendInputActive, setSendInputActive] = useState(false);
  const [receiveInputActive, setReceiveInputActive] = useState(false);
  const [sendIsCFA, setSendIsCFA] = useState(true);
  const [sendIsNGN, setSendIsNGN] = useState(false);
  const [fee, setFee] = useState<string | null>(null);
  const [rate, setRate] = useState<string | null>(null);
  const [reverse, setReverse] = useState(false);
  const sendInputRef = useRef<any | null>(null);
  const receiveInputRef = useRef<any | null>(null);
  const [modalActive, setModalActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { trigger, data, isMutating, error } = useSWRMutation(
    "conversion/convert",
    convertCurrency,
    {
      onSuccess: (data) => {
        if (!data.status) {
          reset();
          setReceiveValue("");
          return;
        }
        if (!data.data) return;
        const fees = data.data.fees;
        const totalAmount = formatNumber(fees?.totalAmountSending);
        setFee(String(fees.fee));
        setRate(String(fees.rate));
        setTotalAmount(totalAmount);
        const covertedValue = String(data.data?.conversion.toFixed(2));
        if (reverse) setSendValue(covertedValue);
        else setReceiveValue(covertedValue);
      },
      onError: (error) => {
        console.error("Error converting currency: ", error);
      },
    }
  );

  function triggerConversion(value: string, reverse: boolean = false) {
    if (!value) return;
    const args: {
      sourceCurrency: Country;
      destinationCurrency: Country;
      amount: number;
      reverse?: boolean;
    } = {
      sourceCurrency: sendCountry,
      destinationCurrency: receiveCountry,
      amount: Number(value),
    };
    if (reverse) {
      args.reverse = true;
      setReverse(true);
    } else setReverse(false);

    console.log(args);

    debounceFunc(() => trigger(args));
  }

  function reset() {
    setFee(null);
    setRate(null);
    setTotalAmount(null);
  }

  useEffect(() => {
    if (country === "Nigeria") {
      setSendCountry(Country.NIGERIA);
      setReceiveCountry(Country.BENIN);
    } else {
      setSendCountry(Country.BENIN);
      setReceiveCountry(Country.NIGERIA);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setSendValue("");
      setReceiveValue("");
      reset();
      transferStore.update((store) => transferStoreDefaultValue);
    }, [])
  );

  useEffect(() => {
    checkDisabled();
  }, [sendValue, receiveValue]);

  useEffect(() => {
    if (sendCountry === Country.BENIN) {
      setSendIsCFA(true);
      setSendIsNGN(false);
      handleConversion(sendValue, true);
    } else {
      setSendIsCFA(false);
      setSendIsNGN(true);
      handleConversion(sendValue, true);
    }
  }, [sendCountry]);

  const handleSendInputActive = () => {
    if (sendInputRef.current) {
      sendInputRef.current.focus();
    }
  };

  const switchCurrency = (send: Country) => {
    if (send === Country.BENIN) {
      setSendCountry(Country.BENIN);
      setReceiveCountry(Country.NIGERIA);
    } else {
      setSendCountry(Country.NIGERIA);
      setReceiveCountry(Country.BENIN);
    }
  };

  const checkDisabled = () => {
    console.log(sendValue, receiveValue);
    if (Number(sendValue) <= 0 || sendValue.trim() === "") {
      setDisableContinue(true);
    } else {
      setDisableContinue(false);
    }
  };

  const handleContinue = async () => {
    console.log("sendCountry: ", sendCountry);
    console.log("sendCountry: ", sendCountry === Country.BENIN);
    await transferStore.update((state) => {
      state.sendAmount = sendValue;
      state.receiveAmount = receiveValue;
      state.sendingIsCFA = sendCountry === Country.BENIN;
      state.sendingCurrency = sendCountry;
      state.rate = rate || "0.00";
      state.totalAmount = totalAmount || "0.00";
      state.fee = fee || "0.00";
      // state.transactionFee = fee;
    });
    router.push("/(app)/choose_recipient");
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
    console.log("value: conv");
    setLoading(true);

    if (value.trim() === "") {
      setSendValue("");
      setReceiveValue("");
      reset();
      setLoading(false);
      return;
    }

    const cleanedValue = value.replace(/,/g, ""); // Remove commas from the string
    console.log("cleanedValue:", cleanedValue);
    const numericValue = parseInt(cleanedValue);
    console.log("numericValue:", numericValue);

    if (isNaN(numericValue)) {
      console.error("Invalid number input");
      setLoading(false);
      return;
    }
    if (sending) {
      setSendValue(formatNumber(cleanedValue));
      triggerConversion(cleanedValue);
    } else {
      setReceiveValue(formatNumber(cleanedValue));
      triggerConversion(cleanedValue, true);
    }
    setLoading(false);

    // const rate = CountryRate[sendCountry as keyof typeof CountryRate];
    // const conversionRate = rate[receiveCountry as keyof typeof rate];

    // const formattedSendValue = formatNumber(numericValue);
    // const formattedReceiveValue = formatNumber(
    //   (numericValue * conversionRate).toFixed(2)
    // );

    // if (sending) {
    //   setSendValue(formattedSendValue);
    //   setReceiveValue(formattedReceiveValue);
    // } else {
    //   setReceiveValue(formatNumber(numericValue));
    //   setSendValue(formatNumber(numericValue / conversionRate));
    // }

    // setTotalAmount(formatNumber(numericValue + fee));
  };

  const handleRecieveInputActive = () => {
    if (receiveInputRef.current) {
      receiveInputRef.current.focus();
    }
  };

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <DismissKeyboard>
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={{ position: "relative" }}>
            <HomeHeaderBanner />

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                position: "absolute",
                bottom: 16,
                left: 16,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontText
                style={{ textAlign: "center" }}
                color="white"
                fontWeight={600}
                fontSize={18}
              >
                {profileImage}
              </FontText>
            </View>
          </View>
          {/* <KeyboardAvoidingView
            keyboardVerticalOffset={47}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
          > */}
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
                  ...styles.valueContainer,
                  borderColor: sendInputActive ? "#416680" : "#fff",
                  borderWidth: 1.5,
                  padding: 14,
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
                      width: 170,
                    }}
                    placeholder="0.00"
                    cursorColor={Colors.light.textDefault}
                    selectionColor={Colors.light.textDefault}
                    placeholderTextColor={Colors.light.textDisabled}
                    maxLength={10}
                    inputMode="numeric"
                    keyboardType="number-pad"
                    // returnKeyType="done"
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
            <View style={{ paddingLeft: 16 }}>
              <View
                style={{
                  borderLeftWidth: 1,
                  borderColor: "#8BD1FF",
                  height: 150,
                  position: "relative",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: -10,
                    bottom: 0,
                    zIndex: 2,
                    height: 150,
                    gap: 15,
                    right: 0,
                    // transform: [{ translateY: 75 }],
                    justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 24,
                      alignItems: "center",
                    }}
                  >
                    <Minus />

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {fee && (
                        <Text style={{}}>
                          <Text
                            style={{
                              fontFamily: "Inter_600SemiBold",
                              color: Colors.light.textDefault,
                            }}
                          >
                            {`${fee} ${
                              sendCountry === Country.BENIN
                                ? Country.BENIN
                                : Country.NIGERIA
                            }  `}
                          </Text>
                          <Text
                            style={{
                              marginTop: 32,
                              fontFamily: "Inter_500Medium",
                              color: Colors.light.textPrimary,
                            }}
                          >
                            Fee
                          </Text>
                        </Text>
                      )}
                      {!fee && (
                        <Entypo
                          name="dots-three-horizontal"
                          size={12}
                          color={Colors.light.textDefault}
                        />
                      )}
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 24,
                      alignItems: "center",
                    }}
                  >
                    <Times />

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {fee && (
                        <Text style={{}}>
                          <Text
                            style={{
                              fontFamily: "Inter_600SemiBold",
                              color: Colors.light.textDefault,
                            }}
                          >
                            {rate}
                          </Text>
                          <Text
                            style={{
                              marginTop: 32,
                              fontFamily: "Inter_500Medium",
                              color: Colors.light.neutral,
                            }}
                          >
                            {"  "}
                            Rate
                          </Text>
                        </Text>
                      )}
                      {!fee && (
                        <Entypo
                          name="dots-three-horizontal"
                          size={12}
                          color={Colors.light.textDefault}
                        />
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 24,
                      alignItems: "center",
                    }}
                  >
                    <Equals />

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {fee && (
                        <Text style={{}}>
                          <Text
                            style={{
                              fontFamily: "Inter_600SemiBold",
                              color: Colors.light.textDefault,
                            }}
                          >
                            {totalAmount}
                          </Text>
                          <Text
                            style={{
                              marginTop: 32,
                              fontFamily: "Inter_500Medium",
                              color: Colors.light.neutral,
                            }}
                          >
                            {"  "}
                            Total Amount
                          </Text>
                        </Text>
                      )}
                      {!fee && (
                        <Entypo
                          name="dots-three-horizontal"
                          size={12}
                          color={Colors.light.textDefault}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <Pressable onPress={handleRecieveInputActive}>
              <View
                style={{
                  ...styles.valueContainer,
                  padding: 14,
                  marginTop: 0,
                  borderWidth: 1.5,
                  borderColor: receiveInputActive ? "#416680" : "#fff",
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
                      width: 170,
                    }}
                    ref={receiveInputRef}
                    placeholder="0.00"
                    cursorColor={Colors.light.textDefault}
                    selectionColor={Colors.light.textDefault}
                    placeholderTextColor={Colors.light.textDisabled}
                    inputMode="decimal"
                    keyboardType="decimal-pad"
                    maxLength={10}
                    autoCorrect={false}
                    autoComplete="off"
                    // returnKeyType="done"
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
            <View style={{ marginTop: 24 }}>
              <Button
                text={"Continue"}
                loading={loading || isMutating}
                action={handleContinue}
                disabled={disableContinue}
              />
            </View>
          </View>
          {/* </KeyboardAvoidingView> */}
        </View>
      </DismissKeyboard>
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
  valueContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginTop: 32,
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
