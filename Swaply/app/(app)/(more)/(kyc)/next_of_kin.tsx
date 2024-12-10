import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import DataSecure from "@/components/DataSecure";
import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import ChevronDown from "@/assets/images/chevron-down.svg";
import VerificationInProgress from "@/components/modals/VerificationInProgress";
import { PhoneNumberInput } from "@/components/PhoneNumberInput";
import Relationship, {
  relationshipList,
} from "@/components/modals/Relationship";
import InformationSaved from "@/components/modals/InformationSaved";

export default function NextOfKin() {
  const [bvn, setBVN] = useState("");
  const [relationship, setRelationship] = useState(0);
  const [relationShipSelected, setRelationShipSelected] = useState(false);
  const [informationSavedModal, setInformationSavedModal] = useState(false);
  const [relationshipModal, setRelationshipModal] = useState(false);

  const handleSave = () => {
    setInformationSavedModal(true);

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
      <View>
        <FontText fontSize={34} fontWeight={700} fontFamily="p22">
          Next of Kin
        </FontText>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            marginTop: 16,
            color: Colors.light.neutral,
          }}
        >
          Please enter the details of your Next of kin
        </Text>
      </View>
      <ScrollView style={{ flex: 1, marginTop: 16, paddingTop: 16 }}>
        <View>
          <CustomInput
            label="Name of Next of Kin"
            inputMode="text"
            returnKey
            placeholder="John Doe"
            value={bvn}
            setValue={setBVN}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <FontText>Phone number of Next of kin </FontText>
          <PhoneNumberInput />
        </View>

        <View style={{ gap: 12, marginBottom: 16 }}>
          <FontText>Relationship to Next of kin </FontText>
          <Pressable onPress={() => setRelationshipModal(true)}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                padding: 16,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#ECEFF1",
                alignItems: "center",
                position: "relative",
              }}
            >
              {!relationShipSelected && <FontText></FontText>}
              {relationShipSelected && (
                <FontText>{relationshipList[relationship]}</FontText>
              )}
              <View style={{ position: "absolute", right: 20 }}>
                <ChevronDown fill="#AEB7BF" />
              </View>
            </View>
          </Pressable>
        </View>
        <View>
          <CustomInput
            label="Address of Next of Kin"
            inputMode="text"
            returnKey
            placeholder="Address of next of kin"
            value={bvn}
            setValue={setBVN}
          />
        </View>
      </ScrollView>
      <View style={{ paddingVertical: 16, gap: 16 }}>
        <DataSecure />
        <View>
          <Button text="Save" action={handleSave} />
        </View>
      </View>
      <Relationship
        relationship={relationship}
        setRelationship={setRelationship}
        modalActive={relationshipModal}
        setModalActive={setRelationshipModal}
      />
      <InformationSaved
        modalActive={informationSavedModal}
        setModalActive={setInformationSavedModal}
      />
    </View>
  );
}
