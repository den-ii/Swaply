import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { transferStore } from "@/store";
import { router } from "expo-router";
import { View } from "react-native";
import { Paystack } from "react-native-paystack-webview";

export default function MakePayment({ autoStart }: { autoStart: boolean }) {
  const transferDetails = transferStore.useState((s) => s);
  return (
    // <View style={{ flex: 1 }}>
    <Paystack
      paystackKey="pk_test_f6c16a2ce120d1cd95d593b0a7a5eddebf713c41"
      amount={transferDetails.totalAmount ?? 0}
      billingEmail={"wisdomochiche@gmail.com"}
      channels={["card", "bank_transfer"]}
      activityIndicatorColor="green"
      onCancel={(e) => {
        // handle response here
        router.back();
      }}
      onSuccess={(res: any) => {
        // handle response here
        router.push("/(app)/sent");
        console.log("request success", res);
      }}
      autoStart={autoStart}
    />
    // </View>
  );
}
