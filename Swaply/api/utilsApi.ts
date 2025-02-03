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
  console.log("here:", data);
  if (data.status) {
    authStore.update((s) => {
      s.userDetails = data.data;
    });
  }
  return data;
}
