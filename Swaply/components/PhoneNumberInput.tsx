import { View, TextInput, Pressable, StyleSheet } from "react-native";
import FontText from "./FontText";
import CFA_flag from "@/assets/images/CFA_32.svg";
import NGN_flag from "@/assets/images/NGN_32.svg";
import CustomModal from "./Modals/CustomModal";
import NGN from "@/assets/images/NGN_16.svg";
import CFA from "@/assets/images/CFA_16.svg";

import CaretDown from "@/assets/images/caret-down.svg";
import { useState } from "react";
import Close from "@/assets/images/close.svg";
import { useCloseModal } from "@/hooks/useCloseModal";
import { Colors } from "@/constants/Colors";
import { CountryCode, Country } from "@/types/country";

export const PhoneNumberInput = ({}) => {
  const [country, setCountry] = useState<Country>(Country.NIGERIA);
  const [countryCode, setCountryCode] = useState<CountryCode>(
    CountryCode.NIGERIA
  );

  const switchCountryCode = (countryCode: CountryCode) => {
    setCountryCode(countryCode);
  };

  const isNigeria = countryCode === CountryCode.NIGERIA;
  const isBenin = countryCode === CountryCode.BENIN;
  const [modalActive, setModalActive] = useState(false);
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          borderRadius: 12,
          borderColor: "#ECEFF1",
          borderWidth: 1,
          marginTop: 8,
        }}
      >
        <Pressable onPress={() => setModalActive(true)}>
          <View style={{ borderRightWidth: 1, borderColor: "#ECEFF1" }}>
            <View
              style={{
                paddingVertical: 16,
                paddingHorizontal: 12,
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
              }}
            >
              {isNigeria && <NGN />}
              {isBenin && <CFA />}

              <FontText>{countryCode}</FontText>
              <CaretDown />
            </View>
          </View>
        </Pressable>
        <TextInput style={{ flex: 1, paddingHorizontal: 12 }} />
      </View>
      <PhoneNumberModal
        countryCode={countryCode}
        modalActive={modalActive}
        setModalActive={setModalActive}
        switchCountryCode={switchCountryCode}
      />
    </>
  );
};

export const PhoneNumberModal = ({
  countryCode,
  modalActive,
  setModalActive,
  switchCountryCode,
}: {
  countryCode: string;
  modalActive: boolean;
  switchCountryCode: (countryCode: CountryCode) => void;
  setModalActive: Function;
}) => {
  const { translateY, closeModal } = useCloseModal(modalActive, setModalActive);

  return (
    <CustomModal
      modalActive={modalActive}
      closeModal={closeModal}
      translateY={translateY}
      height={300}
      endLimit={100}
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

        <View
          style={{
            borderWidth: 1.5,
            borderColor: "#F5F7F8",
            borderRadius: 16,
            marginTop: 24,
          }}
        >
          <Pressable onPress={() => switchCountryCode(CountryCode.BENIN)}>
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
                    Benin Republic
                  </FontText>
                </View>
              </View>
              <View>
                <FontText
                  fontWeight={500}
                  fontSize={16}
                  children={CountryCode.BENIN}
                ></FontText>
              </View>
            </View>
          </Pressable>
          <View style={{ paddingHorizontal: 16 }}>
            <View style={{ height: 2, backgroundColor: "#F2F6F6" }}></View>
          </View>
          <Pressable onPress={() => switchCountryCode(CountryCode.NIGERIA)}>
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
                    Nigeria
                  </FontText>
                </View>
              </View>
              <View>
                <FontText
                  fontWeight={500}
                  fontSize={16}
                  children={CountryCode.NIGERIA}
                ></FontText>
              </View>
            </View>
          </Pressable>
        </View>
      </>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingVertical: 20,
  },
});
