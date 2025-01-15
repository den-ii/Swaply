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
  FlatList,
  // Image,
} from "react-native";
import Search from "@/components/Search";
import CustomModal from "./CustomModal";
import { BankSVG } from "../BankSVG";
import bankList from "@/constants/bankList";
import { Image } from "expo-image";
import { useCloseModal } from "@/hooks/useCloseModal";
import { recepientDetailsNGN, recepientDetailsCFA } from "@/types/recepient";
import { transferStore } from "@/store";
import { getListOfBanksNGN } from "@/api/paymentAPI";
import useSWR from "swr";
import { Bank } from "@/types";

export default function SelectBank({
  modalActive,
  setModalActive,
}: {
  modalActive: boolean;
  setModalActive: Function;
}) {
  const [bankList, setBankList] = useState<Bank[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const { translateY, closeModal } = useCloseModal(modalActive, setModalActive);
  const { data, isLoading, error } = useSWR(
    "naira-payment/banks",
    getListOfBanksNGN,
    {
      onSuccess: (data) => {
        if (data.status) {
          const banks = data.data;
          setBankList(banks);
          setBanks(banks);
          // transferStore.update((store) => {
          //   store.recepientNGN.amount = data.amount;
          // });
        }
      },
    }
  );

  useEffect(() => {
    handleSearchForBank();
  }, [searchValue]);

  const handleSearchForBank = () => {
    if (!searchValue || searchValue.trim() === "") {
      setBanks(bankList as Bank[]);
      return;
    }
    setBanks(
      bankList.filter((bank) =>
        bank.name.toLowerCase().includes(searchValue.toLowerCase())
      ) as Bank[]
    );
  };

  const handleSetBank = (bank: Bank) => {
    console.log("Bank selected:", bank);
    transferStore.update((store) => {
      store.recepientNGN.bank = bank;
    });
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
        <View
          style={{ backgroundColor: "white", borderRadius: 20, marginTop: 16 }}
        >
          <FlatList
            data={banks}
            renderItem={({ item }) => (
              <BankButton bank={item} handleSetBank={handleSetBank} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </>
    </CustomModal>
  );
}

const BankButton = ({
  bank,
  handleSetBank,
}: {
  bank: Bank;
  handleSetBank: Function;
}) => {
  return (
    <Pressable onPress={() => handleSetBank(bank)} key={bank.id}>
      <View
        style={{
          padding: 16,
          flexDirection: "row",
          gap: 16,
          alignItems: "center",
        }}
      >
        <BankSVG bank={bank} />

        <FontText>{bank.name}</FontText>
      </View>
    </Pressable>
  );
};
