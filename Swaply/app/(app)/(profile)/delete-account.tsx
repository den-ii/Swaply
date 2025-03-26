import FontText from "@/components/FontText";
import { PasskeyContainer } from "@/components/Passkey";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import usePasskeys from "@/hooks/usePassKey";
import { authStore } from "@/store";
import { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";

export default function DeleteAccount() {
  const isMutating = true;
  const isFaceIdAuth = authStore.useState((s) => s.isFaceIDAuth);
  const [authTypeValid, setAuthTypeValid] = useState(false);
  const { passkeys, fill, handleKeyPadPress, error, setError } = usePasskeys(
    done,
    isMutating
  );
  function done() {}
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: UI.paddingHorizontal,
        flex: 1,
        backgroundColor: Colors.light.body,
      }}
    >
      <View style={{ paddingBottom: 16, paddingTop: 8, gap: 8 }}>
        <Text
          style={{
            fontFamily: "P22Mackinac_Bold",
            fontSize: 34,
          }}
        >
          Delete account
        </Text>
        <FontText
          color={Colors.light.neutral}
          style={{
            lineHeight: 21,
            letterSpacing: 0.1,
          }}
        >
          Please enter your 6-digit code to proceed with deleting your account.
        </FontText>
      </View>
      <View style={{ height: "80%", minHeight: 500, maxHeight: 600 }}>
        <PasskeyContainer
          passkeys={passkeys}
          fill={fill}
          handleKeyPadPress={handleKeyPadPress}
          error={error}
          showFaceId={isFaceIdAuth && authTypeValid}
          loading={isMutating}
          errorMsg="Incorrect code, you have 5 more attempts."
        />
      </View>
    </SafeAreaView>
  );
}
