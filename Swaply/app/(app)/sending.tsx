import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import FontText from "@/components/FontText";
import Close from "@/assets/images/close.svg";
import {
  Modal,
  Pressable,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { authStore, transferStore } from "@/store";
import { Link, useRouter } from "expo-router";
import CFA from "@/assets/images/CFA_32.svg";
import NGN from "@/assets/images/NGN_32.svg";
import useSWRMutation from "swr/mutation";
import BlueLogo from "@/assets/images/blue_logo.svg";
import RightDots from "@/assets/images/right-dots.svg";
import LeftDots from "@/assets/images/left-dots.svg";
import Button from "@/components/Button";
import { swap } from "@/api/paymentAPI";
import MakePayment from "@/components/MakePayment";

type InfoTuple = [string, string | number | undefined | string[]][] | [];

function Description({ k, v }: { k: string; v: any }) {
  const isTotalAmount = k === "Total amount";
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4,
      }}
    >
      <FontText
        fontSize={!isTotalAmount ? 12 : 14}
        fontWeight={!isTotalAmount ? 400 : 600}
        style={{
          color: !isTotalAmount ? Colors.light.neutral : Colors.light.text,
          width: "50%",
        }}
      >
        {k}
      </FontText>
      <FontText
        fontWeight={!isTotalAmount ? 500 : 600}
        fontSize={!isTotalAmount ? 12 : 14}
      >
        {v}
      </FontText>
    </View>
  );
}

export default function Sending() {
  const tStoreValue = transferStore.useState((store) => store);
  const token = authStore.useState((s) => s.token);
  const router = useRouter();
  const [paystackStart, setPaystackStart] = useState(false);
  const [descriptionNGN, setDescriptionNGN] = useState<InfoTuple>([]);
  const [descriptionCFA, setDescriptionCFA] = useState<InfoTuple>([]);
  const { trigger, data, isMutating } = useSWRMutation("swap/init", swap, {
    onSuccess: (data) => {
      console.log("swapping:", data);
      if (data.status) {
        router.push("/sent");
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    let rate = tStoreValue.rate ?? "0.00";
    let fee = tStoreValue.fee;
    let totalAmount = tStoreValue.totalAmount;
    if (tStoreValue.sendingIsCFA) {
      setDescriptionNGN([
        ["Bank name", tStoreValue.recepientNGN?.bank?.name],
        ["Account number", tStoreValue.recepientNGN?.accountNumber],
        ["Email address", tStoreValue.recepientNGN?.emailAddress],
        ["Account name", tStoreValue.recepientNGN?.accountName],
        ["Rate", rate],
        ["Transaction fee", fee + " CFA"],
        ["Total amount", totalAmount + " CFA"],
      ]);
    } else {
      setDescriptionCFA([
        ["Momo number", tStoreValue.recepientCFA?.momoNumber],
        ["Mobile money operator", tStoreValue.recepientCFA?.momoOperator],
        ["Full name", tStoreValue.recepientCFA?.fullName],
        ["Transaction fee", fee + " NGN"],
        ["Rate", rate],
        ["Total amount", totalAmount + " NGN"],
      ]);
    }
  }, [tStoreValue.recepientNGN, tStoreValue.recepientCFA]);

  const getSentAmount = () => {
    return tStoreValue.sendingIsCFA
      ? tStoreValue.sendAmount + " CFA"
      : tStoreValue.sendAmount + " NGN";
  };

  const getReceiveAmount = () => {
    return !tStoreValue.sendingIsCFA
      ? tStoreValue.receiveAmount + " CFA"
      : tStoreValue.receiveAmount + " NGN";
  };

  const handleContinue = () => {
    const amount = tStoreValue.sendAmount?.split(",")?.join("");
    console.log("amountr: ", amount);

    if (tStoreValue.sendingIsCFA) {
      console.log("amount: ", tStoreValue.sendAmount);
      trigger({
        sourceCurrency: "CFA",
        destinationCurrency: "NGN",
        amount: parseFloat(amount ?? "0"),
        bank_name: tStoreValue.recepientNGN?.bank?.name || "",
        bankId: tStoreValue.recepientNGN?.bank_id?.toString() || "",
        accountNumber: tStoreValue.recepientNGN?.accountNumber || "",
        email: tStoreValue.recepientNGN?.emailAddress || "",
        narration: tStoreValue.recepientNGN?.narration || "",
        token: token || "",
      });
    } else {
      setPaystackStart(true);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: Platform.OS === "ios" ? "flex-start" : "flex-end",
        backgroundColor: "rgba(44, 49, 55, 0.5)",
      }}
    >
      <View
        style={Platform.OS === "ios" ? styles.iosModal : styles.androidModal}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Pressable onPress={() => router.dismiss()}>
            <View
              style={{
                width: 32,
                height: 32,
                backgroundColor: "#F5F7F8",
                borderRadius: 32,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Close fill="#757D87" />
            </View>
          </Pressable>
        </View>
        <View style={{ alignItems: "center" }}>
          <FontText
            fontFamily="P22"
            fontWeight={700}
            fontSize={30}
            style={{ marginTop: 20 }}
          >
            You're Sending
          </FontText>
          <FontText
            fontFamily="P22"
            fontWeight={700}
            fontSize={30}
            style={{ textAlign: "center", marginTop: 12 }}
          >
            {getSentAmount()}
          </FontText>
          <View
            style={{
              backgroundColor: "#ECEFF1",
              padding: 12,
              borderRadius: 100,
              marginTop: 20,
            }}
          >
            <FontText fontWeight={600}>{"= " + getReceiveAmount()}</FontText>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 64,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ECEFF1",
            }}
          >
            {tStoreValue.sendingIsCFA ? <CFA /> : <NGN />}
          </View>
          <RightDots />
          <BlueLogo />
          <LeftDots />
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 64,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ECEFF1",
            }}
          >
            {tStoreValue.sendingIsCFA ? <NGN /> : <CFA />}
          </View>
        </View>
        <View
          style={{
            marginTop: 32,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#ECEFF1",
            borderRadius: 16,
            padding: 16,
            gap: 16,
          }}
        >
          {tStoreValue.sendingIsCFA &&
            descriptionNGN.map(([key, value]) => {
              if (!value) return;
              return <Description key={key} k={key} v={value} />;
            })}
          {!tStoreValue.sendingIsCFA &&
            descriptionCFA.map(([key, value]) => {
              return <Description key={key} k={key} v={value} />;
            })}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            paddingBottom: 40,
          }}
        >
          <Button
            text={"Continue"}
            action={handleContinue}
            loading={isMutating}
          />
        </View>
      </View>
      <MakePayment autoStart={paystackStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "rgba(44, 49, 55, 0.5)",
  },
  overlay2: {
    flex: 1,
    justifyContent: "space-between",
  },
  modal: {
    backgroundColor: "#FAFBFB",
    zIndex: 50,
    height: "92%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: 16,
  },
  iosModal: {
    backgroundColor: "#FAFBFB",
    padding: 16,
    flex: 1,
  },
  androidModal: {
    padding: 16,
    // flex: 1,
    backgroundColor: "#FAFBFB",

    height: "93%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
