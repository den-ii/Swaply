import { Country } from "@/types/country";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

export default async function convertCurrency(
  url: string,
  {
    arg,
  }: {
    arg: {
      sourceCurrency: Country;
      destinationCurrency: Country;
      amount: number;
    };
  }
) {
  console.log("convert currency called:");
  const { sourceCurrency, destinationCurrency, amount } = arg;
  const apiUrl = baseUrl + url;
  console.log(sourceCurrency, destinationCurrency, amount);
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      ...arg,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log("res: ", res.status);
  console.log("data: ", data);
  return data;
}
