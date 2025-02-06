import { Text, View } from "react-native";
import FontText from "@/components/FontText";
import { UI } from "@/constants/UI";
import { Colors } from "@/constants/Colors";
import Search from "@/components/Search";
import NoBeneficiary from "@/components/beneficiary/NoBeneficiary";
import { useState } from "react";
import BeneficiaryList from "@/components/beneficiary/BeneficiaryList";
import { SafeAreaView } from "react-native-safe-area-context";

export const beneficiaries = [
  // {
  //   id: 0,
  //   firstName: "John",
  //   lastName: "Doe",
  //   bankName: "Access Bank",
  //   bankNo: "0987457382",
  // },
  // {
  //   id: 1,
  //   firstName: "Ayomide",
  //   lastName: "Doe",
  //   bankName: "First Bank",
  //   bankNo: "0987457382",
  // },
];

export default function Beneficiary() {
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
          Beneficiary
        </FontText>
        <View style={{ marginVertical: 16 }}>
          <Search value={searchVal} setValue={setSearchVal} />
        </View>
        <View
          style={{
            position: "relative",
            flex: 1,
            justifyContent:
              beneficiaries.length === 0 ? "center" : "flex-start",
          }}
        >
          {beneficiaries.length === 0 ? (
            <NoBeneficiary />
          ) : (
            <BeneficiaryList
              searchVal={searchVal}
              setSearchVal={setSearchVal}
              beneficiaries={beneficiaries}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
