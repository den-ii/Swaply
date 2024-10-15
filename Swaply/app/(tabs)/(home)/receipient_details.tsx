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

export interface recepientDetails {
  bank: string;
  accountNumber: string;
  emailAddress: string;
  narration: string;
}

export default function RecipientDetails() {
  const router = useRouter();

  const [selectBankModal, setSelectBankModal] = useState(false);
  const [sendingModal, setSendingModal] = useState(false);

  const [checked, setChecked] = useState(false);

  const [form, setForm] = useState({
    bank: "",
    accountNumber: "",
    emailAddress: "",
    narration: "",
    accountName: "",
  });

  const handleForm = (key: keyof recepientDetails, value: string) => {
    setForm((form) => ({ ...form, [key]: value }));
  };

  const handleContinue = () => {
    transferStore.update((store) => {
      store.recepientNGN = form;
    });
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
      <ScrollView style={{ marginTop: 16 }}>
        <Pressable onPress={() => setSelectBankModal(true)}>
          <View style={styles.inputContainer}>
            <FontText>Select Bank</FontText>
            <View style={styles.input}>
              {!form.bank && <FontText color="#AEB7BF">Access Bank</FontText>}
              {form.bank && <FontText>{form.bank}</FontText>}
              <ChevronDown fill="#AEB7BF" />
            </View>
          </View>
        </Pressable>
        <View style={styles.inputContainer}>
          <FontText>Account number</FontText>
          <View style={styles.input}>
            <TextInput
              style={{ width: 200 }}
              maxLength={13}
              placeholder="0732934459"
              placeholderTextColor="#AEB7BF"
              inputMode="numeric"
              keyboardType="number-pad"
              autoCorrect={false}
              returnKeyType="done"
              onChangeText={(value) =>
                setForm((form) => ({ ...form, accountNumber: value }))
              }
              value={form.accountNumber}
            />
            {form.accountNumber && (
              <Pressable
                onPress={() =>
                  setForm((form) => ({ ...form, accountNumber: "" }))
                }
              >
                <View style={styles.cancel}>
                  <Close fill="white" width={12} />
                </View>
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <FontText>Email address</FontText>
          <View style={styles.input}>
            <TextInput
              style={{ width: 250 }}
              placeholder="johndoe@gmail.com"
              inputMode="email"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#AEB7BF"
              onChangeText={(value) =>
                setForm((form) => ({ ...form, emailAddress: value }))
              }
              value={form.emailAddress}
            />
            {form.emailAddress && (
              <Pressable
                onPress={() =>
                  setForm((form) => ({ ...form, emailAddress: "" }))
                }
              >
                <View style={styles.cancel}>
                  <Close fill="white" width={12} />
                </View>
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <FontText>Narration (Optional)</FontText>
          <View style={styles.input}>
            <TextInput
              style={{ width: 260 }}
              placeholderTextColor="#AEB7BF"
              placeholder="Sent with love"
              onChangeText={(value) =>
                setForm((form) => ({ ...form, narration: value }))
              }
              value={form.narration}
            />
            {form.narration && (
              <Pressable
                onPress={() => setForm((form) => ({ ...form, narration: "" }))}
              >
                <View style={styles.cancel}>
                  <Close fill="white" width={12} />
                </View>
              </Pressable>
            )}
          </View>
        </View>
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
          <Pressable onPress={() => setChecked((checked) => !checked)}>
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
          </Pressable>
          <View style={{ flex: 1 }}>
            <FontText fontSize={12}>
              By continuing with this payment you’re confirming that the details
              you’re providing are correct.
            </FontText>
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <Button text={"Continue"} action={handleContinue} />
        </View>
      </ScrollView>
      <SelectBank
        modalActive={selectBankModal}
        setModalActive={setSelectBankModal}
        handleForm={handleForm}
      />
      <Sending modalActive={sendingModal} setModalActive={setSendingModal} />
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
