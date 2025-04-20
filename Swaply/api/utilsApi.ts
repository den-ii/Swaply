import { authStore } from "@/store";
import { saveEmail } from "@/utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API } from "./index";

const baseUrl = API.BaseUrl;

export async function getUserDetails(
  url: string,
  { arg }: { arg: { token: string } }
) {
  console.log("called:", url);
  const apiUrl = baseUrl + url;
  console.log("called:", apiUrl);

  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + arg.token,
    },
  });
  const data = await res.json();
  console.log(data);
  if (data.status) {
    console.log("here:");
    try {
      const nationalityData = await getNationality("", data.data.country);
      await saveEmail(data.data.email);
      authStore.update((s) => {
        s.email = data.data.email;
        s.userDetails = {
          ...data.data,
          cca: nationalityData[0].cca2,
          nationality: nationalityData[0].demonyms.eng.m,
        };
      });
    } catch (e) {
      console.log(e);
    }
  }

  return data;
}

export async function getNationality(url: string, country: string) {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${country}?fullText=true`
  );
  const data = await res.json();
  console.log(data[0].demonyms);
  return data;
}
