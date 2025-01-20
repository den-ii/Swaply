import FontText from "@/components/FontText";
import {
  Pressable,
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import Close from "@/assets/images/close.svg";
import ChevronDown from "@/assets/images/chevron-down.svg";
import { RecepientDetailsNGN, RecepientDetailsCFA } from "@/types/recepient";
import CustomInput from "../CustomInput";
import { set, useForm } from "react-hook-form";
import { UI } from "@/constants/UI";
import SelectBank from "../modals/SelectBank";
import { useEffect, useState } from "react";
import { authStore, transferStore } from "@/store";
import { verifyBankDetails } from "@/api/paymentAPI";
import useSWRMutation from "swr/dist/mutation";

export default function NGNRecepientDetails({
  control,
  handleSubmit,
  resetField,
  getValues,
  clearErrors,
  errors,
  isValid,
  watching,
  setProceed,
}: {
  control: any;
  handleSubmit: Function;
  resetField: Function;
  getValues: Function;
  clearErrors: Function;
  errors: any;
  isValid: boolean;
  watching?: any;
  setProceed: Function;
}) {
  const [selectBankModal, setSelectBankModal] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [success, setSuccess] = useState(false);
  const [accountNameError, setAccountNameError] = useState(false);
  const bank = transferStore.useState((store) => store.recepientNGN?.bank);
  const token = authStore.useState((store) => store.token);

  const { data, isMutating, trigger, error } = useSWRMutation(
    "naira-payment/bank/verify",
    verifyBankDetails,
    {
      onSuccess: (data) => {
        if (data.status) {
          console.log("Bank details verified:", data);
          transferStore.update((store) => {
            store.recepientNGN = {
              ...store.recepientNGN,
              accountName: data.data.account_name,
              bank_id: data.data.id,
            };
          });
          setAccountName(data.data.account_name);
          setSuccess(true);
          setAccountNameError(false);
          if (!Object.keys(errors).length) setProceed(true);
        } else {
          setSuccess(false);
          setProceed(false);
          setAccountNameError(true);
        }
      },
    }
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setProceed(false);
      setSuccess(false);
      return;
    }
    if (!watching.accountNo || !token) return;

    if (bank?.code && watching.accountNo.length >= 10) {
      console.log("here:");
      trigger({
        accountNumber: getValues("accountNo").trim(),
        bankCode: bank.code,
        token: token,
      });
    }

    setProceed(true);
  }, [watching.accountNo, Object.keys(errors).length, bank?.code]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable onPress={() => setSelectBankModal(true)}>
        <View style={styles.inputContainer}>
          <FontText>Select Bank</FontText>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              paddingHorizontal: UI.input.horizontalPadding,
              paddingVertical:
                Platform.OS === "ios" ? UI.input.verticalPadding : 12,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#ECEFF1",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!bank && <FontText color="#AEB7BF">Access Bank</FontText>}
            {bank && <FontText>{bank.name}</FontText>}
            <ChevronDown fill="#AEB7BF" />
          </View>
        </View>
      </Pressable>
      <View>
        <CustomInput
          placeholder="0732934459"
          inputMode="numeric"
          control={control}
          clearErrors={clearErrors}
          isValid={isValid}
          customError={accountNameError}
          customErrorMessage="Invalid account number, kindly try again"
          error={errors.accountNo}
          rules={{
            required: "Account number is required, please try again",
            minLength: {
              value: 10,
              message: "Invalid account number",
            },
            maxLength: {
              value: 13,
              message: "Invalid account number",
            },
          }}
          label="Account number"
          name="accountNo"
          resetField={resetField}
          successMessage={accountName}
          success={success}
          // keyboardType="number-pad"
          autoCorrect={false}
        />
      </View>
      <View style={{ marginTop: -7 }}>
        <CustomInput
          placeholder="johndoe@gmail.com"
          inputMode="email"
          control={control}
          clearErrors={clearErrors}
          isValid={isValid}
          error={errors.email}
          rules={{
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address, please try again.",
            },
          }}
          label="Email address"
          name="email"
          resetField={resetField}
          autoCapitalize="none"
          // keyboardType="number-pad"
          autoCorrect={false}
        />
      </View>
      <View style={{ marginTop: -7 }}>
        <CustomInput
          placeholder="Sent with love"
          inputMode="none"
          control={control}
          clearErrors={clearErrors}
          isValid={isValid}
          error={errors.narration}
          label="Narration (Optional)"
          rules={undefined}
          name="narration"
          resetField={resetField}
          autoCapitalize="none"
          // keyboardType="number-pad"
          autoCorrect={false}
        />
      </View>
      <SelectBank
        modalActive={selectBankModal}
        setModalActive={setSelectBankModal}
      />
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  inputContainer: {
    gap: 8,
    paddingBottom: 19,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    borderColor: "#ECEFF1",
    position: "relative",
  },

  cancel: {
    width: 16,
    height: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AEB7BF",
  },
  cancelContainer: {
    position: "absolute",
    top: 18,
    right: 16,
  },
});
