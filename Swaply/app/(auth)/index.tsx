import { Pressable, SafeAreaView, View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import FontText from "@/components/FontText";
import usePasskeys from "@/hooks/usePassKey";
import { Link, router } from "expo-router";
import { PasskeyContainer } from "@/components/Passkey";
import useSWRMutation from "swr/mutation";
import { pinAuthentication } from "@/api/authApi";
import { authStore, notificationStore, toastStore, ToastType } from "@/store";
import { useState } from "react";
import { set } from "react-hook-form";

export default function EntryPoint() {
  const isFaceIdAuth = authStore.useState((s) => s.isFaceIDAuth);
  const fcmToken = notificationStore.useState((s) => s.token);
  const { trigger, data, isMutating } = useSWRMutation(
    "user/pin/auth",
    pinAuthentication,
    {
      onSuccess: (data) => {
        if (data.status) {
          router.push("/(app)/(tabs)");
        }
        if (data.errorCode === "INVALID_AUTH_CREDENTIALS") {
          toastStore.update((s) => {
            s.active = true;
            s.message = "Incorrect code, please try again.";
            s.type = ToastType.ERROR;
          });
          setError(true);
        } else {
          setError(true);
        }
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
  const { passkeys, fill, handleKeyPadPress, error, setError } = usePasskeys(
    done,
    isMutating
  );
  const loginToken = authStore.useState((s) => s.loginToken);

  function done() {
    if (loginToken)
      trigger({
        pin: passkeys.join(""),
        token: loginToken,
        fcmToken: fcmToken ?? "",
      });
  }

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: UI.paddingHorizontal,
        flex: 1,
        backgroundColor: Colors.light.body,
        justifyContent: "center",
      }}
    >
      <View style={{ height: "80%", minHeight: 500, maxHeight: 600 }}>
        <View style={{ paddingBottom: 16 }}>
          <Text
            style={{
              fontFamily: "P22Mackinac_Bold",
              fontSize: 26,
              textAlign: "center",
            }}
          >
            Enter your Swaply code
          </Text>
        </View>
        <PasskeyContainer
          passkeys={passkeys}
          fill={fill}
          handleKeyPadPress={handleKeyPadPress}
          error={error}
          showFaceId={isFaceIdAuth}
          loading={isMutating}
          errorMsg="Incorrect code, you have 5 more attempts."
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Inter_500Medium",
          color: Colors.base,
        }}
      >
        Forgot code?
      </Text>
    </SafeAreaView>
    // <SafeAreaView
    //   style={{
    //     backgroundColor: Colors.light.body,
    //     padding: UI.paddingHorizontal,
    //     flex: 1,
    //   }}
    // >
    //   <View style={{ flex: 1, justifyContent: "space-between" }}>
    //     <View style={{ marginTop: 60 }}>
    //       <FontText
    //         fontFamily="P22"
    //         fontWeight={700}
    //         fontSize={24}
    //         style={{ textAlign: "center" }}
    //       >
    //         Enter your Swaply code
    //       </FontText>
    //     </View>
    //     <View>
    //       <View>
    //         <PasskeyContainer
    //           passkeys={passkeys}
    //           fill={fill}
    //           handleKeyPadPress={handleKeyPadPress}
    //         />
    //       </View>
    /* <Pressable onPress={() => router.push("/sign-in")}>
            <View
              style={{
                marginTop: 35,
                flexDirection: "row",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <FontText
                fontWeight={600}
                color={Colors.base}
                style={{
                  textAlign: "center",
                  // textDecorationLine: "underline",
                }}
              >
                {"Forgot Code?"}
              </FontText>
            </View>
          </Pressable> */
    //     </View>
    //   </View>
    // </SafeAreaView>
  );
}
{
  /* <FontText style={{ textAlign: "center" }}>
              {"Not your account? "}
            </FontText> */
}
