import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import React, { useEffect, useState } from "react";
import ChevronDown from "@/assets/images/chevron-down.svg";
import { Pressable, TextInput, View, Text, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/components/recepient-details/NGN";
import Close from "@/assets/images/close.svg";
import Button from "@/components/Button";
import Country from "@/components/modals/Country";
import CFA_16 from "@/assets/images/CFA_16.svg";
import NGN_16 from "@/assets/images/NGN_16.svg";
import { CountryE } from "@/types";
import { Redirect, router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { registerUser } from "@/api/authApi";
import { authStore, toastStore, ToastType } from "@/store";
import { saveEmail } from "@/utils";
import DismissKeyboard from "@/components/DismissKeyboard";

export default function GetStarted() {
  const { trigger, data, isMutating, error } = useSWRMutation(
    "user/register",
    registerUser,
    {
      onSuccess: (data) => {
        if (data.status) router.push("/verify-otp");
      },
    }
  );
  const [country, setCountry] = useState<CountryE>(CountryE.NIGERIA);
  const [modalActive, setModalActive] = useState(false);
  const [disableContinue, setDisableContinue] = useState(true);
  const {
    control,
    handleSubmit,
    resetField,
    getValues,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      emailAddress: "",
    },
  });

  const handleCreateAccount = ({ emailAddress }: { emailAddress: string }) => {
    saveEmail(emailAddress);
    trigger({ email: emailAddress, country });
  };

  const handleEmailError = () => {
    toastStore.update((s) => {
      s.active = true;
      s.message = "Invalid email address, please try again.";
      s.type = ToastType.ERROR;
    });
  };
  return (
    <>
      <DismissKeyboard>
        <View
          style={{
            paddingHorizontal: UI.paddingHorizontal,
            flex: 1,
            backgroundColor: Colors.light.body,
          }}
        >
          <View style={{ paddingBottom: 32 }}>
            <FontText fontFamily="P22" fontWeight={700} fontSize={34}>
              Let's get you started
            </FontText>
          </View>
          <View>
            <FontText>Where are you from?</FontText>
            <Pressable
              style={{ marginTop: 8 }}
              onPress={() => setModalActive(true)}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "white",
                  paddingHorizontal: UI.input.horizontalPadding,
                  paddingVertical: UI.input.verticalPadding,
                  borderRadius: UI.input.borderRadius,
                  borderWidth: UI.input.borderWidth,
                  borderColor: "#ECEFF1",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  {country === CountryE.BENIN ? <CFA_16 /> : <NGN_16 />}
                  <FontText>{country}</FontText>
                </View>
                <ChevronDown fill="#AEB7BF" />
              </View>
            </Pressable>
          </View>
          <View style={{ marginTop: 24 }}>
            <CustomInput
              label="Email address"
              inputMode="email"
              returnKey={true}
              resetField={resetField}
              name="emailAddress"
              placeholder="Placeholder"
              control={control}
              clearErrors={clearErrors}
              isValid={isValid}
              error={errors.emailAddress}
              setDisableAction={setDisableContinue}
              rules={{
                required: "Email address is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address, please try again.",
                },
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 6,
            }}
          >
            <Text
              style={{ fontSize: 12, color: "#757D87", textAlign: "center" }}
            >
              <Text style={{}}>
                By creating an account, I agree to Swaply’s{" "}
              </Text>
              <Text
                style={{ color: Colors.base, textDecorationLine: "underline" }}
              >
                Terms & Conditions
              </Text>
              <Text style={{}}> and acknowledge </Text>
              <Text
                style={{ color: Colors.base, textDecorationLine: "underline" }}
              >
                Privacy Policy.
              </Text>
            </Text>
          </View>
          <View style={{ marginVertical: 16 }}>
            <Button
              text="Create an account"
              action={handleSubmit(handleCreateAccount, handleEmailError)}
              loading={isMutating}
              disabled={disableContinue}
            />
          </View>
          <Pressable onPress={() => router.navigate("/(auth)/sign-in")}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  color: Colors.light.textDefault,
                  fontSize: 14,
                }}
              >
                <Text>Already have an account? </Text>
                <Text
                  style={{
                    color: Colors.base,
                    textDecorationLine: "underline",
                    fontFamily: "Inter_500Medium",
                  }}
                >
                  Log in
                </Text>
              </Text>
            </View>
          </Pressable>
        </View>
      </DismissKeyboard>
      {modalActive && (
        <Country
          modalActive={modalActive}
          setModalActive={setModalActive}
          switchCountry={setCountry}
          country={country}
        />
      )}
    </>
  );
}
