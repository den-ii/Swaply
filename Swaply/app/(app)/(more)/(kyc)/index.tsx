import FontText from "@/components/FontText";
import NGNKYC from "@/components/kyc/NGNKYC";
import CFAKYC from "@/components/kyc/CFAKYC";

import InformationUpdate from "@/components/modals/InformationUpdate";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function KYC() {
  const [informationUpdateModal, setInformationUpdateModal] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light.body,
        paddingHorizontal: UI.paddingHorizontal,
        paddingTop: 16,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ gap: 8, paddingBottom: 20 }}>
          <FontText fontFamily="P22" fontSize={34} fontWeight={700}>
            KYC
          </FontText>
          <FontText color={Colors.light.neutral} fontWeight={400}>
            Please provide the following documents to verify your account
          </FontText>
        </View>
        {/* <NGNKYC /> */}
        <CFAKYC />
      </View>
      <Pressable onPress={() => setInformationUpdateModal(true)}>
        <View
          style={{
            paddingVertical: 30,
            flexDirection: "row",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Inter_400Regular",
              fontSize: 13,
              color: Colors.light.neutral,
            }}
          >
            <Text>
              If there has been a change to the information on your documents.
              Please {""}
            </Text>
            <Text
              style={{
                color: Colors.base,
                fontFamily: "Inter_500Medium",
                textDecorationLine: "underline",
              }}
            >
              click here to update
            </Text>
          </Text>
        </View>
      </Pressable>
      <InformationUpdate
        modalActive={informationUpdateModal}
        setModalActive={setInformationUpdateModal}
      />
    </View>
  );
}
