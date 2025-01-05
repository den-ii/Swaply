import {
  StatusBar,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Text,
} from "react-native";
import HomeHeaderBanner from "@/assets/images/home_header.svg";
import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import Button from "@/components/Button";
import { Link, router } from "expo-router";
import Password from "@/components/Password";
import { useEffect, useLayoutEffect, useState } from "react";
import { get, useForm } from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import { authStore, statusBarStore, toastStore, ToastType } from "@/store";
import { loginUser, forgotPassword } from "@/api/authApi";
import useSWRMutation from "swr/mutation";
import { saveEmail } from "@/utils";

export default function SignIn() {
  const [passwordError, setPasswordError] = useState(false);

  const { trigger, data, isMutating, error } = useSWRMutation(
    "user/login",
    loginUser,
    {
      onSuccess: (data) => {
        if (data.status) router.push("/(auth)/");
        else if (data.errorCode === "INVALID_CREDENTIALS") {
          setPasswordError(true);
        }
      },
    }
  );
  const { trigger: forgotPasswordTrigger } = useSWRMutation(
    "user/forgot-password",
    forgotPassword
  );
  const email = authStore.useState((s) => s.email);
  const [password, setPassword] = useState("");

  const handleContinue = () => {
    router.push("/verify-otp");
  };
  const {
    control,
    handleSubmit,
    resetField,
    getValues,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      emailAddress: email,
    },
  });
  useLayoutEffect(() => {
    statusBarStore.update((s) => {
      s.barStyle = "light-content";
    });
  }, []);

  useEffect(() => {
    if (passwordError) {
      setPasswordError(false);
    }
  }, [password]);

  const login = ({ emailAddress }: { emailAddress: string }) => {
    authStore.update((s) => {
      s.email = emailAddress;
    });
    if (!password.length) {
      console.log("password error");
      setPasswordError(true);
      toastStore.update((s) => {
        s.active = true;
        s.message = "Invalid password, please try again";
        s.type = ToastType.ERROR;
      });
      return;
    }
    saveEmail(emailAddress);
    trigger({ email: emailAddress, password });
  };

  const handleForgotPassword = ({ emailAddress }: { emailAddress: string }) => {
    statusBarStore.update((s) => {
      s.barStyle = "dark-content";
    });
    saveEmail(emailAddress);
    forgotPasswordTrigger({ email: emailAddress });
    router.push("/verify-otp");
  };
  return (
    // <View>
    <>
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
            Welcome back
          </FontText>
          <View style={{ marginTop: 32 }}>
            <CustomInput
              label="Email address"
              inputMode="email"
              returnKey={true}
              resetField={resetField}
              name="emailAddress"
              placeholder="johndoe@gmail.com"
              control={control}
              clearErrors={clearErrors}
              isValid={isValid}
              error={errors.emailAddress}
              rules={{
                required: "Email address is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address, please try again.",
                },
              }}
            />
          </View>

          <View style={{ marginTop: -12 }}>
            <FontText>Password</FontText>
            <Password
              value={password}
              onChangeText={setPassword}
              error={passwordError}
            />
            <FontText
              fontSize={12}
              color={Colors.error}
              style={{
                marginTop: 8,
                opacity: passwordError ? 1 : 0,
              }}
            >
              Invalid password, please try again
            </FontText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <Pressable onPress={handleSubmit(handleForgotPassword)}>
              <FontText color={Colors.light.neutral} fontWeight={500}>
                Forgot Password?
              </FontText>
            </Pressable>
          </View>

          <View style={{ marginTop: 32 }}>
            <Button
              text={"Log In"}
              action={handleSubmit(login)}
              loading={isMutating}
              disabled={
                getValues("emailAddress").length < 1 || password.length < 1
              }
            />
          </View>
          <Pressable onPress={() => router.push("/(onboarding)/")}>
            <View
              style={{
                marginTop: 16,
                flexDirection: "row",
                justifyContent: "center",
                gap: 4,
                backgroundColor: "transparent",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                }}
              >
                <Text>Don't have an account? </Text>
                <Text
                  style={{
                    color: Colors.base,
                    fontFamily: "Inter_500Medium",
                    textDecorationLine: "underline",
                  }}
                >
                  Sign up
                </Text>
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </>
    // </SafeAreaView>
  );
}
