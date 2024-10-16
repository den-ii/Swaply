import { useState } from "react";
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
import { BankSVG } from "../BankSVG";
import bankList from "@/constants/bankList";
import { Image } from "expo-image";
import { recepientDetailsNGN } from "@/app/(tabs)/(home)/receipient_details";

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

  const handleSearchForBank = (search: string) => {
    setBanks(bankList.filter((bank) => bank.name.includes(search)));
  };

  const handleSetBank = (bankName: string) => {
    handleForm("bank", bankName);
    setModalActive(false);
  };

  return (
    <Modal visible={modalActive} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.overlay2}>
          <Pressable style={{ flex: 1 }} onPress={() => setModalActive(false)}>
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
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    height: "92%",
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
  bankLogo: {
    backgroundColor: "white",
    shadowColor: "#313131",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
