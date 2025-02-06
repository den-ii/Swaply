import FontText from "@/components/FontText";
import Search from "@/components/Search";
import { UI } from "@/constants/UI";
import GraySwaply from "@/assets/images/gray-swaply.svg";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterIcon from "@/assets/images/filter.svg";

export default function History() {
  const [searchVal, setSearchVal] = useState("");
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: UI.paddingHorizontal,
        paddingTop: 16,
        flex: 1,
        backgroundColor: Colors.light.body,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <FontText fontFamily="P22" fontSize={34} fontWeight={700}>
          History
        </FontText>
        <View style={{ marginVertical: 16, flexDirection: "row", gap: 8 }}>
          <View style={{ flex: 1 }}>
            <Search value={searchVal} setValue={setSearchVal} />
          </View>
          <Pressable
            style={{
              width: 45,
              height: 45,
              borderRadius: 45,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F5F7F8",
            }}
          >
            <FilterIcon />
          </Pressable>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              maxWidth: 180,
              alignItems: "center",
              gap: 16,
            }}
          >
            <GraySwaply />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                color: Colors.light.neutral,
                fontSize: 14,
                textAlign: "center",
                lineHeight: 24,
              }}
            >
              You haven't performed any transaction yet.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
