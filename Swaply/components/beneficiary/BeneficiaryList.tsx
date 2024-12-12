import { Pressable, View, ScrollView } from "react-native";
import FontText from "../FontText";
import { Colors } from "@/constants/Colors";
import NGN_10 from "@/assets/images/NGN_10.svg";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import { router } from "expo-router";

function BeneficiaryProfile({ beneficiary }: { beneficiary: any }) {
  const image =
    beneficiary.firstName[0].toUpperCase() +
    beneficiary.lastName[0].toUpperCase();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(app)/beneficiary_details",
          params: { id: beneficiary.id },
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          padding: 16,
          gap: 16,
          borderRadius: 16,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#F5F7F8",
        }}
      >
        <View
          style={{
            width: 32,
            height: 32,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.light.accent,
            borderRadius: 16,
            position: "relative",
          }}
        >
          <FontText fontSize={12} fontWeight={600} color="white">
            {image}
          </FontText>
          <View style={{ position: "absolute", bottom: 0, right: 0 }}>
            <NGN_10 />
          </View>
        </View>
        <View style={{ gap: 4, justifyContent: "space-between" }}>
          <View>
            <FontText
              fontSize={14}
              fontWeight={500}
            >{`${beneficiary.firstName} ${beneficiary.lastName} `}</FontText>
          </View>
          <View>
            <FontText fontSize={12} color={Colors.light.neutral}>
              {`${beneficiary.bankName} - ${beneficiary.bankNo}`}
            </FontText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function BeneficiaryList({
  searchVal,
  setSearchVal,
  beneficiaries,
}: {
  searchVal: string;
  setSearchVal: Function;
  beneficiaries: any[];
}) {
  const [searchedList, setSearchedList] = useState<any[]>(beneficiaries);

  useEffect(() => {
    let newList: any[] = beneficiaries;
    if (searchVal.length) {
      newList = beneficiaries.filter((beneficiary) => {
        return (
          beneficiary.firstName.startsWith(searchVal) ||
          beneficiary.lastName.startsWith(searchVal)
        );
      });
    }
    setSearchedList(newList);
  }, [searchVal]);

  return (
    <>
      {searchedList.length ? (
        <View>
          <FontText
            fontSize={12}
            fontWeight={600}
            color={Colors.light.neutral}
            style={{ marginTop: 12, marginBottom: 16 }}
          >
            RECENT RECIPIENTS
          </FontText>
          <ScrollView style={{ gap: 12 }} showsVerticalScrollIndicator={false}>
            {searchedList.map((beneficiary) => (
              <BeneficiaryProfile
                key={beneficiary.id}
                beneficiary={beneficiary}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <NotFound setSearchVal={setSearchVal} />
      )}
    </>
  );
}
