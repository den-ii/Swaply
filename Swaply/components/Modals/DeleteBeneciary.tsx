import { Pressable, View, StyleSheet } from "react-native";
import Close from "@/assets/images/close.svg";
import CustomModal from "./CustomModal";
import FontText from "../FontText";
import { Colors } from "@/constants/Colors";
import { useCloseModal } from "@/hooks/useCloseModal";
import { beneficiaries } from "@/app/(app)/(beneficiary)";
import Button from "../Button";

interface DeleteBeneficiaryProps {
  setModalActive: Function;
  modalActive: boolean;
  beneficiaryId: number;
}

export default function DeleteBeneficiary({
  setModalActive,
  modalActive,
  beneficiaryId,
}: DeleteBeneficiaryProps) {
  const { translateY, closeModal } = useCloseModal(modalActive, setModalActive);
  const beneficiary = beneficiaries.find((b) => b.id === beneficiaryId);

  return (
    <CustomModal
      modalActive={modalActive}
      closeModal={closeModal}
      translateY={translateY}
      height={342}
      endLimit={100}
    >
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Pressable onPress={closeModal}>
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
        <View>
          <FontText fontFamily="P22" fontWeight={700} fontSize={24}>
            Delete Beneficiary?
          </FontText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
              flexWrap: "wrap",
            }}
          >
            <FontText color={Colors.light.neutral} fontSize={14}>
              Are you sure you want to delete
            </FontText>
            <FontText
              fontSize={14}
              fontWeight={600}
            >{` ${beneficiary?.firstName} ${beneficiary?.lastName} `}</FontText>
            <FontText color={Colors.light.neutral} fontSize={14}>
              from your beneficiary list?
            </FontText>
          </View>
        </View>
        <View
          style={{
            marginTop: 24,
            gap: 12,
          }}
        >
          <Button
            bgColor="#FDDBE0"
            textColor="#F23C57"
            text="Yes, Delete"
            action={() => {}}
          />

          <Button
            bgColor="#ECEFF1"
            textColor={Colors.light.textDefault}
            text="No, Cancel"
            action={() => {}}
          />
        </View>
      </>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
});
