import { useCloseModal } from "@/hooks/useCloseModal";
import CustomModal from "../modals/CustomModal";
import React from "react";
import { Pressable, View } from "react-native";
import FontText from "../FontText";
import { Colors } from "@/constants/Colors";
import Close from "@/assets/images/close.svg";
import { ScrollView } from "react-native-gesture-handler";

export default function Filter({
  modalActive,
  setModalActive,
}: {
  modalActive: boolean;
  setModalActive: Function;
}) {
  const { translateY, closeModal } = useCloseModal(modalActive, setModalActive);

  return (
    <CustomModal
      modalActive={modalActive}
      closeModal={closeModal}
      translateY={translateY}
      height={442}
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
            Filter by
          </FontText>
          <View
            style={{
              marginTop: 32,
              backgroundColor: "#fff",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: Colors.light.border,
              padding: 16,
            }}
          >
            <View
              style={{
                gap: 16,
                paddingBottom: 16,
                borderBottomWidth: 0.5,
                borderBottomColor: "#f2f6f6",
              }}
            >
              <FontText
                fontWeight={600}
                fontSize={12}
                style={{
                  letterSpacing: 1,
                }}
              >
                CURRENCY
              </FontText>
              <ScrollView horizontal>
                <Pressable
                  style={{
                    paddingHorizontal: 16,
                    height: 32,
                    justifyContent: "center",
                    backgroundColor: "#F5F7F8",
                    borderRadius: 50,
                  }}
                >
                  <FontText
                    fontSize={12}
                    fontWeight={600}
                    color="#757D87"
                    style={{ letterSpacing: 0.1 }}
                  >
                    All
                  </FontText>
                </Pressable>
                <Pressable
                  style={{
                    paddingHorizontal: 16,
                    height: 32,
                    justifyContent: "center",
                    backgroundColor: "#F5F7F8",
                    borderRadius: 50,
                    marginLeft: 8,
                  }}
                >
                  <FontText
                    fontSize={12}
                    fontWeight={600}
                    color="#757D87"
                    style={{ letterSpacing: 0.1 }}
                  >
                    NGN
                  </FontText>
                </Pressable>
                <Pressable
                  style={{
                    paddingHorizontal: 16,
                    height: 32,
                    justifyContent: "center",
                    backgroundColor: "#F5F7F8",
                    borderRadius: 50,
                    marginLeft: 8,
                  }}
                >
                  <FontText
                    fontSize={12}
                    fontWeight={600}
                    color="#757D87"
                    style={{ letterSpacing: 0.1 }}
                  >
                    CFA
                  </FontText>
                </Pressable>
              </ScrollView>
            </View>
            <View
              style={{
                paddingVertical: 16,
              }}
            >
              <FontText
                fontWeight={600}
                fontSize={12}
                style={{
                  letterSpacing: 1,
                }}
              >
                DATE
              </FontText>
            </View>
          </View>
        </View>
      </>
    </CustomModal>
  );
}
