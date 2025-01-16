import { View, Text, SafeAreaView, Modal } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import BeneficiaryHeart from "@/assets/images/beneficiary-heart.svg";
import FontText from "@/components/FontText";
import { transferStore } from "@/store";
import SuccessScreen from "@/components/SuccessScreen";
import { useEffect, useState } from "react";
import { CountryCurrency } from "@/types/country";
import Toggle from "@/components/Toggle";

export default function Sent() {
  const router = useRouter();
  const [currency, setCurrency] = useState("");
  const [inBeneficiary, setInBeneficiary] = useState(false);
  const { sendingCurrency, sendAmount } = transferStore.useState(
    (store) => store
  );

  useEffect(() => {}, []);

  console.log("sendingCurrency:", sendingCurrency);

  const symbol =
    CountryCurrency[sendingCurrency as keyof typeof CountryCurrency] || "";

  const headerText = `${
    symbol.length > 1 ? symbol + " " : symbol
  }${sendAmount} sent!`;

  const saveToBeneficiary = () => {
    setInBeneficiary(!inBeneficiary);
  };

  const handleOkay = () => {
    router.navigate("/(tabs)/");
  };
  return (
    <SuccessScreen headerText={headerText} leadingText="Transfer Successful">
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
            justifyContent: "space-between",
            gap: 12,
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <BeneficiaryHeart />
            <FontText fontSize={14} fontWeight={500}>
              Save to beneficiary
            </FontText>
          </View>
          <Toggle on={inBeneficiary} toggleOn={saveToBeneficiary} />
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
