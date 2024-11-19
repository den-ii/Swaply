import {
  StatusBar,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import HomeHeaderBanner from "@/assets/images/home_header.svg";
import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import Button from "@/components/Button";
import { Link, router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Password from "@/components/Password";

export default function SignIn() {
  const handleContinue = () => {
    router.push("/verify-otp");
  };
  return (
    // <View>
    <>
      <StatusBar barStyle={"light-content"} />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.light.body,
        }}
      >
        <View>
          <HomeHeaderBanner />
        </View>
        <View
          style={{
            flex: 1,
            paddingTop: 16,
            paddingHorizontal: UI.paddingHorizontal,
          }}
        >
          <FontText fontSize={34} fontFamily="P22" fontWeight={700}>
            Welcome Back
          </FontText>
          <View style={{ marginTop: 32, marginBottom: 16 }}>
            <FontText>Email Address</FontText>
            <TextInput
              placeholderTextColor={"#AEB7BF"}
              style={{
                fontSize: 14,
                fontFamily: "Inter_400Regular",
                borderRadius: 12,
                borderColor: "#ECEFF1",
                borderWidth: 1,
                padding: 16,
                marginTop: 8,
              }}
              cursorColor={Colors.light.text}
              selectionColor={Colors.light.text}
              placeholder="johndoe@gmail.com"
            />
          </View>

          <View style={{ marginTop: 8 }}>
            <FontText>Password</FontText>
            <Password value={""} onChangeText={() => {}} />
          </View>
          <FontText
            color={Colors.light.neutral}
            fontWeight={500}
            style={{ marginTop: 8, textAlign: "right" }}
          >
            Forgot Password?
          </FontText>
          <View style={{ marginTop: 32 }}>
            <Button text={"Continue"} action={handleContinue} />
          </View>
          <Pressable onPress={() => router.push("/(onboarding)/")}>
            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                justifyContent: "center",
                gap: 4,
                backgroundColor: "transparent",
              }}
            >
              <FontText style={{ textAlign: "center" }}>
                {"Don't have an account? "}
              </FontText>
              <FontText
                fontWeight={600}
                color={Colors.base}
                style={{
                  textAlign: "center",
                  textDecorationLine: "underline",
                }}
              >
                {"Sign up"}
              </FontText>
            </View>
          </Pressable>
        </View>
      </View>
    </>
    // </SafeAreaView>
  );
}
