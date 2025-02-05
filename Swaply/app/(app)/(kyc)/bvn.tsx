import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import DataSecure from "@/components/DataSecure";
import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import VerificationInProgress from "@/components/modals/VerificationInProgress";
import { useForm, useWatch } from "react-hook-form";
import { authStore } from "@/store";
import useSWRMutation from "swr/dist/mutation";
import { verifyBVN as verifyBVNAPI } from "@/api/kycApi/nigeria";

const defaultValues = {
  bvn: "",
};

export default function BVN() {
  const token = authStore.useState((s) => s.token);

  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [modalActive, setModalActive] = useState(true);
  const { trigger, isMutating } = useSWRMutation(
    "kyc/submit-kyc/bvn",
    verifyBVNAPI
  );

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

  const verifyBVN = async () => {
    await trigger({ bvn: getValues("bvn"), token: token ?? "" });
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
          BVN
        </FontText>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            marginTop: 16,
            color: Colors.light.neutral,
          }}
        >
          <Text> Please verify your Bank Verification Number. Dial</Text>
          <Text style={{ color: Colors.base }}> *565*0# </Text>
          <Text>to get BVN</Text>
        </Text>
        <View style={{ marginTop: 32 }}>
          <CustomInput
            label="BVN"
            inputMode="numeric"
            name="bvn"
            clearErrors={clearErrors}
            resetField={resetField}
            returnKey
            error={errors.bvn}
            control={control}
            isValid={isValid}
            rules={{
              required: "BVN is required",
              minLength: {
                value: 11,
                message: "Invalid format, please try again",
              },
              maxLength: {
                value: 11,
                message: "Invalid format, please try again",
              },
            }}
            placeholder="Please enter BVN"
          />
        </View>
      </View>
      <View style={{ paddingVertical: 16, gap: 16 }}>
        <DataSecure />
        <View>
          <Button
            text="Verify BVN"
            action={handleSubmit(verifyBVN)}
            disabled={watching.bvn?.length === 0}
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
