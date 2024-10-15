import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { Pressable, TextInput, View } from "react-native";
import Add from "@/assets/images/add.svg";
import ChevronRight from "@/assets/images/chevron-right.svg";
import { useRouter } from "expo-router";
import { useState } from "react";
import { transferStore } from "@/store";

export default function ChooseRecipient() {
  const router = useRouter();
  const sendingIsCFA = transferStore.useState((store) => store.sendingIsCFA);

  return (
    <View
      style={{
        paddingHorizontal: UI.paddingHorizontal,
        flex: 1,
        backgroundColor: Colors.light.body,
      }}
    >
      <View style={{ paddingBottom: 16 }}>
        <FontText fontSize={34} fontWeight={700} fontFamily="P22">
          {sendingIsCFA
            ? "Send to a bank account"
            : "Send to a mobile money account"}
        </FontText>
      </View>
      <View>
        <TextInput
          placeholder="Search..."
          style={{
            padding: 16,
            backgroundColor: "#ECEFF1",
            borderRadius: 100,
            fontSize: 14,
            fontFamily: "Inter_600SemiBold",
            color: Colors.light.textDefault,
          }}
          cursorColor={Colors.light.textDefault}
          selectionColor={Colors.light.textDefault}
          placeholderTextColor={Colors.light.textDisabled}
        />
      </View>
      <View>
        <Pressable onPress={() => router.push("/(home)/receipient_details")}>
          <View
            style={{
              backgroundColor: "white",
              marginVertical: 24,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#F5F7F8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
              }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 32,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FFF7F3",
                }}
              >
                <Add fill="#D45A02" />
              </View>
              <FontText fontWeight={500} fontSize={16}>
                Send to a new recipient
              </FontText>
            </View>
            <View>
              <ChevronRight fill={Colors.light.neutral} />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
