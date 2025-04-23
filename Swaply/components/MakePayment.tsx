import { authStore, transferStore } from "@/store";
import { router } from "expo-router";
import { Paystack } from "react-native-paystack-webview";
import { API } from "@/api/index";
import { useState, useEffect } from "react"; // Add this import

const baseUrl = API.BaseUrl;
const paystackKey = process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

export default function MakePayment({ autoStart }: { autoStart: boolean }) {
  const transferDetails = transferStore.useState((s) => s);
  const userDetails = authStore.useState((s) => s.userDetails);
  const token = authStore.useState((s) => s.token);
  const totalAmount = transferDetails.totalAmount?.split(",").join("") ?? "0";
  
  // Add state for your internal reference
  const [internalReference, setInternalReference] = useState<string | null>(null);

  // Step 1: Generate internal reference before payment starts
  useEffect(() => {
    if (autoStart) {
      generateInternalReference();
    }
  }, [autoStart]);

  const generateInternalReference = async () => {
    try {
      const response = await fetch(`${baseUrl}swap/init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          amount: parseInt(totalAmount),
          sourceCurrency: transferDetails.sendingCurrency,
          destinationCurrency: transferDetails.receivingCurrency,
          provider: transferDetails.recepientCFA?.momoOperator,
          phone: transferDetails.recepientCFA?.momoNumber,
          narration: `SWAP PAYMENT FOR ${transferDetails.sendingCurrency}`
        }),
      });
      const {data} = await response.json();
      if (data.reference) {
        setInternalReference(data.reference);
      }
    } catch (error) {
      console.error("Error generating reference:", error);
      alert("Failed to initialize payment");
      router.back();
    }
  };

  return (
    <Paystack
      paystackKey={paystackKey}
      amount={parseInt(totalAmount)}
      billingEmail={userDetails?.email || authStore.useState((s) => s.email)} 
      channels={["card", "bank_transfer"]}
      activityIndicatorColor="green"
      onCancel={(e) => router.back()}
      // Use refNumber prop for the reference
      refNumber={internalReference || ""}
      metadata={{
        custom_fields: [
          {
            display_name: "Reference",
            variable_name: "reference",
            value: internalReference || ""
          }
        ]
      }}
      onSuccess={(res: any) => {
        console.log("Paystack success response:", res);
        
        // Send both references to backend
        fetch(`${baseUrl}swap/verify`, {
          method: "POST",
          body: JSON.stringify({
            paystackReference: res.reference,
            internalReference: internalReference,
            transactionId: res.transaction,
            token: token || "",
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then(response => response.json())
        .then(data => {
          console.log("Verification response:", data);
          if (data.status) {
            router.push("/(app)/sent");
          } else {
            alert("Payment verification failed. Please contact support.");
            router.back();
          }
        })
        .catch(error => {
          console.error("Verification error:", error);
          alert("An error occurred while verifying your payment.");
          router.back();
        });
      }}
      autoStart={autoStart && !!internalReference} // Only autoStart if reference exists
    />
  );
}