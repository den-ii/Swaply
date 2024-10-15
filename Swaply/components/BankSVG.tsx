import { Image } from "expo-image";
import { StyleSheet } from "react-native";

export const BankSVG = ({ bank }: { bank: string }) => {
  switch (bank) {
    case "Access Bank":
      return (
        <Image
          style={styles.bankLogo}
          source={require("@/assets/images/access-bank-plc.png")}
          contentFit="contain"
        />
      );
    case "FCMB":
      return (
        <Image
          style={styles.bankLogo}
          source={require("@/assets/images/first-city-monument-bank-ltd.png")}
          contentFit="contain"
        />
      );
    case "First Bank":
      return (
        <Image
          style={styles.bankLogo}
          source={require("@/assets/images/first-bank-nigeria.png")}
          contentFit="contain"
        />
      );
    case "Fidelity Bank":
      return (
        <Image
          style={styles.bankLogo}
          source={require("@/assets/images/fidelity-bank.png")}
          contentFit="contain"
        />
      );
    case "Wema Bank":
      return (
        <Image
          style={styles.bankLogo}
          source={require("@/assets/images/wema-bank.png")}
          contentFit="contain"
        />
      );
    case "United Bank of Africa":
      return (
        <Image
          style={styles.bankLogo}
          source={require("@/assets/images/uba-bank.png")}
          contentFit="contain"
        />
      );
    case "Stanbic IBTC":
      return (
        <Image
          style={styles.bankLogo}
          source={require("@/assets/images/stanbic-ibtc-bank.png")}
          contentFit="contain"
        />
      );
    default:
      return <></>;
  }
};

const styles = StyleSheet.create({
  bankLogo: {
    backgroundColor: "white",
    shadowColor: "#313131",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
});
