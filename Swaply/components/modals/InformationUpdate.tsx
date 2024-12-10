import { Pressable, Text, View, StyleSheet } from "react-native";
import Close from "@/assets/images/close.svg";
import CustomModal from "./CustomModal";
import FontText from "../FontText";
import { Colors } from "@/constants/Colors";
import { useCloseModal } from "@/hooks/useCloseModal";
import Button from "../Button";

export default function InformationUpdate({
  setModalActive,
  modalActive,
}: {
  setModalActive: Function;
  modalActive: boolean;
}) {
  const { translateY, closeModal } = useCloseModal(modalActive, setModalActive);

  return (
    <CustomModal
      modalActive={modalActive}
      closeModal={closeModal}
      translateY={translateY}
      height={240}
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
            Information Update
          </FontText>
        </View>
        <Text
          style={{
            marginTop: 16,
            fontSize: 14,
            fontFamily: "Inter_400Regular",
          }}
        >
          <Text style={{ color: Colors.light.neutral }}>
            To update any of your information, please send an email to{" "}
          </Text>
          <Text style={{ color: Colors.base }}>support@swaply.com</Text>
        </Text>
        <View
          style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 12 }}
        >
          <Button text="Okay" action={closeModal} />
        </View>
      </>
    </CustomModal>
  );
}
