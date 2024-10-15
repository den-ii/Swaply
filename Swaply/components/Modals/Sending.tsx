import { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import FontText from "../FontText";
import Close from "@/assets/images/close.svg";
import { Modal, Pressable, View, StyleSheet } from "react-native";
import { transferStore } from "@/store";
import CFA from "@/assets/images/CFA_32.svg";
import NGN from "@/assets/images/NGN_32.svg";
import BlueLogo from "@/assets/images/blue_logo.svg";
import RightDots from "@/assets/images/right-dots.svg";
import LeftDots from "@/assets/images/left-dots.svg";
import Button from "../Button";

export default function Sending({
  modalActive,
  setModalActive,
}: {
  modalActive: boolean;
  setModalActive: Function;
}) {
  const tStoreValue = transferStore.useState((store) => store);
  const [description, setDescription] = useState<(string | undefined)[][]>([]);
  useEffect(() => {
    let transactionFeeValue = "";
    let rateValue = "";
    let totalAmountValue = "";
    if (tStoreValue.sendingIsCFA) {
      rateValue = `1 CFA = ${tStoreValue.rate} NGN`;
      transactionFeeValue = `${tStoreValue.transactionFee} CFA`;
      totalAmountValue = `${(
        Number(tStoreValue.cfaAmount) + tStoreValue.transactionFee
      ).toFixed(2)} CFA`;
    } else {
      rateValue = `1 NGN = ${tStoreValue.rate} CFA`;
      transactionFeeValue = `${tStoreValue.transactionFee} NGN`;
      totalAmountValue = `${(
        Number(tStoreValue.ngnAmount) + tStoreValue.transactionFee
      ).toFixed(2)} NGN`;
    }
    setDescription([
      ["Bank name", tStoreValue.recepientNGN?.bank],
      ["Account number", tStoreValue.recepientNGN?.accountNumber],
      ["Email address", tStoreValue.recepientNGN?.emailAddress],
      ["Account name", tStoreValue.recepientNGN?.accountName],
      ["Transaction fee", transactionFeeValue],
      ["Rate", rateValue],
      ["Total amount", totalAmountValue],
    ]);
  }, [tStoreValue.recepientNGN]);

  const getSentAmount = () => {
    return tStoreValue.sendingIsCFA
      ? tStoreValue.cfaAmount + " CFA"
      : tStoreValue.ngnAmount + " NGN";
  };

  const getReceiveAmount = () => {
    return !tStoreValue.sendingIsCFA
      ? tStoreValue.cfaAmount + " CFA"
      : tStoreValue.ngnAmount + " NGN";
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
            <View style={{ alignItems: "center" }}>
              <FontText
                fontFamily="P22"
                fontWeight={700}
                fontSize={30}
                style={{ marginTop: 20 }}
              >
                You're Sending
              </FontText>
              <FontText
                fontFamily="P22"
                fontWeight={700}
                fontSize={30}
                style={{ textAlign: "center", marginTop: 12 }}
              >
                {getSentAmount()}
              </FontText>
              <View
                style={{
                  backgroundColor: "#ECEFF1",
                  padding: 12,
                  borderRadius: 100,
                  marginTop: 20,
                }}
              >
                <FontText fontWeight={600}>
                  {"= " + getReceiveAmount()}
                </FontText>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 64,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ECEFF1",
                }}
              >
                {tStoreValue.sendingIsCFA ? <CFA /> : <NGN />}
              </View>
              <RightDots />
              <BlueLogo />
              <LeftDots />
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 64,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ECEFF1",
                }}
              >
                {tStoreValue.sendingIsCFA ? <NGN /> : <CFA />}
              </View>
            </View>
            <View
              style={{
                marginTop: 32,
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#ECEFF1",
                borderRadius: 16,
                padding: 16,
                gap: 16,
              }}
            >
              {description.map(([key, value]) => {
                const isTotalAmount = key === "Total amount";
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <FontText
                      fontSize={!isTotalAmount ? 12 : 14}
                      fontWeight={!isTotalAmount ? 400 : 600}
                      style={{
                        color: !isTotalAmount
                          ? Colors.light.neutral
                          : Colors.light.text,
                      }}
                    >
                      {key}
                    </FontText>
                    <FontText
                      fontWeight={!isTotalAmount ? 500 : 600}
                      fontSize={!isTotalAmount ? 12 : 14}
                    >
                      {value}
                    </FontText>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                paddingBottom: 40,
              }}
            >
              <Button text={"Continue"} action={() => {}} />
            </View>
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
