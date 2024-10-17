import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import {
  Pressable,
  ScrollView,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import Close from "@/assets/images/close.svg";
import ChevronDown from "@/assets/images/chevron-down.svg";
import Checkbox from "@/assets/images/checkbox.svg";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import { useState } from "react";
import SelectBank from "@/components/Modals/SelectBank";
import Sending from "@/components/Modals/Sending";
import { transferStore } from "@/store";
import NGNRecepientDetails from "@/components/recepient-details/NGN";
import CFARecepientDetails from "@/components/recepient-details/CFA";
import Sent from "@/components/Modals/Sent";

export interface recepientDetailsNGN {
  bank: string;
  accountNumber: string;
  emailAddress: string;
  narration: string;
}

export interface recepientDetailsCFA {
  momoNumber: string;
  fullName: string;
  momoOperator: string;
}

export default function RecipientDetails() {
  const router = useRouter();

  const [selectBankModal, setSelectBankModal] = useState(false);
  const [sendingModal, setSendingModal] = useState(false);
  const [sentModal, setSentModal] = useState(false);

  const sendingIsCFA = transferStore.useState((store) => store.sendingIsCFA);

  const [checked, setChecked] = useState(false);

  const [NGNForm, setNGNForm] = useState({
    bank: "",
    accountNumber: "",
    emailAddress: "",
    narration: "",
    accountName: "",
  });

  const [CFAForm, setCFAForm] = useState({
    momoNumber: "",
    fullName: "",
    momoOperator: "",
  });

  const handleNGNForm = (key: keyof recepientDetailsNGN, value: string) => {
    setNGNForm((form) => ({ ...form, [key]: value }));
  };

  const handleCFAForm = (key: keyof recepientDetailsCFA, value: string) => {
    setCFAForm((form) => ({ ...form, [key]: value }));
  };

  const handleContinue = () => {
    if (sendingIsCFA) {
      transferStore.update((store) => {
        store.recepientNGN = NGNForm;
      });
    } else {
      transferStore.update((store) => {
        store.recepientCFA = CFAForm;
      });
    }
    setSendingModal(true);
  };

  return (
    <View
      style={{
        paddingHorizontal: UI.paddingHorizontal,
        flex: 1,
        backgroundColor: Colors.light.body,
      }}
    >
      <View style={{ paddingBottom: 16 }}>
        <FontText fontSize={34} fontWeight={700} fontFamily="P22">
          Enter recipient’s details
        </FontText>
      </View>
      <View style={{ marginTop: 16 }}>
        {sendingIsCFA && (
          <NGNRecepientDetails
            form={NGNForm}
            handleForm={handleNGNForm}
            setSelectBankModal={setSelectBankModal}
          />
        )}
        {!sendingIsCFA && (
          <CFARecepientDetails form={CFAForm} handleForm={handleCFAForm} />
        )}
      </View>
      <View style={{ flex: 1, paddingBottom: 30, justifyContent: "flex-end" }}>
        <Pressable onPress={() => setChecked((checked) => !checked)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 16,
              padding: 16,
              gap: 13,
              backgroundColor: "#FFF2E8",
              marginTop: 16,
            }}
          >
            {/* <Pressable onPress={() => setChecked((checked) => !checked)}> */}
            <View
              style={{
                width: 16,
                height: 16,
                backgroundColor: "white",
                borderRadius: 4,
              }}
            >
              {checked && <Checkbox fill="#FE6C02" />}
            </View>
            {/* </Pressable> */}
            <View style={{ flex: 1 }}>
              <FontText fontSize={12}>
                By continuing with this payment you’re confirming that the
                details you’re providing are correct.
              </FontText>
            </View>
          </View>
        </Pressable>

        <View style={{ marginTop: 16 }}>
          <Button text={"Continue"} action={handleContinue} />
        </View>
      </View>
      <SelectBank
        modalActive={selectBankModal}
        setModalActive={setSelectBankModal}
        handleForm={handleNGNForm}
      />
      <Sending
        modalActive={sendingModal}
        setModalActive={setSendingModal}
        setSentModalActive={setSentModal}
      />
      <Sent modalActive={sentModal} setModalActive={setSentModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 8,
    paddingBottom: 16,
  },
  input: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ECEFF1",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cancel: {
    width: 16,
    height: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AEB7BF",
  },
});
