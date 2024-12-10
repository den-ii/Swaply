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

export default function Address_NGN() {
  const [bvn, setBVN] = useState("");
  const [relationship, setRelationship] = useState(0);
  const [relationShipSelected, setRelationShipSelected] = useState(false);
  const [informationSavedModal, setInformationSavedModal] = useState(false);

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
      <View style={{ paddingBottom: 12 }}>
        <FontText fontSize={34} fontWeight={700} fontFamily="p22">
          Address
        </FontText>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            marginTop: 16,
            color: Colors.light.neutral,
          }}
        >
          Please enter the full details of your current address
        </Text>
      </View>
      <ScrollView style={{ flex: 1, paddingTop: 16 }}>
        <View style={{ gap: 12, marginBottom: 16 }}>
          <FontText>State </FontText>
          <Pressable onPress={() => {}}>
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
        <View style={{ gap: 12, marginBottom: 16 }}>
          <FontText>LGA </FontText>
          <Pressable onPress={() => {}}>
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

        <View style={{ marginBottom: 16 }}>
          <CustomInput
            label="Address Details"
            inputMode="text"
            returnKey
            placeholder="e.g. 123 Lagos street"
            value={bvn}
            setValue={setBVN}
          />
          <FontText
            fontSize={12}
            color={Colors.base}
            style={{ marginTop: -12 }}
          >
            *Including street and house No.
          </FontText>
        </View>

        <View>
          <CustomInput
            label="Landmark/Closest Bus Stop"
            inputMode="text"
            returnKey
            placeholder="e.g Guiness Office"
            value={bvn}
            setValue={setBVN}
          />
        </View>

        <View>
          <CustomInput
            label="Postal Code"
            inputMode="numeric"
            returnKey
            placeholder="postal "
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

      <InformationSaved
        modalActive={informationSavedModal}
        setModalActive={setInformationSavedModal}
      />
    </View>
  );
}
