import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { transferStore } from "@/store";
import { router } from "expo-router";
import { View } from "react-native";
import { Paystack } from "react-native-paystack-webview";

const paystackKey = process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

export default function MakePayment({ autoStart }: { autoStart: boolean }) {
  const transferDetails = transferStore.useState((s) => s);
  console.log("transferDetails", transferDetails);
  const totalAmount = transferDetails.totalAmount?.split(",").join("") ?? "0";
  return (
    <Paystack
      paystackKey={paystackKey}
      amount={parseInt(totalAmount)}
      billingEmail={"wisdomochiche@gmail.com"}
      channels={["card", "bank_transfer"]}
      activityIndicatorColor="green"
      onCancel={(e) => router.back()}
      onSuccess={(res: any) => {
        router.push("/(app)/sent");
        console.log("request success", res);
      }}
      autoStart={autoStart}
    />
  );
}
