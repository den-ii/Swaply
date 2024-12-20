import Button from "@/components/Button";
import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import Check from "@/assets/images/check.svg";
import { TextInput, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { PhoneNumberInput } from "@/components/PhoneNumberInput";
import CustomInput from "@/components/CustomInput";
import { set, useForm } from "react-hook-form";
import { useState } from "react";
import { CountryCode } from "@/types/country";
import { onboardingStore } from "@/store";

export default function PersonalDetails() {
  const {
    control,
    handleSubmit,
    resetField,
    getValues,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
  });
  const [phoneError, setPhoneError] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>(
    CountryCode.NIGERIA
  );

  const handlePhoneNumberChange = (value: string) => {
    setPhone(value);
    if (value.length < 10) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };

  const handlePhoneError = () => {
    if (phone.length < 10) {
      setPhoneError(true);
      setShowPhoneError(true);
      return true;
    }
  };

  const onSubmit = ({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }) => {
    if (handlePhoneError()) return;
    onboardingStore.update((s) => {
      s.firstName = firstName;
      s.lastName = lastName;
      s.phone = phone;
      s.countryCode = countryCode;
    });
    router.push("/secure-account");
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
        <FontText fontFamily="P22" fontWeight={700} fontSize={34}>
          Personal details
        </FontText>
      </View>

      <View style={{ marginTop: 16 }}>
        <CustomInput
          label="First name"
          inputMode="text"
          returnKey={true}
          resetField={resetField}
          name="firstName"
          placeholder="John"
          control={control}
          clearErrors={clearErrors}
          isValid={isValid}
          error={errors.firstName}
          rules={{
            required: "First name is required, please try again",
          }}
        />
      </View>
      <View style={{ marginTop: -10 }}>
        <CustomInput
          label="Last name"
          inputMode="text"
          returnKey={true}
          resetField={resetField}
          name="lastName"
          placeholder="Doe"
          control={control}
          clearErrors={clearErrors}
          isValid={isValid}
          error={errors.lastName}
          rules={{
            required: "Last name is required, please try again",
          }}
        />
      </View>
      <View style={{ marginTop: -10 }}>
        <FontText>Phone number</FontText>
        <PhoneNumberInput
          value={phone}
          handleValueChange={handlePhoneNumberChange}
          error={phoneError && showPhoneError}
          showError={showPhoneError}
          countryCode={countryCode}
          switchCountryCode={(countryCode: CountryCode) =>
            setCountryCode(countryCode)
          }
        />
      </View>
      <View style={{ marginTop: 32 }}>
        <Button
          text="Create an account"
          action={handleSubmit(onSubmit, handlePhoneError)}
        />
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   validation: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#ECEFF1",
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 100,
//     gap: 4,
//   },
// });
