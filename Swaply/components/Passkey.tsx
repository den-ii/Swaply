import FontText from "@/components/FontText";
import Keypad from "@/components/Keypad";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import usePasskeys from "@/hooks/usePassKey";
import { useLayoutEffect, useState } from "react";
import Identity from "@/assets/images/identity.svg";
import { ActivityIndicator, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import Toggle from "./Toggle";

export const PasskeyField = ({
  fill,
  index,
  error,
}: {
  fill: number;
  index: number;
  error?: boolean;
}) => {
  const filled = error
    ? Colors.light.textDefault
    : fill >= index
    ? Colors.base
    : "#AEB7BF";

  return (
    <View
      key={index}
      style={{
        width: 15,
        height: 15,
        backgroundColor: filled,
        borderRadius: 15,
      }}
    ></View>
  );
};

export const PasskeyContainer = ({
  passkeys,
  fill,
  loading,
  handleKeyPadPress,
  showFaceId,
  error,
  errorMsg,
}: {
  passkeys: any[];
  fill: number;
  error?: boolean;
  errorMsg?: string;
  loading?: boolean;
  showFaceId?: boolean;
  handleKeyPadPress: (value: number | string) => void;
}) => {
  const [faceIdAvailable, setFaceIdAvailable] = useState(false);
  useLayoutEffect(() => {
    const checkAuthType = async () => {
      const authType = await LocalAuthentication.getEnrolledLevelAsync();
      setFaceIdAvailable(
        authType === LocalAuthentication.SecurityLevel.BIOMETRIC_WEAK
      );
      console.log("authType:", authType);
    };
    if (showFaceId) checkAuthType();
  }, []);

  const [faceId, setFaceId] = useState(false);
  const faceIdCanShow = showFaceId && faceIdAvailable;

  const toggleFaceId = () => setFaceId((faceId) => !faceId);
  return (
    <View
      style={{
        justifyContent: "space-between",
        flex: 1,
        paddingBottom: 50,
        gap: 16,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 16,
            justifyContent: "center",
            gap: 16,
          }}
        >
          {passkeys.map((_, index) => (
            <PasskeyField key={index} fill={fill} index={index} error={error} />
          ))}
        </View>

        {error && (
          <FontText
            color={Colors.error}
            fontSize={12}
            style={{ textAlign: "center", marginTop: 24 }}
          >
            {errorMsg ?? "Invalid Code, please try again."}
          </FontText>
        )}
        {loading && (
          <View style={{ alignItems: "center", marginTop: 24 }}>
            <ActivityIndicator color={Colors.light.neutral} />
          </View>
        )}
      </View>
      <View>
        {faceIdCanShow && (
          <View
            style={{
              flexDirection: "row",
              padding: 16,
              backgroundColor: "white",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#ECEFF1",
              marginBottom: 32,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
            >
              <Identity />
              <FontText fontWeight={500}>Use Face Id</FontText>
            </View>
            <Toggle toggleOn={toggleFaceId} on={faceId} />
          </View>
        )}
        <View
          style={{
            // marginTop: 80,
            alignItems: "center",
          }}
        >
          <Keypad func={handleKeyPadPress} loading={loading} />
        </View>
      </View>
    </View>
  );
};
