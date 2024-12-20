import { authStore, toastStore, ToastType } from "@/store";
import { CountryE } from "@/types";
import useSWRMutation from "swr/mutation";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

/*------------------------------------ REGISTER ------------------------------------------------*/

export async function registerUser(
  url: string,
  { arg }: { arg: { email: string; country: CountryE } }
) {
  console.log(arg.email, arg.country);
  const apiUrl = baseUrl + url;
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ email: arg.email, country: arg.country }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
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
  console.log(arg.code);
  const apiUrl = baseUrl + url;
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ code: arg.code }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  if (data.status) {
    authStore.update((s) => {
      s.regToken = data.token;
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
