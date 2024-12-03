import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import React, { useState } from "react";
import ChevronDown from "@/assets/images/chevron-down.svg";
import { Pressable, TextInput, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/components/recepient-details/NGN";
import Close from "@/assets/images/close.svg";
import Button from "@/components/Button";
import Country from "@/components/Modals/Country";
import { router } from "expo-router";

export default function GetStarted() {
  const [stages, setStages] = useState(5);
  const [country, setCountry] = useState("Nigeria");
  const [modalActive, setModalActive] = useState(false);

  const [emailAddress, setEmailAddress] = useState("");
  const currentStage = 0;

  return (
    <>
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
                padding: 16,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#ECEFF1",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {<FontText>{country}</FontText>}
              <ChevronDown fill="#AEB7BF" />
            </View>
          </Pressable>
        </View>
        <View style={[styles.inputContainer, { marginTop: 16 }]}>
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
              onChangeText={(value) => setEmailAddress(value)}
              value={emailAddress}
            />
            {emailAddress && (
              <View style={styles.cancelContainer}>
                <Pressable onPress={() => setEmailAddress("")}>
                  <View style={styles.cancel}>
                    <Close fill="white" width={12} />
                  </View>
                </Pressable>
              </View>
            )}
          </View>
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
          <Text style={{ fontSize: 12, color: "#757D87", textAlign: "center" }}>
            <Text style={{}}>By creating an account, I agree to Swaply’s </Text>
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
            action={() => router.push("/verify-otp")}
          />
        </View>
        <Pressable onPress={() => router.navigate("/(auth)/sign-in")}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 16,
            }}
          >
            <Text>
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
