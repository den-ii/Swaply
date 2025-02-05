import { Pressable, View, StyleSheet } from "react-native";
import Close from "@/assets/images/close.svg";
import CustomModal from "./CustomModal";
import FontText from "../FontText";
import { Colors } from "@/constants/Colors";
import { useCloseModal } from "@/hooks/useCloseModal";
import Button from "../Button";
import Selected from "@/assets/images/selected.svg";

export const relationshipList = ["Spouse", "Child", "Parent", "Sibling"];

export default function Relationship({
  relationship,
  setRelationship,
  setModalActive,
  modalActive,
  setRelationshipSelected,
}: {
  relationship: number | null;
  setRelationship: Function;
  setRelationshipSelected: Function;
  setModalActive: Function;
  modalActive: boolean;
}) {
  const { translateY, closeModal } = useCloseModal(modalActive, setModalActive);

  const handleSelectRelationship = (index: number) => {
    setRelationshipSelected(true);
    setRelationship(index);
  };

  return (
    <CustomModal
      modalActive={modalActive}
      closeModal={closeModal}
      translateY={translateY}
      height={405}
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
            Relationship
          </FontText>
        </View>
        <View style={{ marginTop: 8 }}>
          <FontText color={Colors.light.neutral}>
            Select the relationship to your next of kin
          </FontText>
        </View>
        <View
          style={{
            marginTop: 36,
            backgroundColor: "white",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#F5F7F8",
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          {relationshipList.map((value, index) => {
            const selected = relationship === index;
            return (
              <Pressable
                key={index}
                onPress={() => handleSelectRelationship(index)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 8,
                    borderColor: "#F2F6F6",
                    borderTopWidth:
                      index > 0 && index < relationshipList.length ? 1 : 0,
                  }}
                >
                  <FontText fontWeight={500}>{value}</FontText>
                  <View
                    style={{
                      width: 16,
                      borderRadius: 16,
                      height: 16,
                      borderWidth: 1,
                      borderColor: "#ECEFF1",
                    }}
                  >
                    {selected && <Selected />}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
        <View
          style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 12 }}
        >
          <Button text="Confirm" action={closeModal} />
        </View>
      </>
    </CustomModal>
  );
}
