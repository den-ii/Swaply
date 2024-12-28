import { router } from "expo-router";
import { authStore } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveEmail(email: string) {
  try {
    await AsyncStorage.setItem("email", email);
    authStore.update((s) => {
      s.email = email;
    });
  } catch (e) {
    // saving error
  }
}

export async function RegisterFaceIDAuth(value: boolean) {
  authStore.update((s) => {
    s.isFaceIDAuth = value;
  });
  try {
    await AsyncStorage.setItem("isFaceIDAuth", value.toString());
  } catch (e) {
    // saving error
  }
}
