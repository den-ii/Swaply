import { Country } from "@/types/country";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

export async function convertCurrency(
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

export async function getListOfBanksNGN(url: string) {
  const apiUrl = baseUrl + url;
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
}

export async function verifyBankDetails(
  url: string,
  {
    arg,
  }: {
    arg: {
      accountNumber: string;
      bankCode: string;
      token: string;
    };
  }
) {
  console.log("convert currency called:");
  const { accountNumber, bankCode } = arg;
  const apiUrl = `${baseUrl}${url}?accountNumber=${accountNumber}&bankCode=${bankCode}`;
  const res = await fetch(apiUrl, {
    headers: {
      Authorization: "Bearer " + arg.token,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log("res: ", res.status);
  console.log("data: ", data);
  return data;
}

export async function swap(
  url: string,
  {
    arg,
  }: {
    arg: {
      sourceCurrency: string;
      destinationCurrency: string;
      amount: number;
      bank_name?: string;
      bankId?: string;
      accountNumber: string;
      email?: string;
      narration?: string;
      token?: string;
    };
  }
) {
  const apiUrl = baseUrl + url;
  const body = { ...arg };
  console.log("amount:", body.amount);
  delete body.token;
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      ...arg,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + arg.token,
    },
  });
  const data = await res.json();
  console.log("res: ", res.status);
  console.log("data: ", data);
  return data;
}

export async function getMomoProviders(url: string) {
  const apiUrl = `${baseUrl}${url}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
}
