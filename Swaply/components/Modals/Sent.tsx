import { View, Text, SafeAreaView, Modal } from "react-native";
import SentLogo from "@/assets/images/sent-logo.svg";
import BlueSentLogo from "@/assets/images/sent-logo-blue.svg";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import BeneficiaryHeart from "@/assets/images/beneficiary-heart.svg";
import FontText from "@/components/FontText";
import { transferStore } from "@/store";

export default function Sent({
  modalActive,
  setModalActive,
}: {
  modalActive: boolean;
  setModalActive: Function;
}) {
  const router = useRouter();
  const sendingIsCFA = transferStore.useState((store) => store.sendingIsCFA);

  const handleOkay = () => {
    setModalActive(false);
    router.push("/(home)");
  };
  return (
    <Modal visible={modalActive} transparent={true} animationType="fade">
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#FAFBFB", padding: 16 }}
      >
        <View style={{ flex: 1, justifyContent: "flex-end", padding: 16 }}>
          <View style={{ height: "75%", justifyContent: "space-between" }}>
            <View style={{ alignItems: "center" }}>
              {sendingIsCFA && <BlueSentLogo />}
              {!sendingIsCFA && <SentLogo />}
              <FontText
                fontSize={24}
                style={{ marginTop: 24, marginBottom: 4 }}
                fontFamily="P22"
                fontWeight={600}
              >
                400,000.00 sent!
              </FontText>
              <FontText
                fontSize={16}
                color={Colors.light.neutral}
                fontWeight={500}
              >
                Transfer Succesful
              </FontText>
            </View>
            <View style={{ gap: 12, paddingBottom: 20 }}>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 16,
                  borderColor: "#ECEFF1",
                  backgroundColor: "#FFF",
                  marginBottom: 4,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    padding: 16,
                  }}
                >
                  <BeneficiaryHeart />
                  <FontText fontSize={14} fontWeight={500}>
                    Save to beneficiary
                  </FontText>
                </View>
              </View>
              <Button text={"Okay, got it"} action={handleOkay} />
              <Button
                text={"Download receipt"}
                bgColor="#ECEFF1"
                textColor={Colors.light.text}
                action={() => {}}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
