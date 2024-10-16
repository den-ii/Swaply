import FontText from "@/components/FontText";
import {
  Pressable,
  ScrollView,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import Close from "@/assets/images/close.svg";
import PhoneInput from "react-native-phone-number-input";
import ChevronDown from "@/assets/images/chevron-down.svg";
import { recepientDetailsCFA } from "@/app/(tabs)/(home)/receipient_details";
import { styles } from "./NGN";
import { Colors } from "@/constants/Colors";

export default function CFARecepientDetails({
  form,
  handleForm,
}: {
  form: recepientDetailsCFA;
  handleForm: (key: keyof recepientDetailsCFA, value: string) => void;
}) {
  return (
    <View>
      <View style={styles.inputContainer}>
        <FontText>Momo number</FontText>
        <View style={{ position: "relative" }}>
          <PhoneInput
            layout="first"
            containerStyle={{
              borderRadius: 12,
              borderColor: "#ECEFF1",
              width: "100%",
              borderWidth: 1,
            }}
            defaultCode="NG"
            textInputProps={{
              inputMode: "numeric",
              keyboardType: "number-pad",
              maxLength: 11,
            }}
            onChangeFormattedText={(value) => handleForm("momoNumber", value)}
            textContainerStyle={{
              borderRadius: 12,
              width: "100%",
              backgroundColor: "white",
            }}
            textInputStyle={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: Colors.light.text,
            }}
            codeTextStyle={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: Colors.light.text,
            }}
          />
          <View style={{ position: "absolute", top: 20, right: 15 }}>
            {form.momoNumber && (
              <Pressable onPress={() => handleForm("momoNumber", "")}>
                <View style={styles.cancel}>
                  <Close fill="white" width={12} />
                </View>
              </Pressable>
            )}
          </View>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <FontText>Full name</FontText>
        <View style={styles.input}>
          <TextInput
            style={{ width: 200 }}
            placeholder="John doe"
            placeholderTextColor="#AEB7BF"
            inputMode="text"
            autoCorrect={false}
            onChangeText={(value) => handleForm("fullName", value)}
            value={form.fullName}
          />
          {form.fullName && (
            <Pressable onPress={() => handleForm("fullName", "")}>
              <View style={styles.cancel}>
                <Close fill="white" width={12} />
              </View>
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <FontText>Mobile money operator</FontText>
        <View style={styles.input}>
          <TextInput
            style={{ width: 250 }}
            placeholder="Select operator"
            inputMode="text"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#AEB7BF"
            onChangeText={(value) => handleForm("momoOperator", value)}
            value={form.momoOperator}
          />
          {form.momoOperator && (
            <Pressable onPress={() => handleForm("momoOperator", "")}>
              <View style={styles.cancel}>
                <Close fill="white" width={12} />
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
