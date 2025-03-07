import FontText from "@/components/FontText";
import Search from "@/components/Search";
import { UI } from "@/constants/UI";
import GraySwaply from "@/assets/images/gray-swaply.svg";
import { useState } from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import { Colors } from "@/constants/Colors";
import FilterIcon from "@/assets/images/filter.svg";
import Filter from "@/components/filter";
import { filterStore } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";

const FiltersItem = () => {
  return <Pressable></Pressable>;
};

export const Filters = () => {
  const { currencySelected, startDate, endDate } = filterStore.useState(
    ({ currencySelected, startDate, endDate }) => ({
      currencySelected,
      startDate,
      endDate,
    })
  );

  return <ScrollView></ScrollView>;
};

export default function History() {
  const [searchVal, setSearchVal] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const { currencySelected, startDate, endDate } = filterStore.useState(
    ({ currencySelected, startDate, endDate }) => ({
      currencySelected,
      startDate,
      endDate,
    })
  );

  const filterActive = filterStore.useState((s) => s.active);

  console.log(filterActive);

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
            onPress={() => setFilterOpen(true)}
            style={{
              width: 45,
              height: 45,
              borderRadius: 45,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: filterActive ? "#039AFF" : "#F5F7F8",
            }}
          >
            <FilterIcon fill={filterActive ? "#fff" : "#757D87"} />
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
      <Filter modalActive={filterOpen} setModalActive={setFilterOpen} />
    </SafeAreaView>
  );
}
