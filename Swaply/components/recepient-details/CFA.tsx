import FontText from "@/components/FontText";
import {
  Pressable,
  ScrollView,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import Close from "@/assets/images/close.svg";
import ChevronDown from "@/assets/images/chevron-down.svg";
import { recepientDetailsNGN, recepientDetailsCFA } from "@/types/recepient";

import { styles } from "./NGN";
import { Colors } from "@/constants/Colors";
import { PhoneNumberInput } from "../PhoneNumberInput";
import { CountryCode } from "@/types/country";
import { useState } from "react";
import CustomInput from "../CustomInput";

export default function CFARecepientDetails({
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
  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={{ position: "relative" }}>
          <CustomInput
            placeholder="0732934459"
            inputMode="numeric"
            control={control}
            clearErrors={clearErrors}
            isValid={isValid}
            // customError={accountNameError}
            customErrorMessage="Invalid momo number, kindly try again"
            error={errors.momoNumber}
            rules={{
              required: "Momo number is required, please try again",
              minLength: {
                value: 10,
                message: "Invalid momo number",
              },
              maxLength: {
                value: 13,
                message: "Invalid momo number",
              },
            }}
            label="Momo number"
            name="momoNumber"
            resetField={resetField}
            // successMessage={accountName}
            // success={success}
            keyboardType="number-pad"
            autoCorrect={false}
          />
        </View>
      </View>
      <View></View>
      <View></View>
    </View>
  );
}
