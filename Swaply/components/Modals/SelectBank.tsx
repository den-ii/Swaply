import { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import FontText from "../FontText";
import Close from "@/assets/images/close.svg";
import {
  Modal,
  Pressable,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  // Image,
} from "react-native";
import LargeModal from "./LargeModal";
import { BankSVG } from "../BankSVG";
import bankList from "@/constants/bankList";
import { Image } from "expo-image";
import { recepientDetailsNGN } from "@/app/(tabs)/(home)/receipient_details";
import { useSharedValue, withDelay, withTiming } from "react-native-reanimated";

export default function SelectBank({
  modalActive,
  setModalActive,
  handleForm,
}: {
  modalActive: boolean;
  setModalActive: Function;
  handleForm: (key: keyof recepientDetailsNGN, value: string) => void;
}) {
  const [banks, setBanks] = useState(bankList);
  const translateY = useSharedValue(0);

  const handleSearchForBank = (search: string) => {
    setBanks(bankList.filter((bank) => bank.name.includes(search)));
  };

  const closeModal = () => {
    translateY.value = withTiming(1000);
    setTimeout(
      () => {
        setModalActive(false);
        translateY.value = 0;
      },

      500
    );
  };
  const handleSetBank = (bankName: string) => {
    handleForm("bank", bankName);
    setModalActive(false);
  };

  return (
    <LargeModal
      modalActive={modalActive}
      closeModal={closeModal}
      translateY={translateY}
    >
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Pressable onPress={closeModal}>
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
        <View style={{ marginTop: 20 }}>
          <FontText fontFamily="P22" fontWeight={700} fontSize={24}>
            Select Bank
          </FontText>
        </View>
        <View style={{ paddingTop: 16, paddingBottom: 10 }}>
          <TextInput
            placeholder="Search for bank"
            style={{
              paddingVertical: 10,
              paddingHorizontal: 12,
              backgroundColor: "#ECEFF1",
              borderRadius: 100,
              fontSize: 14,
              fontFamily: "Inter_500Medium",
              color: Colors.light.textDefault,
            }}
            onChangeText={handleSearchForBank}
            cursorColor={Colors.light.textDefault}
            selectionColor={Colors.light.textDefault}
            placeholderTextColor={Colors.light.textDisabled}
          />
        </View>
        <ScrollView style={{ marginTop: 16 }}>
          <View style={{ backgroundColor: "white", borderRadius: 20 }}>
            {banks.map((bank) => (
              <Pressable
                onPress={() => handleSetBank(bank.name)}
                key={bank.name}
              >
                <View
                  style={{
                    padding: 16,
                    flexDirection: "row",
                    gap: 16,
                    alignItems: "center",
                  }}
                >
                  <BankSVG bank={bank.name} />

                  <FontText>{bank.name}</FontText>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </>
    </LargeModal>
  );
}
