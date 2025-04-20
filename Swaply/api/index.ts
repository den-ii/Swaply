import AsyncStorage from "@react-native-async-storage/async-storage";

export const API = {
  BaseUrl: process.env.EXPO_PUBLIC_BASE_URL as string | null | undefined,

  async init() {
    // const savedUrl = await AsyncStorage.getItem("base_url");
    // this.BaseUrl = savedUrl || process.env.EXPO_PUBLIC_BASE_URL;
  },

  async setBaseUrl(url: string) {
    // this.BaseUrl = url;
    // await AsyncStorage.setItem("base_url", url);
    // await this.init();
    // console.log(this.BaseUrl);
  },
};
