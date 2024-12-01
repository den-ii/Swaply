import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { beneficiaries } from ".";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import FontText from "@/components/FontText";
import NGN_10 from "@/assets/images/NGN_10.svg";
import Button from "@/components/Button";
import DeleteBeneficiary from "@/components/Modals/DeleteBeneciary";
import { useState } from "react";

export default function BeneficiaryDetails() {
  const [deleteModal, setDeleteModal] = useState(false);
  const params = useLocalSearchParams();
  const id: number = Array.isArray(params.id)
    ? parseInt(params.id[0], 10)
    : parseInt(params.id, 10);
  const beneficiary = beneficiaries.find((b) => b.id === id);
  const image = beneficiary
    ? beneficiary.firstName[0].toUpperCase() +
      beneficiary.lastName[0].toUpperCase()
    : "";

  return (
    <>
      <View
        style={{
          backgroundColor: Colors.light.body,
          flex: 1,
          paddingHorizontal: UI.paddingHorizontal,
          paddingTop: 30,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: 64,
              height: 64,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.light.accent,
              borderRadius: 64,
              position: "relative",
            }}
          >
            <FontText fontSize={24} fontWeight={600} color="white">
              {image}
            </FontText>
            <View style={{ position: "absolute", bottom: 0, right: 0 }}>
              <NGN_10 width={20} height={20} />
            </View>
          </View>
        </View>
        <View style={{ gap: 4, alignItems: "center" }}>
          <FontText
            fontSize={24}
            fontWeight={700}
            fontFamily="p22"
            style={{ marginTop: 16 }}
          >
            {`${beneficiary?.firstName} ${beneficiary?.lastName}`}
          </FontText>
          <FontText fontSize={14} fontWeight={400} color={Colors.light.neutral}>
            NGN Account
          </FontText>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#ECEFF1",
            marginTop: 20,
            paddingVertical: 8,
          }}
        >
          <View style={{ padding: 8, gap: 6 }}>
            <FontText
              fontSize={12}
              fontWeight={400}
              color={Colors.light.neutral}
            >
              Account holder
            </FontText>
            <FontText fontSize={14} fontWeight={500}>
              {`${beneficiary?.firstName} ${beneficiary?.lastName}`}
            </FontText>
          </View>
          <View style={{ padding: 8, gap: 6 }}>
            <FontText
              fontSize={12}
              fontWeight={400}
              color={Colors.light.neutral}
            >
              Account number
            </FontText>
            <FontText fontSize={14} fontWeight={500}>
              {`${beneficiary?.bankNo}`}
            </FontText>
          </View>
          <View style={{ padding: 8, gap: 6 }}>
            <FontText
              fontSize={12}
              fontWeight={400}
              color={Colors.light.neutral}
            >
              Bank name
            </FontText>
            <FontText fontSize={14} fontWeight={500}>
              {`${beneficiary?.bankName}`}
            </FontText>
          </View>
        </View>
        <View style={{ marginTop: 24 }}>
          <Button
            bgColor="#FDDBE0"
            textColor="#F23C57"
            text="Delete Beneficiary"
            action={() => setDeleteModal(true)}
          />
        </View>
      </View>
      <DeleteBeneficiary
        modalActive={deleteModal}
        setModalActive={setDeleteModal}
        beneficiaryId={id}
      />
    </>
  );
}
