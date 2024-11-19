import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import React, { useState } from "react";
import ChevronDown from "@/assets/images/chevron-down.svg";
import { Pressable, TextInput, View } from "react-native";
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
          <FontText
            fontSize={12}
            color={"#757D87"}
            style={{ textAlign: "center" }}
          >
            {"By creating an account, I agree to Swaply’s "}
          </FontText>
          <FontText
            fontSize={12}
            color={Colors.base}
            style={{
              textDecorationLine: "underline",
            }}
          >
            {"Terms & Condition"}
          </FontText>
          <FontText fontSize={12} color={"#757D87"}>
            {"and acknowledge "}
          </FontText>
          <FontText
            fontSize={12}
            color={Colors.base}
            style={{
              textDecorationLine: "underline",
            }}
          >
            {"Privacy policy."}
          </FontText>
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
            }}
          >
            <FontText fontWeight={400}>{"Already have an account? "}</FontText>
            <FontText
              fontWeight={600}
              color={Colors.base}
              style={{ textDecorationLine: "underline" }}
            >
              Log in
            </FontText>
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
