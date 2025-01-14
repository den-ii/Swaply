import { View, TextInput, Pressable, StyleSheet } from "react-native";
import FontText from "./FontText";
import CFA_flag from "@/assets/images/CFA_32.svg";
import NGN_flag from "@/assets/images/NGN_32.svg";
import CustomModal from "./modals/CustomModal";
import NGN from "@/assets/images/NGN_16.svg";
import CFA from "@/assets/images/CFA_16.svg";

import CaretDown from "@/assets/images/caret-down.svg";
import { useState } from "react";
import Close from "@/assets/images/close.svg";
import { useCloseModal } from "@/hooks/useCloseModal";
import { Colors } from "@/constants/Colors";
import { CountryCode, Country } from "@/types/country";
import { UI } from "@/constants/UI";

export const PhoneNumberInput = ({
  countryCode,
  switchCountryCode,
  showError,
  value,
  handleValueChange,
  error,
}: {
  countryCode: CountryCode;
  switchCountryCode: (country: CountryCode) => void;
  showError: boolean;
  value: string;
  handleValueChange: (value: string) => void;
  error?: boolean;
}) => {
  const [country, setCountry] = useState<Country>(Country.NIGERIA);

  const [focus, setFocus] = useState(false);

  const handleBlur = () => {
    setFocus(false);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const isNigeria = countryCode === CountryCode.NIGERIA;
  const isBenin = countryCode === CountryCode.BENIN;
  const [modalActive, setModalActive] = useState(false);
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          position: "relative",
          borderRadius: UI.input.borderRadius,
          borderColor: error ? Colors.error : focus ? "#416680" : "#ECEFF1",
          borderWidth: UI.input.borderWidth,
          marginTop: 8,
          backgroundColor: "white",
        }}
      >
        <Pressable onPress={() => setModalActive(true)}>
          <View
            style={{
              borderRightWidth: UI.input.borderWidth,
              borderColor: "#ECEFF1",
            }}
          >
            <View
              style={{
                paddingVertical: UI.input.verticalPadding,
                paddingHorizontal: UI.input.horizontalPadding,
                flexDirection: "row",
                gap: 6,
                width: 100,
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
        <TextInput
          style={{ flex: 1, paddingHorizontal: 12 }}
          placeholder="901 234 8909"
          inputMode="tel"
          returnKeyType="done"
          value={value}
          onChangeText={(value) => handleValueChange(value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {value?.length > 0 && (
          <Pressable
            onPress={() => handleValueChange("")}
            style={styles.cancelContainer}
          >
            <View style={styles.cancel}>
              <Close fill="white" width={12} />
            </View>
          </Pressable>
        )}
      </View>
      <FontText
        fontSize={12}
        color={Colors.error}
        style={{ marginTop: 8, opacity: error ? 1 : 0 }}
      >
        {error ? "Phone number is invalid, please try again" : "empyy"}
      </FontText>
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
    top: 12,
    width: 20,
    height: 20,
    right: 12,
  },
});
