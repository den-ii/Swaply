import { Pressable, SafeAreaView, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import FontText from "@/components/FontText";
import { PasskeyContainer } from "../(onboarding)/secure-account";
import usePasskeys from "@/hooks/usePassKey";
import { Link, router } from "expo-router";

export default function EntryPoint() {
  const { passkeys, fill, handleKeyPadPress } = usePasskeys();

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.light.body,
        padding: UI.paddingHorizontal,
        flex: 1,
      }}
    >
      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 80 }}>
        <View style={{ marginTop: 60 }}>
          <FontText
            fontFamily="P22"
            fontWeight={700}
            fontSize={24}
            style={{ textAlign: "center" }}
          >
            Enter your Swaply code
          </FontText>
        </View>
        <View style={{ marginTop: 24 }}>
          <PasskeyContainer
            passkeys={passkeys}
            fill={fill}
            handleKeyPadPress={handleKeyPadPress}
          />
        </View>
        <Pressable onPress={() => router.push("/sign-in")}>
          <View
            style={{
              marginTop: 35,
              flexDirection: "row",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <FontText style={{ textAlign: "center" }}>
              {"Not your account? "}
            </FontText>
            <FontText
              fontWeight={600}
              color={Colors.base}
              style={{
                textAlign: "center",
                textDecorationLine: "underline",
              }}
            >
              {"Switch account"}
            </FontText>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
