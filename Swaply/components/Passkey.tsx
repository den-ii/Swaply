import FontText from "@/components/FontText";
import Keypad from "@/components/Keypad";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import usePasskeys from "@/hooks/usePassKey";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useEffect, useLayoutEffect, useState } from "react";
import Identity from "@/assets/images/identity.svg";
import { ActivityIndicator, View, Dimensions } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import Toggle from "./Toggle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authStore } from "@/store";

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
  showFaceIdToggle,
  error,
  top,
  errorMsg,
}: {
  passkeys: any[];
  fill: number;
  error?: boolean;
  errorMsg?: string;
  loading?: boolean;
  showFaceId?: boolean;
  top?: number;
  showFaceIdToggle?: boolean;
  handleKeyPadPress: (value: number | string) => void;
}) => {
  const [faceIdAvailable, setFaceIdAvailable] = useState(false);
  const [faceId, setFaceId] = useState(false);
  const passKeyFieldOpacity = useSharedValue(1);
  const loaderOpacity = useSharedValue(0);
  const faceIdCanShow = showFaceIdToggle && faceIdAvailable;

  useLayoutEffect(() => {
    const checkAuthType = async () => {
      const authType = (
        await LocalAuthentication.supportedAuthenticationTypesAsync()
      ).includes(2);

      const authLevel = await LocalAuthentication.getEnrolledLevelAsync();
      setFaceIdAvailable(
        authLevel === LocalAuthentication.SecurityLevel.BIOMETRIC_STRONG &&
          authType
      );
      console.log("authType:", authLevel);
    };
    if (showFaceIdToggle) checkAuthType();
  }, []);

  useEffect(() => {
    if (loading) {
      loaderOpacity.value = withTiming(1);
      passKeyFieldOpacity.value = withTiming(0);
    } else {
      loaderOpacity.value = withTiming(0);
      passKeyFieldOpacity.value = withTiming(1);
    }
  }, [loading]);

  const toggleFaceId = async () => {
    try {
      if (faceId) {
        await AsyncStorage.removeItem("isFaceIDAuth");
        authStore.update((s) => {
          s.isFaceIDAuth = false;
        });
      } else {
        await AsyncStorage.setItem("isFaceIDAuth", "true");
        authStore.update((s) => {
          s.isFaceIDAuth = true;
        });
      }
    } catch (e) {
      console.log("Error setting face id", e);
    }

    setFaceId((faceId) => !faceId);
  };
  return (
    <View
      style={{
        justifyContent: "space-between",
        flex: 1,
        paddingBottom: 32,
        gap: 16,
      }}
    >
      <View style={{ position: "relative" }}>
        <Animated.View
          style={{
            flexDirection: "row",
            marginTop: 16,
            opacity: passKeyFieldOpacity,
            justifyContent: "center",
            gap: 16,
          }}
        >
          {passkeys.map((_, index) => (
            <PasskeyField key={index} fill={fill} index={index} error={error} />
          ))}
        </Animated.View>
        <Animated.View
          style={{
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            position: "absolute",
            top: "50%",
            opacity: loaderOpacity,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color={Colors.light.neutral} />
        </Animated.View>

        {error && (
          <FontText
            color={Colors.error}
            fontSize={12}
            style={{ textAlign: "center", marginTop: 24 }}
          >
            {errorMsg ?? "Invalid Code, please try again."}
          </FontText>
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
            <Toggle toggleOn={toggleFaceId} on={faceId} withShadow />
          </View>
        )}
        <View
          style={{
            marginTop: top || 0,
            alignItems: "center",
          }}
        >
          <Keypad
            func={handleKeyPadPress}
            loading={loading}
            showFaceId={showFaceId}
          />
        </View>
      </View>
    </View>
  );
};
