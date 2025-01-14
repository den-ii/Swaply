import { Image } from "react-native";
import { StyleSheet, View } from "react-native";
import FB from "@/assets/images/banks/first-bank-nigeria.svg";
import { Bank } from "@/types";
import { useState } from "react";
import FontText from "./FontText";

export const BankSVG = ({ bank }: { bank: Bank }) => {
  const [error, setError] = useState(false);
  console.log("---", bank.slug, bank.name);
  const bankNameSplit = bank?.name?.split(" ");
  const initials = bankNameSplit[0]?.charAt(0) + bankNameSplit[1]?.charAt(0);
  // const uri = `https://supermx1.github.io/nigerian-banks-api/logos/${bank.slug}.png`;
  const uri = `https://nigerianbanks.xyz/logo/${bank.slug}.png`;

  if (error) {
    return (
      <View style={[styles.bankLogo, { backgroundColor: "#FFF7F3" }]}>
        <FontText color="#D45A02" fontSize={12} fontWeight={600}>
          {initials.toUpperCase()}
        </FontText>
      </View>
    );
  }
  return (
    <Image
      style={styles.bankLogo}
      source={{
        uri: uri,
      }}
      width={32}
      height={32}
      resizeMode="contain"
      resizeMethod="scale"
      onError={() => setError(true)}
    />
  );
};

const styles = StyleSheet.create({
  bankLogo: {
    backgroundColor: "white",
    shadowColor: "#313131",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    borderWidth: 0.5,
    borderColor: "#efefef",
  },
});
