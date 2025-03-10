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
import CloseIcon from "@/assets/images/close.svg";

const FiltersItem = ({
  text,
  action,
}: {
  text: string;
  action: (currency: string) => void;
}) => {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 50,
        borderColor: "#416680",
        alignItems: "center",
        gap: 8,
        borderWidth: 1,
      }}
      onPress={() => action(text)}
    >
      <FontText fontWeight={600} fontSize={12} style={{ letterSpacing: 0.1 }}>
        {text}
      </FontText>
      <CloseIcon fill={Colors.light.textDefault} width={12} height={12} />
    </Pressable>
  );
};

export const Filters = () => {
  const { currencySelected, startDate, endDate } = filterStore.useState(
    ({ currencySelected, startDate, endDate }) => ({
      currencySelected,
      startDate,
      endDate,
    })
  );

  const removeCurrency = (currency: string) => {
    filterStore.update((s) => {
      s.currencySelected = s.currencySelected.filter((c) => c !== currency);
    });
  };

  const removeStartDate = () =>
    filterStore.update((s) => {
      s.startDate = null;
    });

  const removeEndDate = () =>
    filterStore.update((s) => {
      s.endDate = null;
    });

  return (
    <ScrollView horizontal contentContainerStyle={{ gap: 8 }}>
      {currencySelected.map((currency) => (
        <FiltersItem key={currency} text={currency} action={removeCurrency} />
      ))}
      {startDate && (
        <FiltersItem
          key={"startDate"}
          text={"Start date"}
          action={removeStartDate}
        />
      )}
      {endDate && (
        <FiltersItem key={"endDate"} text={"End date"} action={removeEndDate} />
      )}
    </ScrollView>
  );
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

        <View>
          <Filters />
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
      {filterOpen && (
        <Filter modalActive={filterOpen} setModalActive={setFilterOpen} />
      )}
    </SafeAreaView>
  );
}
