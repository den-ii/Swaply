import { View, Text, SafeAreaView, Modal } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import BeneficiaryHeart from "@/assets/images/beneficiary-heart.svg";
import FontText from "@/components/FontText";
import { transferStore } from "@/store";
import SuccessScreen from "@/components/SuccessScreen";

export default function Sent() {
  const router = useRouter();
  const sendingIsCFA = transferStore.useState((store) => store.sendingIsCFA);

  const handleOkay = () => {
    router.navigate("/(tabs)/");
  };
  return (
    <SuccessScreen
      headerText="CFA 360.00 sent!"
      leadingText="Transfer Successful"
    >
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
        action={() => {}}
        bgColor="#ECEFF1"
        textColor={Colors.light.text}
      />
    </SuccessScreen>
  );
}
