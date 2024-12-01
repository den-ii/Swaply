import { View, SafeAreaView, StyleSheet, Image } from "react-native";
// import SuccessGradient from "@/assets/images/success-gradient.svg";
// import SuccessGradient from "@/assets/images/success-gradient.png";
import SuccessGradient2 from "@/assets/images/success-gradient2.svg";
import BlueSentLogo from "@/assets/images/sent-logo-blue.svg";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import FontText from "@/components/FontText";
import React from "react";

export default function SuccessScreen({
  headerText,
  leadingText,
  children,
}: {
  headerText: string;
  leadingText: string;
  children: React.ReactNode;
}) {
  const handleOkay = () => {
    router.navigate("/(home)");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FAFBFB",
        padding: 16,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          padding: 16,
          position: "relative",
        }}
      >
        <View style={{ position: "absolute", top: 0, right: 0 }}>
          <Image
            source={require("../assets/images/success-gradient.png")}
            width={50}
            height={50}
          />
        </View>
        <View style={{ position: "absolute", top: 50, left: 0 }}>
          <Image
            source={require("../assets/images/success-gradient2.png")}
            width={50}
            height={50}
          />
        </View>
        <View style={{ height: "75%", justifyContent: "space-between" }}>
          <View style={{ alignItems: "center" }}>
            <BlueSentLogo />
            <FontText
              fontSize={24}
              style={{ marginTop: 24, marginBottom: 4 }}
              fontFamily="P22"
              fontWeight={600}
            >
              {headerText}
            </FontText>
            <FontText
              fontSize={16}
              color={Colors.light.neutral}
              fontWeight={500}
            >
              {leadingText}
            </FontText>
          </View>
          <View style={{ gap: 12, paddingBottom: 20 }}>{children}</View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    width: 50,
    height: 50,
  },
});
