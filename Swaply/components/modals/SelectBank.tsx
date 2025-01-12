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
import Search from "@/components/Search";
import CustomModal from "./CustomModal";
import { BankSVG } from "../BankSVG";
import bankList from "@/constants/bankList";
import { Image } from "expo-image";
import { useCloseModal } from "@/hooks/useCloseModal";
import { recepientDetailsNGN, recepientDetailsCFA } from "@/types/recepient";

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
  const [searchValue, setSearchValue] = useState("");
  const { translateY, closeModal } = useCloseModal(modalActive, setModalActive);

  useEffect(() => {
    handleSearchForBank();
  }, [searchValue]);

  const handleSearchForBank = () => {
    setBanks(
      bankList.filter((bank) =>
        bank.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const handleSetBank = (bankName: string) => {
    handleForm("bank", bankName);
    setModalActive(false);
  };

  return (
    <CustomModal
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
        <View style={{ marginTop: 16, marginBottom: 10, position: "relative" }}>
          <Search value={searchValue} setValue={setSearchValue} />
        </View>
        <ScrollView
          style={{ marginTop: 16 }}
          showsVerticalScrollIndicator={false}
        >
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
    </CustomModal>
  );
}
