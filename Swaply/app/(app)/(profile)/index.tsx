import { getNationality } from "@/api/utilsApi";
import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { authStore } from "@/store";
import { useState } from "react";
import { View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import NGN from "@/assets/images/NGN_32.svg";
import useSWR, { preload } from "swr";
import CountrySVG from "@/components/CountrySVG";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function Profile() {
  const { userDetails, profileImage } = authStore.useState((s) => ({
    userDetails: s.userDetails,
    profileImage: s.profileImage,
  }));
  const [nationality, setNationality] = useState("");
  //   const { data } = useSWR(
  //     `https://restcountries.com/v3.1/name/${userDetails.country}?fullText=true`,
  //     getNationality,
  //     {
  //       onSuccess: (data) => {
  //         if (data.length > 0) {
  //           setNationality(data[0].demonyms.eng.m);
  //         }
  //       },
  //     }
  //   );
  return (
    <View
      style={{
        flex: 1,
        padding: UI.paddingHorizontal,
        backgroundColor: Colors.light.body,
      }}
    >
      <View style={{ gap: 8, paddingBottom: 20 }}>
        <FontText fontFamily="P22" fontSize={34} fontWeight={700}>
          My profile
        </FontText>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: 12,
            padding: 16,
            minHeight: 200,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#ECEFF1",
            gap: 12,
          }}
        >
          <View style={{ position: "relative" }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: Colors.base2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontText color={"#fff"} fontSize={24} fontWeight={600}>
                {profileImage}
              </FontText>
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
              >
                <CountrySVG country={userDetails?.cca} size={20} />
              </View>
            </View>
          </View>
          <View>
            <FontText color={Colors.light.neutral} fontSize={12}>
              First name
            </FontText>
            <FontText fontWeight={500}>{userDetails?.firstName ?? ""}</FontText>
          </View>
          <View>
            <FontText color={Colors.light.neutral} fontSize={12}>
              Last name
            </FontText>
            <FontText fontWeight={500}>{userDetails?.lastName ?? ""}</FontText>
          </View>

          <View>
            <FontText color={Colors.light.neutral} fontSize={12}>
              Email address
            </FontText>
            <FontText fontWeight={500}>{userDetails?.email ?? ""}</FontText>
          </View>
          <View>
            <FontText color={Colors.light.neutral} fontSize={12}>
              Phone number
            </FontText>
            <FontText fontWeight={500}>{`${userDetails?.countryCode} - ${
              userDetails?.phone ?? ""
            }`}</FontText>
          </View>
          <View>
            <FontText color={Colors.light.neutral} fontSize={12}>
              Nationality
            </FontText>
            <FontText fontWeight={500}>{userDetails?.nationality}</FontText>
          </View>
        </View>
        <View style={{ marginTop: 24 }}>
          <Button
            text="Delete account"
            bgColor="#FDDBE0"
            textColor="#F23C57"
            action={() => router.push("/delete-account-info")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
