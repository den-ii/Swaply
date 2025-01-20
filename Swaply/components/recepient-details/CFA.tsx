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

import { Colors } from "@/constants/Colors";
import { useLayoutEffect, useState } from "react";
import CustomInput from "../CustomInput";
import { UI } from "@/constants/UI";
import useSWR from "swr";
import { getMomoProviders } from "@/api/paymentAPI";
import { set } from "react-hook-form";
import SelectMomoOperators from "../modals/SelectMomoOperators";

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
  const { data, error, isLoading } = useSWR("momo/providers", getMomoProviders);
  const [selectedProvider, setSelectedProvider] = useState<Record<
    string,
    any
  > | null>(null);
  const [providerModalActive, setProviderModalActive] = useState(false);

  // useLayoutEffect(() => {
  //   setSelectedProvider(data?.data[0]?.name.toUpperCase());
  // }, []);

  function toggleProviderModal() {
    setProviderModalActive((modal) => !modal);
  }

  return (
    <View>
      <View>
        <CustomInput
          placeholder="0732934459"
          inputMode="numeric"
          control={control}
          clearErrors={clearErrors}
          isValid={isValid}
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
          keyboardType="number-pad"
          autoCorrect={false}
          showContact={true}
        />
      </View>
      <View style={{ marginTop: -7 }}>
        <CustomInput
          placeholder="John Doe"
          inputMode="text"
          control={control}
          clearErrors={clearErrors}
          isValid={isValid}
          error={errors.fullName}
          rules={{
            required: "This field is required, please try again",
          }}
          label="Full name"
          name="fullName"
          resetField={resetField}
          autoCorrect={false}
        />
      </View>
      <View style={[styles.inputContainer, { marginTop: -7 }]}>
        <FontText>Mobile money operator</FontText>
        <Pressable onPress={toggleProviderModal}>
          <View style={styles.select}>
            <FontText
              color={
                selectedProvider
                  ? Colors.light.textDefault
                  : Colors.light.textDisabled
              }
            >
              {selectedProvider?.name.toUpperCase() ?? "Select operator"}
            </FontText>
            <ChevronDown fill="#AEB7BF" />
          </View>
        </Pressable>
      </View>
      <SelectMomoOperators
        providers={data?.data}
        setModalActive={setProviderModalActive}
        modalActive={providerModalActive}
        selectedProvider={selectedProvider}
        setSelectedProvider={setSelectedProvider}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingBottom: 16,
    gap: 8,
  },
  select: {
    backgroundColor: "white",
    borderRadius: UI.input.borderRadius,
    borderWidth: UI.input.borderWidth,
    borderColor: Colors.light.border,
    paddingHorizontal: UI.input.horizontalPadding,
    paddingVertical: Platform.OS === "ios" ? UI.input.verticalPadding : 12,
    position: "relative",
    fontSize: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Inter_400Regular",
  },
});
