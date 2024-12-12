import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import DataSecure from "@/components/DataSecure";
import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import VerificationInProgress from "@/components/modals/VerificationInProgress";

export default function CIP() {
  const [cip, setCIP] = useState("");
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [modalActive, setModalActive] = useState(true);

  useEffect(() => {
    if (verificationInProgress) setModalActive(true);
  }, []);

  const verifyCIP = () => {
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
          CIP
        </FontText>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            marginTop: 16,
            color: Colors.light.neutral,
          }}
        >
          <Text>
            Please verify your Certificat d'Identification Personnelle
          </Text>
        </Text>
        <View style={{ marginTop: 32 }}>
          <CustomInput
            label="CIP"
            inputMode="numeric"
            returnKey
            placeholder="Please enter CIP"
            value={cip}
            setValue={setCIP}
          />
        </View>
      </View>
      <View style={{ paddingVertical: 16, gap: 16 }}>
        <DataSecure />
        <View>
          <Button text="Verify CIP" action={verifyCIP} />
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
