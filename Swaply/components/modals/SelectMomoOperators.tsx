import { Pressable, View, StyleSheet, Image } from "react-native";
import Close from "@/assets/images/close.svg";
import CustomModal from "./CustomModal";
import FontText from "../FontText";
import { Colors } from "@/constants/Colors";
import { useCloseModal } from "@/hooks/useCloseModal";
import { beneficiaries } from "@/app/(app)/(tabs)/beneficiary";
import Button from "../Button";
import { MomoProvider } from "@/types";

const Provider = ({ provider }: { provider: MomoProvider }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        padding: 16,
      }}
    >
      <View style={{ gap: 16, flexDirection: "row", alignItems: "center" }}>
        <View>
          <Image
            style={[styles.providerLogo]}
            source={{
              uri: provider.logoUrl,
            }}
            width={36}
            height={36}
            resizeMode="contain"
            resizeMethod="scale"
          />
        </View>
        <View>
          <FontText>{provider?.name.toUpperCase()}</FontText>
        </View>
      </View>
    </View>
  );
};

interface SelectMomoOperatorsProps {
  setModalActive: Function;
  setSelectedProvider: Function;
  modalActive: boolean;
  selectedProvider?: Record<string, any> | null;
  providers?: any[];
}

export default function SelectMomoOperators({
  setModalActive,
  modalActive,
  setSelectedProvider,
  selectedProvider,
  providers,
}: SelectMomoOperatorsProps) {
  const { translateY, closeModal } = useCloseModal(modalActive, setModalActive);

  const selectOperator = (provider: MomoProvider) => {
    setSelectedProvider(provider);
    closeModal();
  };

  return (
    <CustomModal
      modalActive={modalActive}
      closeModal={closeModal}
      translateY={translateY}
      height={282}
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
            Mobile money operators
          </FontText>
          <View
            style={{
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#F5F7F8",
              borderRadius: 16,
              marginTop: 24,
            }}
          >
            {providers?.map((provider: MomoProvider) => (
              <Pressable
                onPress={() => selectOperator(provider)}
                key={provider.id}
              >
                <Provider provider={provider} />
              </Pressable>
            ))}
          </View>
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
  providerLogo: {
    backgroundColor: "white",
    shadowColor: "#313131",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    borderWidth: 0.5,
    borderColor: "#efefef",
  },
});
