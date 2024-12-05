import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import DataSecure from "@/components/DataSecure";
import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import VerificationInProgress from "@/components/modals/VerificationInProgress";

export default function BVN() {
  const [bvn, setBVN] = useState("");
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [modalActive, setModalActive] = useState(true);

  useEffect(() => {
    if (verificationInProgress) setModalActive(true);
  }, []);

  const verifyBVN = () => {
    setVerificationInProgress(true);
    setModalActive(true);
    // Call API to verify NIN
    // On success, navigate to next screen
    // On failure, show error message
  };
  return (
    <View
      style={{
        backgroundColor: Colors.light.body,
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
      }}
    >
      <View style={{ flex: 1 }}>
        <FontText fontSize={34} fontWeight={700} fontFamily="p22">
          BVN
        </FontText>
        <Text
          style={{
            fontFamily: "Inter_400Medium",
            marginTop: 16,
            color: Colors.light.neutral,
          }}
        >
          <Text> Please verify your Bank Verification Number. Dial</Text>
          <Text style={{ color: Colors.base }}> *565*0# </Text>
          <Text>to get BVN</Text>
        </Text>
        <View style={{ marginTop: 32 }}>
          <CustomInput
            label="BVN"
            inputMode="numeric"
            returnKey
            placeholder="Please enter BVN"
            value={bvn}
            setValue={setBVN}
          />
        </View>
      </View>
      <View style={{ paddingVertical: 16, gap: 16 }}>
        <DataSecure />
        <View>
          <Button text="Verify BVN" action={verifyBVN} />
        </View>
      </View>
      {verificationInProgress && (
        <VerificationInProgress
          modalActive={modalActive}
          setModalActive={setModalActive}
        />
      )}
    </View>
  );
}
