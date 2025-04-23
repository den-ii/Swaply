import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { Pressable, TextInput, View, ScrollView } from "react-native";
import Add from "@/assets/images/add.svg";
import ChevronRight from "@/assets/images/chevron-right.svg";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { transferStore, authStore } from "@/store";
import Search from "@/components/Search";
import BeneficiaryList from "@/components/beneficiary/BeneficiaryList";
import NoBeneficiary from "@/components/beneficiary/NoBeneficiary";
import useSWR from "swr";
import { getBeneficiaries } from "@/api/paymentAPI";

// Transform API response to match BeneficiaryList expected format
const transformBeneficiaries = (apiData: any[]) => {
  return apiData.map((item) => {
    if (item.type === "BANK") {
      return {
        id: item.id,
        firstName: item.name.split(" ")[0],
        lastName: item.name.split(" ").slice(1).join(" "),
        bankName: item.accountDetails.bank,
        bankNo: item.accountDetails.accountNumber,
        country: item.country
      };
    } else if (item.type === "MOMO") {
      return {
        id: item.id,
        firstName: item.name.split(" ")[0],
        lastName: item.name.split(" ").slice(1).join(" "),
        bankName: item.accountDetails.provider,
        bankNo: item.accountDetails.momoAccount,
        momoOperator: item.accountDetails.provider.toLowerCase(),
        country: item.country
      };
    }
    return null;
  }).filter(Boolean);
};

export default function ChooseRecipient() {
  const [searchValue, setSearchValue] = useState("");
  const sendingIsCFA = transferStore.useState((store) => store.sendingIsCFA);
  const token = authStore.useState((s) => s.token);
  
  // Fetch beneficiaries from API using the getBeneficiaries function
  const { data, error, isLoading } = useSWR(
    token ? ["beneficiary", token] : null,
    ([url, token]) => getBeneficiaries(url, token)
  );
  
  // Transform API data to match component expectations
  const beneficiaries = data?.data ? transformBeneficiaries(data.data) : [];
  
  // Filter recipients based on the direction of the transfer
  const filteredRecipients = sendingIsCFA 
    ? beneficiaries.filter((recipient) => recipient && !recipient.momoOperator) // Show bank accounts for CFA to NGN
    : beneficiaries.filter((recipient) => recipient && recipient.momoOperator); // Show mobile money for NGN to CFA

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
      
      {/* Recent Recipients Section */}
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FontText>Loading beneficiaries...</FontText>
          </View>
        ) : error ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FontText>Failed to load beneficiaries</FontText>
          </View>
        ) : filteredRecipients.length > 0 ? (
          <BeneficiaryList 
            searchVal={searchValue}
            setSearchVal={setSearchValue}
            beneficiaries={filteredRecipients}
          />
        ) : (
          <NoBeneficiary />
        )}
      </View>
    </View>
  );
}
