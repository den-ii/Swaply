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
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import { UI } from "@/constants/UI";

export default function NGNRecepientDetails({
  form,
  handleForm,
  setSelectBankModal,
  control,
  handleSubmit,
  resetField,
  getValues,
  clearErrors,
  errors,
  isValid,
}: {
  form: recepientDetailsNGN;
  handleForm: (key: keyof recepientDetailsNGN, value: string) => void;
  setSelectBankModal: Function;
  control: any;
  handleSubmit: Function;
  resetField: Function;
  getValues: Function;
  clearErrors: Function;
  errors: any;
  isValid: boolean;
}) {
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
              paddingVertical: UI.input.verticalPadding,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#ECEFF1",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!form.bank && <FontText color="#AEB7BF">Access Bank</FontText>}
            {form.bank && <FontText>{form.bank}</FontText>}
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
          error={errors.accountNo}
          rules={{
            required: "Account number is required, please try again",
            maxLength: {
              value: 13,
              message: "Invalid account number",
            },
          }}
          label="Account number"
          name="accountNo"
          resetField={resetField}
          // keyboardType="number-pad"
          autoCorrect={false}
        />
      </View>
      <View style={{ marginTop: -14 }}>
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
      <View style={{ marginTop: -14 }}>
        <CustomInput
          placeholder="Sent with love"
          inputMode="none"
          control={control}
          clearErrors={clearErrors}
          isValid={isValid}
          error={errors.narration}
          label="Narration (Optional)"
          name="email"
          resetField={resetField}
          autoCapitalize="none"
          // keyboardType="number-pad"
          autoCorrect={false}
        />
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  inputContainer: {
    gap: 8,
    paddingBottom: 18,
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
