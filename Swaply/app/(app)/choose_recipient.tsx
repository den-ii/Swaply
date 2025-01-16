import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { Pressable, TextInput, View } from "react-native";
import Add from "@/assets/images/add.svg";
import ChevronRight from "@/assets/images/chevron-right.svg";
import { router } from "expo-router";
import { useState } from "react";
import { transferStore } from "@/store";
import Search from "@/components/Search";

export default function ChooseRecipient() {
  const [searchValue, setSearchValue] = useState("");
  const sendingIsCFA = transferStore.useState((store) => store.sendingIsCFA);
  console.log("sendingisCFA:", sendingIsCFA);

  return (
    <View
      style={{
        paddingHorizontal: UI.paddingHorizontal,
        flex: 1,
        backgroundColor: Colors.light.body,
      }}
    >
      <View style={{ paddingBottom: 16, paddingTop: 8 }}>
        <FontText fontSize={34} fontWeight={700} fontFamily="P22">
          {!sendingIsCFA
            ? "Send to a mobile money account"
            : "Send to a bank account"}
        </FontText>
      </View>
      <Search value={searchValue} setValue={setSearchValue} />
      <View>
        <Pressable onPress={() => router.push("/receipient_details")}>
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
              <FontText fontWeight={500} fontSize={14}>
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
