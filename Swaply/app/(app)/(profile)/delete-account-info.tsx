import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { Pressable, View, Text, StyleSheet, ScrollView } from "react-native";
import ChevronRight from "@/assets/images/chevron-right.svg";
import { useState } from "react";
import { router } from "expo-router";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";

const reasonsMessage = [
  "Moved to a new city where Swaply doesn't operate",
  "Had a negative experience with Swaply’s service",
  "Ease of use issues",
  "Found something better",
  "Other",
];

export default function DeleteAccountInfo() {
  const [reasons, SetReasons] = useState([false, false, false, false]);

  const toggleReasons = (index: number) => {
    const newReasons = [...reasons];
    newReasons[index] = !newReasons[index];
    SetReasons(newReasons);
  };
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{
        padding: UI.paddingHorizontal,
        backgroundColor: Colors.light.body,
      }}
      contentContainerStyle={{
        justifyContent: "space-between",
        flex: 1,
        gap: 12,
        paddingBottom: 27,
      }}
    >
      <View>
        <FontText
          fontSize={24}
          style={{ lineHeight: 32 }}
          fontFamily="p22"
          fontWeight={700}
        >
          Are you sure you want to delete your account?
        </FontText>
        <View>
          <Text style={styles.paragraph}>
            We’re sorry to see you go! deleting your account will permanently
            erase your data, including your transaction history and
            beneficiaries. This action cannot be undone and it might take a few
            days to complete the deletion.
          </Text>
          <Text style={[styles.paragraph, { marginTop: 12 }]}>
            Before deletion of your account, we might be able to help.{" "}
            <Text
              style={{
                color: Colors.base,
                fontFamily: "Inter_600SemiBold",
                textDecorationLine: "underline",
              }}
            >
              Get in touch with us
            </Text>
          </Text>
        </View>
        <View style={{ marginTop: 48 }}>
          <FontText
            color={Colors.light.neutral}
            fontWeight={600}
            fontSize={12}
            style={{ letterSpacing: 1 }}
          >
            REASONS FOR LEAVING
          </FontText>
          <Text style={styles.paragraph}>
            Please tell us the reason you’re leaving to help us improve our
            service.
          </Text>
          <View style={{ gap: 12, marginTop: 16 }}>
            {reasonsMessage.map((message, index) => (
              <Pressable
                style={{ flexDirection: "row", gap: 9, alignItems: "center" }}
                onPress={() => toggleReasons(index)}
              >
                <Checkbox check={reasons[index]} />
                <FontText
                  fontSize={14}
                  style={{ lineHeight: 21, letterSpacing: 0.1 }}
                >
                  {message}
                </FontText>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <View style={{ gap: 16 }}>
        <Text
          style={{
            fontSize: 12,
            color: Colors.light.neutral,
            textAlign: "center",
            lineHeight: 18,
            letterSpacing: 0.1,
          }}
        >
          By deleting an account, I agree that deleting my account is permanent
          as outlined in{" "}
          <Text
            style={{
              color: Colors.light.textDefault,
              textDecorationLine: "underline",
            }}
          >
            Swaply’s Terms & Condition
          </Text>{" "}
          and this action cannot be undone.
        </Text>
        <Button
          text="Delete account"
          textColor="#F23C57"
          bgColor="#FDDBE0"
          action={() => router.navigate("/delete-account")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    color: Colors.light.neutral,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.1,
    marginTop: 16,
  },
});
