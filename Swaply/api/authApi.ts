import { authStore, onboardingStore, toastStore, ToastType } from "@/store";
import { CountryE } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Platform } from "react-native";
import useSWRMutation from "swr/mutation";
import { getUserDetails } from "./utilsApi";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

/*------------------------------------ Register ------------------------------------------------*/

export async function registerUser(
  url: string,
  { arg }: { arg: { email: string; country: CountryE } }
) {
  const apiUrl = baseUrl + url;
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ email: arg.email, country: arg.country }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.status || data.errorCode === "INCOMPLETE_ONBOARDING") {
    return { status: true, data };
  } else {
    toastStore.update((s) => {
      s.active = true;
      s.message = data.message;
      s.type = ToastType.ERROR;
    });
    return { status: false, data };
  }
}

/*------------------------------------ Code Activation ------------------------------------------------*/

export async function codeActivation(
  url: string,
  { arg }: { arg: { code: string } }
) {
  const apiUrl = baseUrl + url;
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ code: arg.code }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.status) {
    onboardingStore.update((s) => {
      s.token = data.data.token;
    });
  } else if (data.message === "Invalid verification code") {
    toastStore.update((s) => {
      s.active = true;
      s.message = "Invalid OTP, please try again.";
      s.type = ToastType.ERROR;
    });
  } else {
    toastStore.update((s) => {
      s.active = true;
      s.message = data.message;
      s.type = ToastType.ERROR;
    });
  }
  return { statusCode: res.status, data };
}

/*------------------------------------ Onboarding ------------------------------------------------*/

export async function onboardUser(
  url: string,
  {
    arg,
  }: {
    arg: {
      firstName: string;
      lastName: string;
      countryCode: string;
      phone: string;
      pin: string;
      token: string | null;
      password: string;
    };
  }
) {
  const { firstName, lastName, countryCode, phone, pin, token, password } = arg;
  const apiUrl = baseUrl + url;
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      countryCode,
      phone,
      pin,
      password,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

/*------------------------------------ Login ------------------------------------------------*/

export async function loginUser(
  url: string,
  {
    arg,
  }: {
    arg: {
      email: string;
      password: string;
    };
  }
) {
  const { email, password } = arg;
  const apiUrl = baseUrl + url;
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.status) {
    const token = data.data.token;
    await AsyncStorage.setItem("loginToken", token);
    await AsyncStorage.setItem("email", email);
    authStore.update((s) => {
      s.loginToken = token;
      s.email = email;
      s.isReturningUser = true;
    });
  } else if (data.errorCode === "INVALID_CREDENTIALS") {
    toastStore.update((s) => {
      s.active = true;
      s.message = "Invalid email or password, please try again.";
      s.type = ToastType.ERROR;
    });
  } else {
    toastStore.update((s) => {
      s.active = true;
      s.message = data.message;
      s.type = ToastType.ERROR;
    });
  }
  return data;
}

/*------------------------------------ Pin Authentication ------------------------------------------------*/
export async function pinAuthentication(
  url: string,
  {
    arg,
  }: {
    arg: {
      pin: string;
      token: string;
      fcmToken: string;
    };
  }
) {
  const { pin, fcmToken } = arg;
  const apiUrl = baseUrl + url;
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      pin,
    }),
    headers: {
      Authorization: `Bearer ${arg.token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.status) {
    const dataRes = data.data.token;
    const token = dataRes.token;
    const name = dataRes.fullName.split(" ");
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log("Error setting token: ", error);
    }
    authStore.update((s) => {
      s.token = token;
      s.isAuthenticated = true;
      s.isReturningUser = true;
      s.country = dataRes.country;
      s.fullName = dataRes.fullName;
      s.profileImage =
        name[0].charAt(0).toUpperCase() + name[1].charAt(0).toUpperCase();
    });
    try {
      updateNotification("user/update-fcm", {
        arg: {
          fcmToken,
          deviceType: Platform.OS,
          deviceToken: "SEKEM",
          token: token,
        },
      });
    } catch (error) {
      console.log("Error updating notification: ", error);
    }
    try {
      getUserDetails("user/profile", { arg: { token } });
    } catch (error) {
      console.log("Error getting user details: ", error);
    }
  } else {
    toastStore.update((s) => {
      s.active = true;
      s.message = data.message;
      s.type = ToastType.ERROR;
    });
  }
  return data;
}

/*------------------------------------ Forgot Password ------------------------------------------------*/
export async function forgotPassword(
  url: string,
  {
    arg,
  }: {
    arg: {
      email: string;
    };
  }
) {
  const { email } = arg;
  const apiUrl = baseUrl + url;
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

/*------------------------------------Validate OTP ------------------------------------------------*/
export async function validateOTP(
  url: string,
  {
    arg,
  }: {
    arg: {
      code: string;
    };
  }
) {
  const { code } = arg;
  const apiUrl = baseUrl + url;
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      code,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.status) {
    authStore.update((s) => {
      s.otp = code;
    });
  } else if (data.message === "Invalid verification code") {
    toastStore.update((s) => {
      s.active = true;
      s.message = "Invalid OTP, please try again.";
      s.type = ToastType.ERROR;
    });
  } else {
    toastStore.update((s) => {
      s.active = true;
      s.message = data.message;
      s.type = ToastType.ERROR;
    });
  }
  return data;
}

/*------------------------------------ Update Notification ------------------------------------------------*/
export async function updateNotification(
  url: string,
  {
    arg,
  }: {
    arg: {
      fcmToken: string;
      deviceType: string;
      deviceToken: string;
      token: string;
    };
  }
) {
  const { fcmToken, deviceType, deviceToken, token } = arg;
  const apiUrl = baseUrl + url;
  const res = await fetch(apiUrl, {
    method: "PATCH",
    body: JSON.stringify({
      fcmToken,
      deviceType,
      deviceToken,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

/*------------------------------------ Reset Password ------------------------------------------------*/
export async function resetPassword(
  url: string,
  {
    arg,
  }: {
    arg: {
      code: string;
      password: string;
    };
  }
) {
  const { code, password } = arg;
  const apiUrl = baseUrl + url;
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      code,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

/* ------------------------------------ Logout ------------------------------------------------ */
export async function logoutUser() {
  authStore.update((s) => {
    s.isAuthenticated = false;
    s.token = null;
    s.email = "";
    s.loginToken = null;
  });
  await AsyncStorage.removeItem("email");
  await AsyncStorage.removeItem("loginToken");
  router.push("/(auth)/sign-in");
}
