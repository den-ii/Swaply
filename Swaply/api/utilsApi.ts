import { authStore } from "@/store";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

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
    const nationalityData = await getNationality("", data.data.country);
    authStore.update((s) => {
      s.userDetails = {
        ...data.data,
        cca: nationalityData[0].cca2,
        nationality: nationalityData[0].demonyms.eng.m,
      };
    });
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
