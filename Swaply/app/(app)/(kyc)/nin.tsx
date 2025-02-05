import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import DataSecure from "@/components/DataSecure";
import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import VerificationInProgress from "@/components/modals/VerificationInProgress";
import { useForm, useWatch } from "react-hook-form";
import { verifyNIN as verifyNINAPI } from "@/api/kycApi/nigeria";
import useSWRMutation from "swr/dist/mutation";
import { authStore } from "@/store";

const defaultValues = {
  nin: "",
};

export default function NIN() {
  const [nin, setNin] = useState("");
  const token = authStore.useState((s) => s.token);
  const { trigger, isMutating } = useSWRMutation(
    "kyc/submit-kyc/nin",
    verifyNINAPI
  );
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [modalActive, setModalActive] = useState(true);

  const {
    control,
    handleSubmit,
    resetField,
    getValues,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
  });

  const watching = useWatch<typeof defaultValues>({
    control,
    defaultValue: defaultValues, // default value before the render
  });

  useEffect(() => {
    if (verificationInProgress) setModalActive(true);
  }, []);

  const verifyNIN = async () => {
    await trigger({ nin: getValues("nin"), token: token ?? "" });
    setVerificationInProgress(true);
    setModalActive(true);
  };
  return (
    <View
      style={{
        backgroundColor: Colors.light.body,
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
      }}
    >
      <View style={{ flex: 1 }}>
        <FontText fontSize={34} fontWeight={700} fontFamily="p22">
          NIN
        </FontText>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            marginTop: 16,
            color: Colors.light.neutral,
          }}
        >
          <Text>Please verify your National Identity Number. Dial</Text>
          <Text style={{ color: Colors.base }}> *346# </Text>
          <Text>to get NIN</Text>
        </Text>
        <View style={{ marginTop: 32 }}>
          <CustomInput
            label="NIN"
            inputMode="numeric"
            name="nin"
            clearErrors={clearErrors}
            resetField={resetField}
            returnKey
            error={errors.nin}
            control={control}
            isValid={isValid}
            rules={{
              required: "NIN is required",
              minLength: {
                value: 11,
                message: "Invalid format, please try again",
              },
              maxLength: {
                value: 11,
                message: "Invalid format, please try again",
              },
            }}
            placeholder="Please enter NIN"
          />
        </View>
      </View>
      <View style={{ paddingVertical: 16, gap: 16 }}>
        <DataSecure />
        <View>
          <Button
            text="Verify NIN"
            action={handleSubmit(verifyNIN)}
            disabled={watching.nin?.length === 0}
            loading={isMutating}
          />
        </View>
      </View>
      {verificationInProgress && (
        <VerificationInProgress
          modalActive={modalActive}
          setModalActive={setModalActive}
        />
      )}
    </View>
  );
}
