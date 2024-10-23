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

export default function NGNRecepientDetails({
  form,
  handleForm,
  setSelectBankModal,
}: {
  form: recepientDetailsNGN;
  handleForm: (key: keyof recepientDetailsNGN, value: string) => void;
  setSelectBankModal: Function;
}) {
  return (
    <ScrollView>
      <Pressable onPress={() => setSelectBankModal(true)}>
        <View style={styles.inputContainer}>
          <FontText>Select Bank</FontText>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              padding: 16,
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
      <View style={styles.inputContainer}>
        <FontText>Account number</FontText>
        <View>
          <TextInput
            maxLength={13}
            style={styles.input}
            placeholder="0732934459"
            placeholderTextColor="#AEB7BF"
            inputMode="numeric"
            keyboardType="number-pad"
            autoCorrect={false}
            returnKeyType="done"
            onChangeText={(value) => handleForm("accountNumber", value)}
            value={form.accountNumber}
          />
          {form.accountNumber && (
            <View style={styles.cancelContainer}>
              <Pressable onPress={() => handleForm("accountNumber", "")}>
                <View style={styles.cancel}>
                  <Close fill="white" width={12} />
                </View>
              </Pressable>
            </View>
          )}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <FontText>Email address</FontText>
        <View>
          <TextInput
            placeholder="johndoe@gmail.com"
            returnKeyType="done"
            style={styles.input}
            inputMode="email"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#AEB7BF"
            onChangeText={(value) => handleForm("emailAddress", value)}
            value={form.emailAddress}
          />
          {form.emailAddress && (
            <View style={styles.cancelContainer}>
              <Pressable onPress={() => handleForm("emailAddress", "")}>
                <View style={styles.cancel}>
                  <Close fill="white" width={12} />
                </View>
              </Pressable>
            </View>
          )}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <FontText>Narration (Optional)</FontText>
        <View>
          <TextInput
            style={styles.input}
            placeholderTextColor="#AEB7BF"
            placeholder="Sent with love"
            onChangeText={(value) => handleForm("narration", value)}
            value={form.narration}
          />
          {form.narration && (
            <View style={styles.cancelContainer}>
              <Pressable onPress={() => handleForm("narration", "")}>
                <View style={styles.cancel}>
                  <Close fill="white" width={12} />
                </View>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  inputContainer: {
    gap: 8,
    paddingBottom: 16,
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
