import { Pressable, View, StyleSheet } from "react-native";
import Close from "@/assets/images/close.svg";
import CustomModal from "./CustomModal";
import FontText from "../FontText";
import { Colors } from "@/constants/Colors";
import CFA_flag from "@/assets/images/CFA_32.svg";
import NGN_flag from "@/assets/images/NGN_32.svg";
import Selected from "@/assets/images/selected.svg";
import { useCloseModal } from "@/hooks/useCloseModal";
import { Country } from "@/types/country";

interface CurrencyProps {
  setModalActive: Function;
  modalActive: boolean;
  switchCurrency: (currency: Country) => void;
  sendIsCFA: boolean;
  sendIsNGN: boolean;
}

export default function Currency({
  setModalActive,
  modalActive,
  switchCurrency,
  sendIsCFA,
  sendIsNGN,
}: CurrencyProps) {
  const { translateY, closeModal } = useCloseModal(modalActive, setModalActive);

  return (
    <CustomModal
      modalActive={modalActive}
      closeModal={closeModal}
      translateY={translateY}
      height={342}
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
          <Pressable onPress={() => switchCurrency(Country.BENIN)}>
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
            <View style={{ height: 2, backgroundColor: "#F2F6F6" }}></View>
          </View>
          <Pressable onPress={() => switchCurrency(Country.BENIN)}>
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
      </>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
});
