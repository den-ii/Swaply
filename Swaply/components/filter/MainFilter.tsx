import { Pressable, View } from "react-native";
import FontText from "../FontText";
import { Colors } from "@/constants/Colors";
import Close from "@/assets/images/close.svg";
import { ScrollView } from "react-native-gesture-handler";
import CalenderIcon from "@/assets/images/calendar.svg";
import Button from "../Button";
import { useEffect, useState } from "react";

export default function MainFilter({
  toggleEndPicker,
  toggleStartPicker,
  startDate,
  startDateString,
  endDate,
  endDateString,
  currencySelected,
  toggleCurrencySelect,
  clearFilter,
  applyFilter,
}: {
  toggleEndPicker: () => void;
  toggleStartPicker: () => void;
  startDate: Date | null;
  endDate: Date | null;
  currencySelected: string[];
  toggleCurrencySelect: (currency: string) => void;
  startDateString: string;
  endDateString: string;
  clearFilter: () => void;
  applyFilter: () => void;
}) {
  return (
    <>
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
                onPress={() => toggleCurrencySelect("All")}
                style={{
                  paddingHorizontal: 16,
                  height: 32,
                  justifyContent: "center",
                  backgroundColor: currencySelected.includes("All")
                    ? "#D8EFFF"
                    : "#F5F7F8",
                  borderRadius: 50,
                }}
              >
                <FontText
                  fontSize={12}
                  fontWeight={600}
                  color={
                    currencySelected.includes("All") ? "#026DB5" : "#757D87"
                  }
                  style={{ letterSpacing: 0.1 }}
                >
                  All
                </FontText>
              </Pressable>
              <Pressable
                onPress={() => toggleCurrencySelect("NGN")}
                style={{
                  paddingHorizontal: 16,
                  height: 32,
                  justifyContent: "center",
                  backgroundColor: currencySelected.includes("NGN")
                    ? "#D8EFFF"
                    : "#F5F7F8",
                  borderRadius: 50,
                  marginLeft: 8,
                }}
              >
                <FontText
                  fontSize={12}
                  fontWeight={600}
                  color={
                    currencySelected.includes("NGN") ? "#026DB5" : "#757D87"
                  }
                  style={{ letterSpacing: 0.1 }}
                >
                  NGN
                </FontText>
              </Pressable>
              <Pressable
                onPress={() => toggleCurrencySelect("CFA")}
                style={{
                  paddingHorizontal: 16,
                  height: 32,
                  justifyContent: "center",
                  backgroundColor: currencySelected.includes("CFA")
                    ? "#D8EFFF"
                    : "#F5F7F8",
                  borderRadius: 50,
                  marginLeft: 8,
                }}
              >
                <FontText
                  fontSize={12}
                  fontWeight={600}
                  color={
                    currencySelected.includes("CFA") ? "#026DB5" : "#757D87"
                  }
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
              gap: 16,
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
            <View
              style={{
                maxWidth: 400,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: "auto",
                }}
              >
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                    borderRadius: 50,
                    height: 32,
                    width: 141,
                    backgroundColor: startDate ? "#D8EFFF" : "#f5f7f8",
                    maxWidth: "40%",
                  }}
                  onPress={toggleStartPicker}
                >
                  <CalenderIcon fill={startDate ? "#026DB5" : "#757D87"} />
                  <FontText
                    fontSize={12}
                    fontWeight={600}
                    color={startDate ? "#026DB5" : "#757D87"}
                  >
                    {startDateString}
                  </FontText>
                </Pressable>
                <FontText fontSize={12} fontWeight={600} color="#757D87">
                  TO
                </FontText>
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                    borderRadius: 50,
                    height: 32,
                    width: 141,
                    backgroundColor: endDate ? "#D8EFFF" : "#f5f7f8",
                    maxWidth: "40%",
                  }}
                  onPress={toggleEndPicker}
                >
                  <CalenderIcon fill={endDate ? "#026DB5" : "#757D87"} />
                  <FontText
                    fontSize={12}
                    fontWeight={600}
                    color={endDate ? "#026DB5" : "#757D87"}
                  >
                    {endDateString}
                  </FontText>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 12, gap: 4, paddingBottom: 12 }}>
        <Button text="Apply Filter" action={applyFilter} />
        <Button
          text="Clear Filter"
          action={clearFilter}
          bgColor={Colors.light.body}
          textColor="#2c3137"
        />
      </View>
    </>
  );
}
