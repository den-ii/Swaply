import { Image } from "react-native";
import { StyleSheet, View } from "react-native";
import { Bank } from "@/types";
import { useState } from "react";
import FontText from "./FontText";

export const BankSVG = ({ bank }: { bank: Bank }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const bankNameSplit = bank?.name?.split(/[ -]/);
  const initials =
    bankNameSplit[0]?.charAt(0) +
    (bankNameSplit.length > 1 ? bankNameSplit[1]?.charAt(0) : "");

  const uri = `https://nigerianbanks.xyz/logo/${bank.slug}.png`;

  return (
    <View
      style={{ position: "relative", width: 32, height: 32, borderRadius: 16 }}
    >
      {/* Fallback UI when loading or error */}
      {(loading || error) && (
        <View
          style={[
            styles.bankLogo,
            {
              backgroundColor: "#FFF7F3",
              position: "absolute",
              top: 0,
              bottom: 0,
              zIndex: 2,
            },
          ]}
        >
          <FontText color="#D45A02" fontSize={12} fontWeight={600}>
            {initials.toUpperCase()}
          </FontText>
        </View>
      )}

      {/* Image component */}
      {!error && (
        <Image
          style={[
            styles.bankLogo,
            { position: "absolute", top: 0, bottom: 0, zIndex: 1 },
          ]}
          source={{
            uri: uri,
          }}
          width={32}
          height={32}
          resizeMode="contain"
          resizeMethod="scale"
          onLoadStart={() => setLoading(true)} // Image is starting to load
          onLoadEnd={() => setLoading(false)} // Image finished loading
          onError={() => {
            setLoading(false); // Stop loading
            setError(true); // Set error to true
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bankLogo: {
    backgroundColor: "white",
    shadowColor: "#313131",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    borderWidth: 0.5,
    borderColor: "#efefef",
  },
});
