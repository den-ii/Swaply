import ContactError from "@/assets/images/contact-error.svg";
import { View } from "react-native";
import FontText from "../FontText";
import { Colors } from "@/constants/Colors";

export default function NoBeneficiary() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <ContactError width={100} height={100} />
        <View style={{ marginTop: 20 }}>
          <FontText
            fontSize={20}
            fontWeight={500}
            style={{ textAlign: "center" }}
          >
            No recent recipient
          </FontText>
          <FontText
            fontSize={14}
            style={{ textAlign: "center", paddingHorizontal: 20, marginTop: 8 }}
            color={Colors.light.neutral}
          >
            Looks like you do not have any recent recipient yet.
          </FontText>
        </View>
      </View>
      {/* <Text style={{ fontSize: 20 }}>No Beneficiary</Text> */}
    </View>
  );
}
