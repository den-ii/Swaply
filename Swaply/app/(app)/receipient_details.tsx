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
import Checkbox from "@/assets/images/checkbox.svg";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import SelectBank from "@/components/modals/SelectBank";
import { transferStore } from "@/store";
import NGNRecepientDetails from "@/components/recepient-details/NGN";
import CFARecepientDetails from "@/components/recepient-details/CFA";
import Sent from "@/components/modals/Sent";
import useInputControl from "@/hooks/useInputControl";
import { Country } from "@/types/country";

export default function RecipientDetails() {
  const router = useRouter();
  const ngnBank = transferStore.useState((s) => s.recepientNGN.bank);

  const [checked, setChecked] = useState(false);
  const [sentModal, setSentModal] = useState(false);
  const [proceed, setProceed] = useState(false);
  const { sendingIsCFA, sendingCurrency, receivingCurrency } =
    transferStore.useState((store) => store);
  const {
    control,
    handleSubmit,
    resetField,
    getValues,
    clearErrors,
    watching,
    isValid,
    errors,
  } = useInputControl(sendingCurrency as Country);

  const handleContinue = () => {
    router.navigate("/sending");
  };

  return (
    <View
      style={{
        paddingHorizontal: UI.paddingHorizontal,
        flex: 1,
        backgroundColor: Colors.light.body,
      }}
    >
      <View style={{ paddingBottom: 16, paddingTop: 8 }}>
        <FontText fontSize={34} fontWeight={700} fontFamily="P22">
          Enter recipient’s details
        </FontText>
      </View>
      <View style={{ marginTop: 16 }}>
        {sendingIsCFA && (
          <NGNRecepientDetails
            control={control}
            handleSubmit={handleSubmit}
            resetField={resetField}
            getValues={getValues}
            clearErrors={clearErrors}
            setProceed={setProceed}
            errors={errors}
            isValid={isValid}
            watching={watching}
          />
        )}
        {!sendingIsCFA && (
          <CFARecepientDetails
            control={control}
            handleSubmit={handleSubmit}
            resetField={resetField}
            getValues={getValues}
            clearErrors={clearErrors}
            setProceed={setProceed}
            errors={errors}
            isValid={isValid}
            watching={watching}
          />
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
            <View style={{ flex: 1 }}>
              <FontText fontSize={12}>
                By continuing with this payment you’re confirming that the
                details you’re providing are correct.
              </FontText>
            </View>
          </View>
        </Pressable>

        <View
          style={{
            marginTop: 16,
            // borderRadius: 100,
            // backgroundColor: Colors.light.text,
          }}
        >
          <Button
            text={"Continue"}
            action={handleSubmit(handleContinue)}
            disabled={!proceed || !checked}
          />
        </View>
      </View>

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
