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

export default function CFARecepientDetails({
  form,
  handleForm,
}: {
  form: recepientDetailsCFA;
  handleForm: (key: keyof recepientDetailsCFA, value: string) => void;
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState(CountryCode.BENIN);

  return (
    <View>
      <View style={styles.inputContainer}>
        <FontText>Momo number</FontText>
        <View style={{ position: "relative" }}>
          <PhoneNumberInput
            countryCode={countryCode}
            value={phoneNumber}
            handleValueChange={setPhoneNumber}
            showError={false}
            switchCountryCode={setCountryCode}
          />
        </View>
      </View>
      <View></View>
      <View></View>
    </View>
  );
}
